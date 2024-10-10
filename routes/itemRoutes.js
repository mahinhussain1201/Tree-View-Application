const express = require('express');
const { getItemById } = require('../controllers/itemControllers'); // Import the controller function

const router = express.Router();

// Route to get an item by ID
router.get('/:id', getItemById);

module.exports = router;
