const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const categoryService = require('./services/categoryService');

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

// ✅ Load categories before all routes
app.use(async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.locals.categories = categories;
    next();
  } catch (err) {
    next(err);
  }
});

// Routes
const listingRoutes = require('./routes/listingRoutes');

app.get('/', (req, res) => res.render('home.njk'));
app.get('/about', (req, res) => res.render('about.njk'));
app.get('/contact', (req, res) => res.render('contact.njk'));
app.use('/listings', listingRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404.njk', { url: req.originalUrl });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
