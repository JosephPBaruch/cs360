const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the about.html file
app.get('/bio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bio.html'));
});

// Serve the portfolio.html file
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

// Serve the contact.html file
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve the signin.html file
app.get('/photos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'photos.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
