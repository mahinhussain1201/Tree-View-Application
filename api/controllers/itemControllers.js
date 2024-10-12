const Item = require("../models/item");

const getItemsByGodownId = async (req, res) => {
  try {
    const items = await Item.find({ godown_id: req.params.godownId });
    if (!items.length) {
      return res.status(404).json({ message: "No items found in this godown" });
    }
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItemsByGodownId,
};
