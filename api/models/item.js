const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['in_stock', 'out_of_stock'],
    required: true,
  },
  godown_id: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  attributes: {
    type: new Schema({
      type: {
        type: String,
        required: true,
      },
      material: {
        type: String,
        required: true,
      },
      warranty_years: {
        type: Number,
        required: true,
      },
    }),
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Item', itemSchema);
