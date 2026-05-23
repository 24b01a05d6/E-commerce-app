const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Shoes", price: 1000 },
  { id: 2, name: "Watch", price: 2000 }
];

// Get products
app.get('/products', (req, res) => {
  res.json(products);
});

// Add product (ADMIN)
app.post('/add-product', (req, res) => {
  const { name, price, role } = req.body;

  if (role !== "admin") {
    return res.json({ message: "Access Denied" });
  }

  products.push({
    id: products.length + 1,
    name,
    price
  });

  res.json({ message: "Product Added" });
});

// Order (USER)
app.post('/order', (req, res) => {
  const { role } = req.body;

  if (role !== "user") {
    return res.json({ message: "Only users can order" });
  }

  res.json({ message: "Order Placed Successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});