const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: String,
  age: String,
  phone: String,
  adress: String,
  email: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", userSchema);
