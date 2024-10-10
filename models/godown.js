const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const godownSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  parent_godown: {
    type: String,
    default: null, 
  }
});

module.exports = mongoose.model('Godown', godownSchema);
