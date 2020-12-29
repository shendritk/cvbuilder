const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name cannot be empty"],
  },
  lastName: {
    type: String,
    required: [true, "Last name cannot be empty"],
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },

  cvs: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Cv" }],
});


const User = mongoose.model("User", userSchema);

module.exports = User;
