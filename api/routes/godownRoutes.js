const express = require('express');
const { getAllGodowns, getGodownWithItems } = require('../controllers/godownController'); // Import the controller functions

const router = express.Router();

router.get('/', getAllGodowns);

router.get('/:id', getGodownWithItems);

module.exports = router;
