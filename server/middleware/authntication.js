const user = require("../model/user");
const jwt = require("jsonwebtoken");

const authintiaction = async (req, res, next) => {
  try {
    const token = res.cookies.Amzoneweb;
    const verfyToken = jwt.verify(token, process.env.secret_key);
    console.log(verfyToken);
      const rootUser = await user.findOne({ _id: verfyToken._id, "token.token": token });
      console.log(rootUser);
      if (!rootUser) { throw new Error("user not found"); }
      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;
      next();
  } catch (err) {
      res.status(401).send("unauthrized: No token Provided");
      console.log(err);
  }
};
module.exports = authintiaction;
