using Microsoft.EntityFrameworkCore;
using WhatsappApi.Models;

namespace WhatsappApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<MessageLog> MessageLogs => Set<MessageLog>();
}