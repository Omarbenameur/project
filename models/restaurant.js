const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
  fullName: String,
  phone: String,
  logo: String,
  adress: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
