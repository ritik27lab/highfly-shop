const User = require("./../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";
const signUp = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      email: email,
      userName: userName,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(200).json({ user: result, token: token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Somewhere went wrong" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not exists" });
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );

    res.status(200).json({ user: existingUser, token: token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Somewhere went wrong" });
  }
};

module.exports = { signUp, signIn };
