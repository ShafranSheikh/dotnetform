using Microsoft.EntityFrameworkCore;
namespace backend.Models
{
    public class CustomFormDatabaseSettings : DbContext
    {
        public CustomFormDatabaseSettings(DbContextOptions<CustomFormDatabaseSettings> options) : base(options)
        {
        }
        //this represents the form table in postgres, <CustomForm> is the model class and CustomForms is the table name
        public DbSet<CustomForm> CustomForms { get; set; }
    }
}
