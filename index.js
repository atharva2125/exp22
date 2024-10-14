const express = require('express');
const app = express();
const port = 5000;

// Sample product data
const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Smartphone', category: 'Electronics', price: 699.99 },
  { id: 3, name: 'Headphones', category: 'Accessories', price: 149.99 },
  { id: 4, name: 'Running Shoes', category: 'Sports', price: 89.99 },
  { id: 5, name: 'Coffee Maker', category: 'Home Appliances', price: 79.99 },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Product Management API' });
});

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// GET search products
app.get('/search', (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  let filteredProducts = [...products];

  if (name) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  res.json(filteredProducts);
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
