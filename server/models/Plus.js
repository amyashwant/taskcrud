const mongoose = require("mongoose");
// title, description, dueDate, status, assignedUser
const plusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 50,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    assignedUser: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plus", plusSchema);
