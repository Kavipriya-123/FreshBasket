import ProductForm from "../ProductForm";
import ProductList from "../ProductList";
import OrderList from "../OrderList";

import "./index.css"

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">
      <h2 className="admin-title">Admin Dashboard - Agrofix</h2>
      <ProductForm />
      <ProductList />
      <OrderList />
    </div>
  );
};

export default AdminPanel;
