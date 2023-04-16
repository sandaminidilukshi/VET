const mongoose = require("mongoose");
const billSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    doctorId: {
      type: String,
      required: false,
    },
    recordId: {
      type: String,
      required: false,
    },
    medicines: [
      {
         
       
       
          medicineName: {
            type: String,
            required: false,
          },
          morning: {
            
              type: String,
              required: false,
            
          },
          afternoon: {
            
              type: String,
              required: false,
            
          },
          evening: {
            
              type: String,
              required: false,
            },
          
        duration: {
          type: String,
          required: false,
        }}],

    medicationFee: {
      type: String,
      required: false,
    },
    medicineFee: {
      type: Number,
      required: false,
    },
    taxRate: {
      type: String,
      required: false,
    },
    total: {
      type: String,
      required: false,
    },
    payment:
    {
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