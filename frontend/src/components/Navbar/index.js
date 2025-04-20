import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <h2>AgroFix</h2>
      </div>
      <nav className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/order/1" className="navbar-link">Place-Order</Link>
        <Link to="/track-orders" className="navbar-link">Track Order</Link>
        <Link to="/admin" className="navbar-link">Admin Panel</Link>
      </nav>
    </header>
  );
};

export default Navbar;
