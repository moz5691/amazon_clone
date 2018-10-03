const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InventorySchema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  itemDepartment: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  itemCount: {
    type: Number,
    required: true
  }
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
