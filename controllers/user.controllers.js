const User = require("../models/user");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");
exports.signUp = async (req, res) => {
  const { fullName, age, phone, adress, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({ msj: "this email already exist" });
    }

    const newUser = new User({
      fullName,
      age,
      phone,
      adress,
      email,
      password,
      role,
    });
    const salt = await bc.genSalt(10);
    const hash = await bc.hashSync(password, salt);
    newUser.password = hash;
    await newUser.save();

    const payload = {
      id: newUser._id,
      fullName: newUser,
    };
    const token = jwt.sign(payload, secret);

    res.status(200).send({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        age: newUser.age,
        adress: newUser.adress,
        fullName: newUser.fullName,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msj: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const theUser = await User.findOne({ email });
    if (!theUser) {
      res.status(402).json({ msj: "Invalid email or password" });
    }

    const isMatch = await bc.compare(password, theUser.password);
    if (!isMatch) {
      res.status(402).json({ msj: "Invalid email or password" });
    }

    const payload = {
      id: theUser._id,
      email: theUser.email,
      password: theUser.password,
      phone: theUser.phone,
      age: theUser.age,
      adress: theUser.adress,
      fullName: theUser.fullName,
      role: theUser.role,
    };

    const token = jwt.sign(payload, secret);
    res.status(203).json({
      token,
      user: {
        id: theUser._id,
        email: theUser.email,
        password: theUser.password,
        phone: theUser.phone,
        age: theUser.age,
        adress: theUser.adress,
        fullName: theUser.fullName,
        role: theUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msj: error.message });
  }
};
exports.getUser = (req, res) => {
  res.send(req.user);
};
