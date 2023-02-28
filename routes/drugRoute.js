const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Prescription = require("../models/prescriptionModel")
const authMiddleware = require("../middlewares/authMiddleware");

const Drug = require("../models/drugModel");

router.post("/save-drug",  async (req, res) => {
    try {
      const newDrug = new Drug({
       productname: req.body.productname,
        itemno: req.body.itemno,
        manufacturer: req.body.manufacturer,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        expiry: req.body.expiry
  
      });
      await newDrug.save();  
      res.status(200).send({
        success: true,
        message: "Drug added successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in adding drug",
        success: false,
        error,
      });
    }
  });

   router.get("/get-all-drugs", async (req, res) => {
    try {
      const drugs = await Drug.find();
      res.status(200).send({
        message: "Drugs fetched successfully",
        success: true,
        data: drugs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error getting drugs",
        success: false,
        error,
      });
    }
  });

  router.post("/edit-drug", authMiddleware, async (req, res) => {
    try {
      
       await Drug.findOneAndUpdate({_id:req.body.drugId},
        {
          productname:req.body.productname,
          itemno: req.body.itemno,
          manufacturer:  req.body.manufacturer,
          category:req.body.category,
          price:req.body.price,
          quantity:req.body.quantity,
          expiry:req.body.expiry
        }
        ) ;
        
      res.status(200).send({
        success: true,
        message: "Drug edited successfully",
      
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error editing drug", success: false, error });
    }
  
   
  });

  // router.get("/get-drug-info-by-itemno", async (req, res) => {
  //   try {
  //     const drugs = await Drug.findOne({_id:req.body.itemno})
      
  //     res.status(200).send({
  //       message: "Drugs fetched successfully",
  //       success: true,
  //       data: drugs,
  //     });
  //   } catch (error) {
  //     console.log(error);

  //     res.status(500).send({
  //       message: "Error getting drugs",
  //       success: false,
  //       error,
  //     });
  //   }
  // });

module.exports = router;