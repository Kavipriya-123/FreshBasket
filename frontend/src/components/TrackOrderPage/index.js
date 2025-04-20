import { useState } from "react";

import "./index.css"

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/orders/${orderId}`);
    const data = await response.json();
    setOrderDetails(data);
  };

  return (
    <div className="track-order-page">
      <h2 className="track-order-title">Track Your Order</h2>
      <form onSubmit={handleSubmit} className="track-order-form">
        <div className="track-order-input-group">
          <label className="track-order-label">Order ID:</label>
          <input
            type="text"
            value={orderId}
            onChange={handleInputChange}
            required
            className="track-order-input"
            placeholder="Enter your order ID"
          />
        </div>
        <button type="submit" className="track-order-btn">
          Track Order
        </button>
      </form>

      {orderDetails && (
        <div className="track-order-summary">
          <h3 className="track-order-status">
            Order Status: <span>{orderDetails.status}</span>
          </h3>
          <p className="track-order-products-header">Products Ordered:</p>
          <ul className="track-order-items-list">
            {orderDetails.items.map((item, index) => (
              <li key={index} className="track-order-item">
                <span>{item.name}</span> - {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
