const fs = require('fs');
const path = require('path');

const listingService = require('../services/listingService');

exports.showListings = async (req, res) => {
  const listings = await listingService.getAllListings();
  const categories = await listingService.getAllCategories();
  const attributes = await listingService.getAllAttributes();
  res.render('listings.njk', { listings, categories, attributes });
};

exports.createListing = async (req, res) => {
  let categoryIds = req.body.categoryIds;
  if (!Array.isArray(categoryIds)) {
    categoryIds = categoryIds ? [categoryIds] : [];
  }

  let attributeIds = req.body.attributeIds;
  if (!Array.isArray(attributeIds)) {
    attributeIds = attributeIds ? [attributeIds] : [];
  }
  await listingService.addListing(req.body, categoryIds, attributeIds);
  res.redirect('/listings');
};

exports.editListing = async (req, res) => {
  let categoryIds = req.body.categoryIds;
  if (!Array.isArray(categoryIds)) {
    categoryIds = categoryIds ? [categoryIds] : [];
  }
  let attributeIds = req.body.attributeIds;
  if (!Array.isArray(attributeIds)) {
    attributeIds = attributeIds ? [attributeIds] : [];
  }

  await listingService.updateListing(req.params.id, req.body, categoryIds, attributeIds);
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


exports.showListingDetails = async (req, res) => {
  const listingId = req.params.id;
  const listing = await listingService.getListingById(listingId);

  if (!listing) {
    return res.status(404).render('404.njk');
  }

  const baseName = listing.image.split('.')[0]; // e.g., "royalboat"
  const dirPath = path.join(__dirname, '../public/images/listing');

  const allImages = fs.readdirSync(dirPath)
    .filter(filename => filename.startsWith(baseName));

  listing.gallery = allImages;
  res.render('listing-detail.njk', { listing });
};