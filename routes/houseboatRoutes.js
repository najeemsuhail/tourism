const express = require('express');
const router = express.Router();

const {
  showHouseboats,
  createHouseboat,
  editHouseboat,
  deleteHouseboat,
} = require('../controllers/houseboatController');

router.get('/', showHouseboats);
router.post('/add', createHouseboat);
router.post('/edit/:id', editHouseboat);
router.post('/delete/:id', deleteHouseboat);

module.exports = router;
