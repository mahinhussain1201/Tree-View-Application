const express = require('express');
const { getAllGodowns, getGodownWithItems } = require('../controllers/godownController'); // Import the controller functions

const router = express.Router();

// Route to get all godowns
router.get('/', getAllGodowns);

// Route to get a godown by ID along with its items
router.get('/:id', getGodownWithItems);

module.exports = router;
