const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

exports.authenticate = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.session) {
    token = req.cookies.session;
  }
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    jwt.verify(token, process.env.JWTPRIVATEKEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }
  
      // Token is valid and decoded contains the payload
      req.user = decoded;
      if (decoded) {
        const userExist = await User.findOne({ Email: decoded.Email });
        if (userExist) {
          req.user = decoded;
          return next();
        } else {
          return res.status(401).send("Unauthorized access");
        }
      }
    });
   
    
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
