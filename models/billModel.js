const mongoose = require("mongoose");
const billSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: false,
    },
    doctorId: {
      type: String,
      required: false,
    },
    medicationFee: {
      type: String,
      required: false,
    },
    medicineFee: {
      type: String,
      required: false,
    },
    Total: {
      type: String,
      required: false,
    },
    
  },
  {
    timestamps: true,
  }
);

const billModel = mongoose.model("bill", billSchema);
module.exports = billModel;