import { useState, useEffect } from "react";
import "./index.css";

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
    items: [{ productId: "", quantity: 1 }],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const jsonData = await res.json();
      setProducts(jsonData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...orderData.items];
    newItems[index][field] = value;
    setOrderData({ ...orderData, items: newItems });
  };

  const addItem = () => {
    setOrderData({
      ...orderData,
      items: [...orderData.items, { productId: "", quantity: 1 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      await res.json();
      alert("Order placed successfully!");
      // reset form
      setOrderData({
        name: "",
        phone: "",
        address: "",
        items: [{ productId: "", quantity: 1 }],
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order!");
    }
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={orderData.name}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={orderData.phone}
          onChange={handleChange}
          required
        />

        <label>Delivery Address:</label>
        <textarea
          name="address"
          value={orderData.address}
          onChange={handleChange}
          required
        />

        <h4>Select Products:</h4>
        {orderData.items.map((item, index) => (
          <div key={index} className="product-select-group">
            <select
              value={item.productId}
              onChange={(e) =>
                handleItemChange(index, "productId", e.target.value)
              }
              required
            >
              <option value="">-- Select Product --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={addItem} className="add-item-btn">
          + Add Another Product
        </button>

        <button type="submit" className="submit-btn">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
