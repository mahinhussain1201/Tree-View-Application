const express = require('express');
const { getItemsByGodownId } = require('../controllers/itemControllers'); // Import the controller function
const router = express.Router();

// Route to get all items by godown_id
router.get('/godown/:godownId', getItemsByGodownId); // :godownId is the dynamic part of the URL

module.exports = router;
