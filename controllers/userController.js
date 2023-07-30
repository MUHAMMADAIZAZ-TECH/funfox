const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
//signup
export const signup = async (req, res) => {
  try {
    let user = registerUser(req);
    let userexist = await User.findOne({
      Email: req.body.Email,
    });
    if (userexist) {
      return res.status(409).send({
        message: "User with given email already exist",
      });
    }
    await user.save();
    res.status(201).send({ message: "successfully registerd" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
//signin
export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (!isValidPassword(user, req.body.Password)) {
      return res.status(401).json({ accessToken: null, message: 'Invalid password' });
    }

    // Generate a JWT token
    const accessToken = generateAccessToken(user);

    res.status(200).json({
      success: true,
      user: {
        Name: user.Name,
        Email: user.Email,
        Group: user.Group,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken, // Include the JWT token in the response
      message: 'Successfully Login',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
function generateAccessToken(user) {
  const payload = {
    userId: user._id,
    userEmail: user.Email,
    // You can add more data to the payload if needed
  };

  const expiresIn = '1h';
  return jwt.sign(payload, process.env.JWTPRIVATEKEY, { expiresIn });
}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.Password);
}

function registerUser(req) {
  return new User({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: bcrypt.hashSync(req.body.Password, 10),
    Group: req.body.Group,
  });
}
