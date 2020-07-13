const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
