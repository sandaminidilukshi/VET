const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Prescription = require("../models/prescriptionModel")
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const Animal = require("../models/animalModel")

router.post("/save-animal", authMiddleware, async (req, res) => {
    try {
      const newAnimal = new Animal({
        animalName: req.body.animalName,
        gender: req.body.gender,
        reproduction: req.body.reproduction,
        weight: req.body.weight,
        animalType: req.body.animalType,
        
  
      });
      await newAnimal.save();  
      res.status(200).send({
        success: true,
        message: "Animal registered successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in registering animal",
        success: false,
        error,
      });
    }
  });

  router.get("/get-animals", async (req, res) => {
    try {
      const animals = await Animal.find({});
      res.status(200).send({
        message: "Animals details fetched successfully",
        success: true,
        data: animals,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error getting animal details",
        success: false,
        error,
      });
    }
  });
  

  module.exports = router;