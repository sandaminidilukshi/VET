const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Prescription = require("../models/prescriptionModel")
const authMiddleware = require("../middlewares/authMiddleware");
const Bill = require("../models/billModel");
const User = require("../models/userModel")
const Drug = require("../models/drugModel")

router.post("/calculation", authMiddleware, async (req, res) => {
    try {
    const returnmedi = async (medicines) => { 
  let Total = 0;
    for (let el of req.body.medicines) {
  const details = await Drug.findById(el.medicineName);
    if (details) {
      let drugQuantity = parseInt(el.duration) * (parseInt(el.morning) + parseInt(el.afternoon) + parseInt(el.evening));
      let perOneDrug = details.price * drugQuantity;
      Total = Total + perOneDrug;
      console.log("med1", Total);
    }
  }
  console.log("med", Total);
  return Total;
};

// Then, you can call the function and assign its returned value to the outside Total variable like this:
// let Total = 0;
// returnmedi(req.body.medicines).then((result) => {
//   Total = result;
//   console.log("Total", Total);
// });
    //     let Total = 0;
      
        
    //    const returnmedi = () => { 
    //       let Total = 0; 
    //     ( req.body.medicines.map(async(el) => {
    //     const details = await Drug.findById( el.medicineName );
    //     if(details){
    //         // let Total = 0;
    //         let drugQuantity = parseInt(el.duration)*(parseInt(el.morning) + parseInt(el.afternoon) + parseInt(el.evening))
    //         let perOneDrug = details.price * drugQuantity

    //         Total = Total + perOneDrug
        
    //         console.log("med1",Total)
           
    //     }
      
    // }))
    // console.log("med",Total)
    
    // ;}
    
    //   const medicinePrice = req.body.medicines.map(async (el1) => ({
    //    const details = await Drug.findOne({ _id: el1.medicineName })
    // }))
     
    const Total = await returnmedi();

      const newCalculation = new Bill({
     
        userId:req.body.userId,
        doctorId: req.body.doctorId,
        recordId: req.body.recordId,
        medicines: req.body.medicines,
        medicineFee:Total
        

  
      });
      await newCalculation.save();
        
      res.status(200).send({
        success: true,
        message: "Record created successfully",
        data:newCalculation
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in creating calculation record",
        success: false,
        error,
      });
    }
  });

  // router.post("/get-bill-record-by-bill-id",  async (req, res) => {

  //   try {
  //     const billDetails = await Bill.find(req.body.billId);
  //     res.status(200).send({
  //       success: true,
  //       message: "Bill Data fetched successfully",
  //       data: billDetails,
  //     });
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .send({ message: "Error getting bill info", success: false, error });
  //   }
  // });






module.exports = router;