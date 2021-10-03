const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EmailSchema = new Schema({
  to_email: {
    type: String,
    required: true,
  },
  from_email: {
    type: String,
    required: true,
  },
  scheduled_time: {
    type: Date,
    required: true,
  },
  sender_name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", EmailSchema);
