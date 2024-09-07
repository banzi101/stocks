const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Balance", balanceSchema);
