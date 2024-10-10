const Item = require('../models/item');

// Get an item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ item_id: req.params.id }); // Fetch item by ID
    if (!item) {
      return res.status(404).json({ message: 'Item not found' }); // Handle not found case
    }
    res.json(item); // Send the item details as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

module.exports = {
  getItemById,
};
