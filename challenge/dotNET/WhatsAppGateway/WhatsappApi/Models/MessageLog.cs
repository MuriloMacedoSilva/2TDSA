namespace WhatsappApi.Models;

public class MessageLog
{
    public int Id { get; set; }
    public string Number { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
}