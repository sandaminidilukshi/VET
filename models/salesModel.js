const mongoose = require("mongoose");
const salesSchema = new mongoose.Schema(
    {   customername : {
         type: String,
         required: false,
        },
        productname : {
          type: String,
          required: false,
        },
        
    
        quantity: {
          type: String,
          required: false,
        },
        date1: {
          type: String,
          required: false,
        },
       
      },
  {
    timestamps: true,
  }
);

const salesModel = mongoose.model("sales", salesSchema);
module.exports = salesModel;
