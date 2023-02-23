const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Prescription = require("../models/prescriptionModel")
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const Receive = require("../models/receivingModel");

router.post("/save-receiving", async (req, res) => {
    try {
      const newReceive = new Receive({
        supplier: req.body.supplier,
       productname: req.body.productname,
        quantity: req.body.quantity,
        price: req.body.price
  
      });
      await newReceive.save();  
      res.status(200).send({
        success: true,
        message: "Receiving added successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in adding receiving",
        success: false,
        error,
      });
    }
  });

   router.get("/get-all-receives", async (req, res) => {
    try {
      const receive = await Receive.find();
      res.status(200).send({
        message: "Receivings fetched successfully",
        success: true,
        data: receive,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error getting receives",
        success: false,
        error,
      });
    }
  });

  router.post("/edit-receive", authMiddleware, async (req, res) => {
    try {
      
       await Receive.findOneAndUpdate({_id:req.body.receiveId},
        {
            supplier: req.body.supplier,
            productname: req.body.productname,
             quantity: req.body.quantity,
             price: req.body.price
        }
        ) ;
        
      res.status(200).send({
        success: true,
        message: "Receiving edited successfully",
      
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error editing receiving", success: false, error });
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