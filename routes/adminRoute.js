const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Pharmacist = require("../models/pharmacistModel")
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-pharmacists", authMiddleware, async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find({});
    res.status(200).send({
      message: "Pharmacists fetched successfully",
      success: true,
      data: pharmacists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying pharmacist account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-patients", authMiddleware, async (req, res) => {
  try {
    const users = await User.find( {$and:[{isAdmin:{ $ne: true }}, {isDoctor:{ $ne: true }}, {isPharmacist:{ $ne: true }}] } );
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting patients",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-doctor-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, {
        status,
      });

      const user = await User.findOne({ _id: doctor.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-doctor-request-changed",
        message: `Your doctor account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Doctor status updated successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

router.post(
  "/change-pharmacist-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { pharmacistId, status } = req.body;
      const pharmacist = await Pharmacist.findByIdAndUpdate(pharmacistId, {
        status,
      });

      const user = await User.findOne({ _id: pharmacist.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-pharmacist-request-changed",
        message: `Your pharmacist account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isPharmacist = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Pharmacist status updated successfully",
        success: true,
        data: pharmacist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error changing status of pharmacist account",
        success: false,
        error,
      });
    }
  }
);

router.post("/get-patient-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.value );
    
   
      res.status(200).send({
        message: "User fetched successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching doctor",
        success: false,
        error,
      });
    }
  });

module.exports = router;
