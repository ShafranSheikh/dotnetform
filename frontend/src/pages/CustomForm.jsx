import { useEffect, useState } from "react";

export default function CustomForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    subscribe: false,
    gender: "",
    image: null,
    message: "",
  });

  const [forms, setForms] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchForms = async () => {
    const res = await fetch("http://localhost:5204/api/customform");
    const data = await res.json();
    setForms(data);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const url = editingId
      ? `http://localhost:5204/api/customform/${editingId}`
      : "http://localhost:5204/api/customform";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      body: data,
    });

    if (response.ok) {
      alert(`Form ${editingId ? "updated" : "submitted"} successfully!`);
      setFormData({
        name: "",
        age: "",
        email: "",
        subscribe: false,
        gender: "",
        image: null,
        message: "",
      });
      setEditingId(null);
      fetchForms();
    } else {
      alert("Form submission failed.");
    }
  };

  const handleEdit = (form) => {
    setFormData({
      name: form.name,
      age: form.age,
      email: form.email,
      subscribe: form.subscribe,
      gender: form.gender,
      image: null,
      message: form.message,
    });
    setEditingId(form.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    const res = await fetch(`http://localhost:5204/api/customform/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchForms();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full border p-2"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="block w-full border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full border p-2"
        />
        <label>
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
          />
          Subscribe to newsletter
        </label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block"
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          className="block w-full border p-2"
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {editingId ? "Update" : "Submit"}
        </button>
      </form>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Subscribe</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id} className="border-t">
              <td className="p-2 border">
                {form.image ? (
                  <img
                    src={`http://localhost:5204/api/customform/image/${form.id}`}
                    alt="Uploaded"
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-2 border">{form.name}</td>
              <td className="p-2 border">{form.age}</td>
              <td className="p-2 border">{form.email}</td>
              <td className="p-2 border">{form.subscribe ? "Yes" : "No"}</td>
              <td className="p-2 border">{form.gender}</td>
              <td className="p-2 border">{form.message}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(form)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(form.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
