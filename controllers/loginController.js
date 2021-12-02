const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { body } = request;
  const { username, password } = body;
  const user = await User.findOne({ userName: username });

  console.log("Body del request:", body);
  
  const passwordCorrect =
    user == null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user && !passwordCorrect) {
    response.status(401).json({
      error: "User or Password are incorrect ",
    });
  }
  const userForToken = {
    username: user.userName,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  response.send({
    name: user.name,
    username: user.userName,
    token,
  });
});

module.exports = loginRouter;

