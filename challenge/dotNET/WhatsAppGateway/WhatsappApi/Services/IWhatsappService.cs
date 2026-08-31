namespace WhatsappApi.Services;

public interface IWhatsappService
{
    // Task<bool> é o equivalente ao CompletableFuture<Boolean> do Java. 
    // Representa uma operação assíncrona (async/await) que retornará um booleano.
    Task<bool> SendTextMessageAsync(string number, string message);
}
