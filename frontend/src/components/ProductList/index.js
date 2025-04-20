import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/delete-product/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-section">
      <h3>All Products</h3>
      <ul className="product-list">
        {products.map((prod) => (
          <li key={prod.id}>
            {prod.name} - ₹{prod.price} ({prod.quantity})
            <button onClick={() => handleDelete(prod.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
