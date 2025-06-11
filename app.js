const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Nunjucks template setup
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.set('view engine', 'njk');
// Routes
const houseboatRoutes = require('./routes/houseboatRoutes');

// Homepage
app.get('/', (req, res) => {
    res.render('home.njk');
});

// About us
app.get('/about', (req, res) => {
    res.render('about.njk');
});

// About us
app.get('/contact', (req, res) => {
    res.render('contact.njk');
});

// Use other route handlers
app.use('/houseboats', houseboatRoutes);

// Fallback
app.use((req, res) => {
    res.render('home.njk');
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
