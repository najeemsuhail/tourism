const listingService = require('../services/listingService');

exports.showListings = async (req, res) => {
  const listings = await listingService.getAllListings();
  const categories = await listingService.getAllCategories();
  res.render('listings.njk', { listings, categories });
};

exports.createListing = async (req, res) => {
  let categoryIds = req.body.categoryIds;
  if (!Array.isArray(categoryIds)) {
    categoryIds = categoryIds ? [categoryIds] : [];
  }
  await listingService.addListing(req.body, categoryIds);
  res.redirect('/listings');
};

exports.editListing = async (req, res) => {
  let categoryIds = req.body.categoryIds;
  if (!Array.isArray(categoryIds)) {
    categoryIds = categoryIds ? [categoryIds] : [];
  }
  await listingService.updateListing(req.params.id, req.body, categoryIds);
  res.redirect('/listings');
};

exports.deleteListing = async (req, res) => {
  await listingService.deleteListing(req.params.id);
  res.redirect('/listings');
};

exports.showListingsByCategory = async (req, res) => {
  const { category, subcategory } = req.params;

  try {
    const listings = await listingService.getListingsByCategory(category, subcategory);

    if (!listings || listings.length === 0) {
      return res.status(404).render('404.njk', {
        message: `No listings found for "${category}${subcategory ? ' / ' + subcategory : ''}"`,
      });
    }

    res.render('listing_grid.njk', { listings, category, subcategory });
  } catch (err) {
    console.error('Error fetching listings by category:', err);
    res.status(500).render('500.njk', {
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
};
