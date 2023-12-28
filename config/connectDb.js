const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.db);
    console.log("database is succesfully connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
