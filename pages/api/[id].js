import dbConnect from "../../utils/dbConnect";
const User = require("../../models/User");
import { verify } from "jsonwebtoken";

dbConnect();

export const authenticated = (fn) => async (req, res) => {
  verify(req.headers.token, process.env.SECRET_TOKEN, async function (
    err,
    decoded
  ) {
    if (!err && decoded) {
      if (req.query.id === decoded.sub) {
        return await fn(req, res);
      } else {
        res.status(401).json({ message: "The user is not authenticated." });
      }
    }
  });
};

export default authenticated(async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(req.query.id);
        res.status(200).json({ data: user });
      } catch (error) {
        res.status(400).json({ message: "server error" });
      }
      break;
  }
});
