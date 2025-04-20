import { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Product added!");
    setFormData({ name: "", category: "", price: "", quantity: "" });
  };

  return (
    <div className="admin-section">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
        <input name="category" placeholder="Category" onChange={handleChange} value={formData.category} required />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} value={formData.price} required />
        <input name="quantity" placeholder="Quantity" type="number" onChange={handleChange} value={formData.quantity} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
