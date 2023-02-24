const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Prescription = require("../models/prescriptionModel")
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const Supplier = require("../models/supplierModel");

router.post("/save-supplier", authMiddleware, async (req, res) => {
    try {
      const newSupplier = new Supplier({
        supplier: req.body.supplier,
       contact: req.body.contact,
        address: req.body.address,
       
      });
      await newSupplier.save();  
      res.status(200).send({
        success: true,
        message: "Supplier added successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in adding supplier",
        success: false,
        error,
      });
    }
  });

   router.get("/get-all-suppliers", async (req, res) => {
    try {
      const supplier = await Supplier.find();
      res.status(200).send({
        message: "Suppliers fetched successfully",
        success: true,
        data: supplier,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error getting suppliers",
        success: false,
        error,
      });
    }
  });

  router.post("/edit-supplier", authMiddleware, async (req, res) => {
    try {
      
       await Supplier.findOneAndUpdate({_id:req.body.supplierId},
        {
            supplier: req.body.supplier,
            contact: req.body.contact,
             address: req.body.address,
           
        }
        ) ;
        
      res.status(200).send({
        success: true,
        message: "Supplier edited successfully",
      
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error editing supplier", success: false, error });
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