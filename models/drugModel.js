const mongoose = require("mongoose");
const drugSchema = new mongoose.Schema(
    {   
        productname : {
          type: String,
          required: false,
        },
        itemno: {
          type: String,
          required: false,
        },
    
        manufacturer: {
          type: String,
          required: false,
        },
    
        category: {
          type: String,
          required: false,
        },
        price: {
          type: String,
          required: false,
        },
    
        quantity: {
          type: String,
          required: false,
        },
        expiry: {
          type: String,
          required: false,
        }
      
       
      },
  {
    timestamps: true,
  }
);

const drugModel = mongoose.model("drugs", drugSchema);
module.exports = drugModel;
