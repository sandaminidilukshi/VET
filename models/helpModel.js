const mongoose = require("mongoose");
const helpSchema = new mongoose.Schema(
    {    
    //     userID: {
    //     type: String,
    //     required: false,
    //    },

         animalTypehelp: {
         type: String,
         required: false,
        },
        
        phone: {
          type: String,
          required: false, 
        },
              
        emailAddress: {
          type: String,
          required: false,
         
        },
        issue: {
          type: String,
          required: false,
         
        },
       
        need: {
          type: String,
          required: false,
        },
        answer: {
            type: String,
            required: false,
          },
     
      },
      { timestamps: true }


)


const helpModel = mongoose.model("help", helpSchema);
module.exports = helpModel;