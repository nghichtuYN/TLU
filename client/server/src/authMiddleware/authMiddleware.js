const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, member) => {
    if (err) {
      return res.status(404).json({
        message: "the authemtication",
        status: "ERROR2",
      });
    }
    if (member.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "the authemtication",
        status: "ERROR1",
      });
    }
  });
};
const authMemberMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const memberID = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, member) => {
    if (err) {
      return res.status(404).json({
        message: "the authemtication",
        status: "ERROR",
      });
    }
    if (member?.isAdmin || member?.id === memberID) {
      next();
    } else {
      return res.status(404).json({
        message: "the authemtication",
        status: "ERROR",
      });
    }
  });
};
module.exports = { authMiddleware, authMemberMiddleware };
