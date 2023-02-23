const mongoose = require("mongoose");
const receivingSchema = new mongoose.Schema(
    {   supplier : {
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
        price: {
          type: String,
          required: false,
        },
       
      },
  {
    timestamps: true,
  }
);

const receivingModel = mongoose.model("receive", receivingSchema);
module.exports = receivingModel;
