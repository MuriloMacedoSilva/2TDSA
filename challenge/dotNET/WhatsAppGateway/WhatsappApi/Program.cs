using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WhatsappApi.Data;
using WhatsappApi.Models;
using WhatsappApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuração EF Core In-Memory
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("LogsDb"));

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Pegamos as configurações do appsettings.json
var baseUrl = builder.Configuration["WhatsappGateway:BaseUrl"] ?? "http://localhost:8080/";
var apiKey = builder.Configuration["WhatsappGateway:ApiKey"] ?? "";

// Registramos o HttpClient customizado para o nosso serviço.
builder.Services.AddHttpClient<IWhatsappService, WppConnectService>(client =>
{
    client.BaseAddress = new Uri(baseUrl);
    client.DefaultRequestHeaders.Add("secret-key", apiKey);
});

var app = builder.Build();

// Habilitar Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Endpoints WhatsApp
app.MapPost("/api/whatsapp/send/{number}", async (
    string number,
    [FromBody] NotificationRequest request,
    IWhatsappService whatsappService,
    AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(request.Message)) return Results.BadRequest(new { error = "A mensagem não pode estar vazia." });
    
    bool isSent = await whatsappService.SendTextMessageAsync(number, request.Message);
    if (isSent)
    {
        var log = new MessageLog { Number = number, Message = request.Message };
        db.MessageLogs.Add(log);
        await db.SaveChangesAsync();
        return Results.Ok(new { success = true, message = "Mensagem enviada!" });
    }
    return Results.StatusCode(StatusCodes.Status500InternalServerError);
});

// Endpoints Logs (CRUD)
app.MapGet("/api/logs", async (AppDbContext db) => await db.MessageLogs.ToListAsync());
app.MapGet("/api/logs/{id}", async (int id, AppDbContext db) => 
    await db.MessageLogs.FindAsync(id) is MessageLog log ? Results.Ok(log) : Results.NotFound());
app.MapGet("/api/logs/latest", async (AppDbContext db) => 
    await db.MessageLogs.OrderByDescending(x => x.SentAt).Take(5).ToListAsync());
app.MapPost("/api/logs", async (MessageLog log, AppDbContext db) => {
    db.MessageLogs.Add(log);
    await db.SaveChangesAsync();
    return Results.Created($"/api/logs/{log.Id}", log);
});
app.MapPut("/api/logs/{id}", async (int id, MessageLog inputLog, AppDbContext db) => {
    var log = await db.MessageLogs.FindAsync(id);
    if (log is null) return Results.NotFound();
    log.Number = inputLog.Number;
    log.Message = inputLog.Message;
    await db.SaveChangesAsync();
    return Results.Ok(log);
});
app.MapDelete("/api/logs/{id}", async (int id, AppDbContext db) => {
    if (await db.MessageLogs.FindAsync(id) is MessageLog log) {
        db.MessageLogs.Remove(log);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

app.Run();