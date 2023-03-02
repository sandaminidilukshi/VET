const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Prescription = require("../models/prescriptionModel")
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

router.post("/save-prescription", authMiddleware, async (req, res) => {
  try {
    const newPrescription = new Prescription({
      user: req.body.user,
      userId:req.body.userId,
      doctor: req.body.doctor,
      animalName: req.body.animalName,
      animalId: req.body.animalId,
      animaltype: req.body.animaltype,
      chiefComplaints: req.body.chiefComplaints,
      notes: req.body.notes,
      diagnosis: req.body.diagnosis,
      procedureConducted: req.body.procedureConducted,
      medicines: req.body.medicines,
      advices: req.body.advices,

    });
    await newPrescription.save();
      
    res.status(200).send({
      success: true,
      message: "Record created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in creating record",
      success: false,
      error,
    });
  }
});
router.get("/get-all-records", async (req, res) => {
  try {
    const prescription = await Prescription.find({});
    res.status(200).send({
      message: "Animal records fetched successfully",
      success: true,
      data: prescription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting animal records",
      success: false,
      error,
    });
  }
});

router.post("/get-animal-records-by-animal-ID", async (req, res) => {
  try {
    const prescription = await Prescription.find({animalId:req.body.animalId});
    res.status(200).send({
      message: "Animal records by Id fetched successfully",
      success: true,
      data: prescription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting animal records",
      success: false,
      error,
    });
  }
});
// router.post("/get-prescription-by-userId", async (req, res) => {
//   try {
//     const prescription = await Prescription.find({userId:req.body.userId});
//     res.status(200).send({
//       message: "Prescription fetched successfully by user Id",
//       success: true,
//       data: prescription,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error getting prescription requests",
//       success: false,
//       error,
//     });
//   }
// });



module.exports = router;
