// server.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios")
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

let cart = []; // In-memory shopping cart


// Endpoint to retrieve book data
app.get('/api/books', (req, res) => {
  // Assuming you have an array of book objects
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1', price: 10.99 },
    { id: 2, title: 'Book 2', author: 'Author 2', price: 12.99 },
    { id: 3, title: 'Book 3', author: 'Author 3', price: 8.99 },
    // ...
  ];

  res.json(books);
});

// Endpoint to add a book to the shopping cart
app.post('/api/cart', (req, res) => {
  const { id,author,title,price } = req.body;

  // Assuming the book with the given id exists in the database
  const book = {
    id,
    title: title, // Replace with actual book title
    author: author, // Replace with actual book author
    price: price, // Replace with actual book price
  };

  cart.push(book);

  res.status(201).json({ message: 'Book added to cart successfully' });
});

app.get('/api/cart', (req,res) => {
  res.json(cart)
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
