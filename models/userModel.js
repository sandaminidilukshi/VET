const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isPharmacist: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
    animals:[{
      animalName: {
        type: String,
        required: false,
       },
       
       gender: {
         type: String,
         required: [false, "Please enter gender"], 
       },
             
       reproduction: {
         type: String,
         required: [false, "Please enter reproduction status"],
        
       },
       weight: {
         type: String,
         required: [false, "Please enter weight"],
        
       },
      
       animalType: {
         type: String,
         required: [false, "Please enter animal type"]
       }}
    ],
 
  
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
