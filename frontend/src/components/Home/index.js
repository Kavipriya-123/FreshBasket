import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const jsonData = await res.json();
      setProducts(jsonData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">AG Fruits and Vegetables</h1>
      <div className="home-products-container">
        {products.map((item) => (
          <div key={item.id} className="home-product-card" style={{ backgroundColor: 'lightblue' }}>
            
            <div className="home-product-details">
              <h3 className="home-product-name">{item.name}</h3>
              <p className="home-product-info">Category: {item.category}</p>
              <p className="home-product-info">
                Price: ₹{item.price} / {item.unit}
              </p>
              <p className="home-product-info">
                Stock: {item.stock_quantity}
              </p>
              <Link to={`/order/${item.id}`} className="home-order-btn">
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
