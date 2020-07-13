import { hash } from "bcrypt";
import dbConnect from "../../utils/dbConnect";
const User = require("../../models/User");
import { sign } from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        hash(req.body.password, 10, async function (err, hash) {
          req.body.password = hash;
          const newUser = await User.create(req.body);
          await newUser.save();

          const claims = { sub: newUser._id };
          const jwt = sign(claims, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
          });
          res.status(200).json({ authToken: jwt, userId: newUser._id });
        });
      } catch (error) {
        res.status(400).json({ message: "server error" });
      }
      break;
  }
};
