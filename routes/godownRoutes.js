const express = require('express');
const Godown = require('../models/godown');
const router = express.Router();

// Get all godowns
router.get('/', async (req, res) => {
  try {
    const godowns = await Godown.find();
    res.json(godowns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new godown
router.post('/', async (req, res) => {
  const godown = new Godown(req.body);
  try {
    const newGodown = await godown.save();
    res.status(201).json(newGodown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
