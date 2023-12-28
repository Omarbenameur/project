const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT || 4000;
const user = require("./routes/route");
const connectDb = require("./config/connectDb");
const Restaurant = require("./models/restaurant");
const Menu = require("./models/menu");
connectDb();
app.use(express.json());
app.use("/user", user);
app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`server is successsfuly runing on PORT ${PORT}`)
);
//ADD
app.post("/restaurant/add", async (req, res) => {
  const { fullName, phone, adress, logo } = req.body;
  const newRestaurant = new Restaurant({
    fullName,
    phone,
    adress,
    logo,
  });
  try {
    await newRestaurant.save();
    res.send(newRestaurant);
  } catch (error) {
    res.send(error.message);
  }
});
//GET ALL
app.get("/restaurant/get", async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    res.send(restaurant);
  } catch (error) {
    res.send(error.message);
  }
});
//GET ONE
app.get("/restaurant/get/:id", async (req, res) => {
  try {
    const oneRestaurant = await Restaurant.findById(req.params.id);
    res.send(oneRestaurant);
  } catch (error) {
    res.send(error.message);
  }
});
//DELETE
app.delete("/restaurant/delete/:id", async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    res.send("good bye");
  } catch (error) {
    res.send(error.message);
  }
});
//EDIT
app.put("/restaurant/put/:id", async (req, res) => {
  try {
    const editedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(editedRestaurant);
  } catch (error) {
    res.send(error.message);
  }
});
//ADDmenu
app.post("/menu/add", async (req, res) => {
  const { restauran_id, logo } = req.body;
  const newMenu = new Menu({
    restauran_id,
    logo,
  });
  try {
    await newMenu.save();
    res.send(newMenu);
  } catch (error) {
    res.send(error.message);
  }
});
//GET ALL menu
app.get("/menu/get", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.send(menu);
  } catch (error) {
    res.send(error.message);
  }
});
//DELETEmenu
app.delete("/menu/delete/:id", async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    res.send("good bye");
  } catch (error) {
    res.send(error.message);
  }
});
