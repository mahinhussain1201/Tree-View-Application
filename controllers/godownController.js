const Godown = require('../models/godown');

// Get all godowns
const getAllGodowns = async (req, res) => {
  try {
    const godowns = await Godown.find(); // Fetch all godowns from the database
    res.json(godowns); // Send the fetched godowns as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

// Get a godown by ID along with its items
const getGodownWithItems = async (req, res) => {
  try {
    const godown = await Godown.findOne({ id: req.params.id }); // Fetch the godown by ID
    if (!godown) {
      return res.status(404).json({ message: 'Godown not found' }); // Handle not found case
    }

    // Fetch items that belong to this godown
    const items = await Item.find({ godown_id: req.params.id });

    res.json({
      godown,
      items,
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

module.exports = {
  getAllGodowns,
  getGodownWithItems,
};
