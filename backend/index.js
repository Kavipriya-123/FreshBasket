const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kavi@2003",
  database: "FruitsDB", // Make sure the database exists
  port: 3306,
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err.message);
    return;
  }
  console.log("Connected to MySQL DB");
});

// API endpoint to get products
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products"; // Make sure 'products' table exists
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// API endpoint to handle order placement
app.post("/place-order", (req, res) => {
  const { name, phone, address, items } = req.body;

  // Step 1: Insert the order details into the 'orders' table
  const orderQuery = `
    INSERT INTO orders (name, phone, address) 
    VALUES (?, ?, ?)`;

  db.query(orderQuery, [name, phone, address], (err, result) => {
    if (err) {
      console.error("Error placing order:", err.message);
      return res.status(500).json({ error: "Failed to place order" });
    }

    const orderId = result.insertId;

    // Step 2: Insert the order items into the 'order_items' table
    items.forEach((item) => {
      const { productId, quantity } = item;

      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES (?, ?, ?)`;

      db.query(itemQuery, [orderId, productId, quantity], (err) => {
        if (err) {
          console.error("Error inserting order item:", err.message);
        }
      });
    });

    return res.status(200).json({ message: "Order placed successfully!" });
  });
});


app.get("/orders/:id", (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT o.id, o.status, oi.quantity, p.name
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.id = ?`;
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error fetching order:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      const order = {
        id,
        status: results[0].status,
        items: results.map(item => ({
          name: item.name,
          quantity: item.quantity,
        })),
      };
  
      res.json(order);
    });
  });



// Add product
app.post("/add-product", (req, res) => {
    const { name, category, price, quantity } = req.body;
    db.query(
      "INSERT INTO products (name, category, price, quantity) VALUES (?, ?, ?, ?)",
      [name, category, price, quantity],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Product added" });
      }
    );
  });
  
  // Delete product
  app.delete("/delete-product/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Product deleted" });
    });
  });
  
  // Get all orders
  app.get("/orders", (req, res) => {
    db.query("SELECT * FROM orders", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
  // Update order status
  app.put("/orders/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Status updated" });
    });
  });



// Start the server
app.listen(5000, () => {
  console.log("Server running at port 5000");
});
