const mongoose = require("mongoose");
const supplierSchema = new mongoose.Schema(
    {   supplier : {
         type: String,
         required: false,
        },
        contact : {
          type: String,
          required: false,
        },
        
    
        address: {
          type: String,
          required: false,
        },
        
       
      },
  {
    timestamps: true,
  }
);

const supplierModel = mongoose.model("supplier", supplierSchema);
module.exports = supplierModel;
