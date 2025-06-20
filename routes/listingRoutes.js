const express = require('express');
const router = express.Router();

const {
  showListings,
  createListing,
  editListing,
  deleteListing,
  showListingsByCategory,
  showListingDetails
} = require('../controllers/listingController');

router.get('/', showListings);
router.post('/add', createListing);
router.post('/edit/:id', editListing);
router.post('/delete/:id', deleteListing);
router.get('/details/:id', showListingDetails);

router.get('/:category', showListingsByCategory);  
router.get('/:category/:subcategory', showListingsByCategory);


module.exports = router;