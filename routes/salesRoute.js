const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Prescription = require("../models/prescriptionModel")
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const Sale = require("../models/salesModel");

router.post("/save-sales", authMiddleware, async (req, res) => {
    try {
      const newSales = new Sale({
        customername: req.body.customername,
       productname: req.body.productname,
        quantity: req.body.quantity,
        date1: req.body.date1
  
      });
      await newSales.save();  
      res.status(200).send({
        success: true,
        message: "sales added successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in adding sales",
        success: false,
        error,
      });
    }
  });

   router.get("/get-all-sales", async (req, res) => {
    try {
      const sales = await Sale.find();
      res.status(200).send({
        message: "Sales fetched successfully",
        success: true,
        data: sales,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error getting sales",
        success: false,
        error,
      });
    }
  });

  router.post("/edit-sale", authMiddleware, async (req, res) => {
    try {
      
       await Sale.findOneAndUpdate({_id:req.body.salesId},
        {
            customername: req.body.customername,
            productname: req.body.productname,
             quantity: req.body.quantity,
             date1: req.body.date1
        }
        ) ;
        
      res.status(200).send({
        success: true,
        message: "Sales edited successfully",
      
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error editing sales", success: false, error });
    }
  
   
  });

//   router.get("/get-drug-info-by-itemno", async (req, res) => {
//     try {
//       const drugs = await Drug.findOne({_id:req.body.itemno})
      
//       res.status(200).send({
//         message: "Drugs fetched successfully",
//         success: true,
//         data: drugs,
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).send({
//         message: "Error getting drugs",
//         success: false,
//         error,
//       });
//     }
//   });

module.exports = router;