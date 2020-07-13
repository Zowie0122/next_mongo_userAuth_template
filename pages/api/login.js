import dbConnect from "../../utils/dbConnect";
const User = require("../../models/User");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({
          email: req.body.email,
        });

        compare(req.body.password, user.password, function (err, result) {
          if (!err && result) {
            const claims = { sub: user._id };
            const jwt = sign(claims, process.env.SECRET_TOKEN, {
              expiresIn: "1h",
            });
            res.status(200).json({ authToken: jwt, userId: user._id });
          } else {
            res
              .status(400)
              .json({ message: "Email and Password are not matched" });
          }
        });
      } catch (error) {
        res.status(400).json({ message: "server error" });
      }
      break;
  }
};
