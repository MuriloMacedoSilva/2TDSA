using System.Net.Http.Json;

namespace WhatsappApi.Services;

public class WppConnectService : IWhatsappService
{
    private readonly HttpClient _httpClient;

    public WppConnectService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<bool> SendTextMessageAsync(string number, string message)
    {
        // Payload adaptado para o formato da WppConnect API
        var payload = new
        {
            phone = number,
            message = message,
            isGroup = false
        };

        try
        {
            // Alterado: adicionado '/default/' como nome da sessão
            var response = await _httpClient.PostAsJsonAsync("api/default/send-message", payload);

            return response.IsSuccessStatusCode;
        }
        catch (Exception)
        {
            return false;
        }
    }
}