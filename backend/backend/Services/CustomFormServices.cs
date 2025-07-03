using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CustomFormServices
    {
        private readonly CustomFormDatabaseSettings _context;

        public CustomFormServices(CustomFormDatabaseSettings context)
        {
            _context = context;
        }

        public async Task SaveFormAsync(CustomForm customform)
        {
            await _context.CustomForms.AddAsync(customform);
            await _context.SaveChangesAsync();
        }

        public async Task<List<CustomForm>> GetAllFormsAsync()
        {
            return await _context.CustomForms.ToListAsync();
        }

        public async Task<CustomForm?> GetFormByIdAsync(int id)
        {
            return await _context.CustomForms.FindAsync(id);
        }

        public async Task<bool> DeleteFormAsync(int id)
        {
            var form = await _context.CustomForms.FindAsync(id);
            if (form == null) return false;

            _context.CustomForms.Remove(form);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateFormAsync(CustomForm updatedForm)
        {
            var existingForm = await _context.CustomForms.FindAsync(updatedForm.Id);
            if (existingForm == null) return false;

            existingForm.Name = updatedForm.Name;
            existingForm.Age = updatedForm.Age;
            existingForm.Email = updatedForm.Email;
            existingForm.Subscribe = updatedForm.Subscribe;
            existingForm.Gender = updatedForm.Gender;
            existingForm.Message = updatedForm.Message;

            if (updatedForm.Image != null)
            {
                existingForm.Image = updatedForm.Image;
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
