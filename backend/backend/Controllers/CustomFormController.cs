// File: CustomFormController.cs (final updated version)
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System.IO;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomFormController : ControllerBase
    {
        private readonly CustomFormServices _customFormServices;

        public CustomFormController(CustomFormServices customFormServices)
        {
            _customFormServices = customFormServices;
        }

        [HttpPost]
        public async Task<IActionResult> PostForm(
            [FromForm] IFormFile image,
            [FromForm] string name,
            [FromForm] int? age,
            [FromForm] string email,
            [FromForm] bool? subscribe,
            [FromForm] string gender,
            [FromForm] string message)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email))
                return BadRequest(new { error = "Name and Email are required." });

            var customForm = new CustomForm
            {
                Name = name,
                Age = age,
                Email = email,
                Subscribe = subscribe,
                Gender = gender,
                Message = message
            };

            if (image != null && image.Length > 0)
            {
                using var ms = new MemoryStream();
                await image.CopyToAsync(ms);
                customForm.Image = ms.ToArray();
            }

            await _customFormServices.SaveFormAsync(customForm);
            return Ok(new { message = "Form data saved successfully!" });
        }

        [HttpGet]
        public async Task<IActionResult> GetForms()
        {
            var forms = await _customFormServices.GetAllFormsAsync();
            return Ok(forms);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForm(int id)
        {
            var result = await _customFormServices.DeleteFormAsync(id);
            if (!result) return NotFound();
            return Ok(new { message = "Form deleted" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateForm(
            int id,
            [FromForm] IFormFile image,
            [FromForm] string name,
            [FromForm] int? age,
            [FromForm] string email,
            [FromForm] bool? subscribe,
            [FromForm] string gender,
            [FromForm] string message)
        {
            var form = new CustomForm
            {
                Id = id,
                Name = name,
                Age = age,
                Email = email,
                Subscribe = subscribe,
                Gender = gender,
                Message = message
            };

            if (image != null && image.Length > 0)
            {
                using var ms = new MemoryStream();
                await image.CopyToAsync(ms);
                form.Image = ms.ToArray();
            }

            var result = await _customFormServices.UpdateFormAsync(form);
            if (!result) return NotFound();
            return Ok(new { message = "Form updated" });
        }

        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var form = await _customFormServices.GetFormByIdAsync(id);
            if (form?.Image == null)
                return NotFound();

            return File(form.Image, "image/jpeg"); // Assuming image is jpeg
        }
    }
}
