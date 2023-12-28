const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const menuSchema = new Schema({
  restauran_id: String,
  logo: String,
});

module.exports = mongoose.model("Menu", menuSchema);
