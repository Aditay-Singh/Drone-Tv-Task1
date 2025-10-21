import React, { useState } from "react";

function AddPropertyForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    location: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.price) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await onAdd(formData);
      setFormData({
        name: "",
        type: "",
        price: "",
        location: "",
        description: "",
        image: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add New Property</h3>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="type"
        placeholder="Type (e.g., Flat, Villa)"
        value={formData.type}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <button type="submit">Add Property</button>
    </form>
  );
}

export default AddPropertyForm;
