import { useEffect, useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/orders");
    const data = await res.json();
    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-section">
      <h3>All Orders</h3>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - {order.status}
            <button onClick={() => updateStatus(order.id, "Delivered")}>Mark Delivered</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
