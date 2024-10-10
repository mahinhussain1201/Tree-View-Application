const Item = require('../models/item');

// Get all items by Godown ID
const getItemsByGodownId = async (req, res) => {
  try {
    // Find all items where godown_id matches the provided godown_id in the request
    const items = await Item.find({ godown_id: req.params.godownId });
    if (!items.length) {
      return res.status(404).json({ message: 'No items found in this godown' });
    }
    res.json(items); // Send the items as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any server errors
  }
};

module.exports = {
  getItemsByGodownId,
};
