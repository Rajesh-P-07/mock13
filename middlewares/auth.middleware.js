require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.auth;
  jwt.verify(token, process.env.key, function (err, decoded) {
    if (decoded) {
        next();
    }else{
        res.send("Please login");
    }
  });
};

module.exports={authentication};
