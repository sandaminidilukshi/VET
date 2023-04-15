const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Prescription = require("../models/prescriptionModel")
const authMiddleware = require("../middlewares/authMiddleware");
const Bill = require("../models/billModel");
const User = require("../models/userModel")
const Drug = require("../models/drugModel")
// router.post("/calculation", authMiddleware, async (req, res) => {
//     try {
    
//         // let Total = 0;
        
//       const medicinePrice =  (req.body.medicines.map(async(el) => {
//         const details = await Drug.findOne({ _id: el.medicineName });
//         if(details){
//             // let Total = 0;
//             // let drugQuantity = el.duration*(el.morning + el.afternoon + el.evening)
//             // let perOneDrug = details.price * drugQuantity
            
//             // Total = Total + perOneDrug
//             // return Total
//         }
      
//     }));

//     //   const medicinePrice = req.body.medicines.map(async (el1) => ({
//     //    const details = await Drug.findOne({ _id: el1.medicineName })
//     // }))
     
//       const newCalculation = new Bill({
     
//         userId:req.body.userId,
//         doctorId: req.body.doctorId,
//         recordId: req.body.recordId,
//         medicines: req.body.medicines,
//         medicineFee:Total
        

  
//       });
//       await newCalculation.save();
        
//       res.status(200).send({
//         success: true,
//         message: "Record created successfully",
//         data:newCalculation.medicationFee
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Error in creating calculation record",
//         success: false,
//         error,
//       });
//     }
//   });








module.exports = router;