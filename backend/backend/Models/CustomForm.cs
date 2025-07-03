using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CustomForm
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Age { get; set; }
        public string Email { get; set; }
        public bool? Subscribe { get; set; }
        public string Gender { get; set; }
        public byte[] Image { get; set; }
        public string Message { get; set; }
    }
}
