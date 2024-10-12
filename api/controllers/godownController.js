const Godown = require("../models/godown");

const getAllGodowns = async (req, res) => {
  try {
    const godowns = await Godown.find();
    res.json(godowns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGodownWithItems = async (req, res) => {
  try {
    const godown = await Godown.findOne({ id: req.params.id });
    if (!godown) {
      return res.status(404).json({ message: "Godown not found" });
    }

    const items = await Item.find({ godown_id: req.params.id });

    res.json({
      godown,
      items,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGodowns,
  getGodownWithItems,
};
