const mongoose = require("mongoose");
const animalSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: String,
    //   required: false,
    // },
    animalName: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: [true, "Please enter gender"],
    },

    reproduction: {
      type: String,
      required: [true, "Please enter reproduction status"],
    },
    weight: {
      type: String,
      required: [true, "Please enter weight"],
    },

    animalType: {
      type: String,
      required: [true, "Please enter animal type"],
    },
  },
  { timestamps: true }
);

const animalModel = mongoose.model("animal", animalSchema);
module.exports = animalModel;
