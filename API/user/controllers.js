const { User } = require("../../db/models");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.create(req.body);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
