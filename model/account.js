const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    role: {
      type: Number,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Account", accountSchema);
