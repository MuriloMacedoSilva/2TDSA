namespace WhatsappApi.Models;

public class NotificationRequest
{
    // O '{ get; set; }' é o equivalente aos Getters e Setters (ou ao @Data do Lombok) no Java
    // O 'string.Empty' evita avisos de que a propriedade pode ser nula (Null Safety)
    public string Message { get; set; } = string.Empty;
}