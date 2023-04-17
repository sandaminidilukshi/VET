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


     
    const Total = await returnmedi();

      const newCalculation = new Bill({
     
        userId:req.body.userId,
        doctorId: req.body.doctorId,
        recordId: req.body.recordId,
        medicines: req.body.medicines,
        medicineFee:Total,
        medicationFee:req.body.medicationFee,
        total:req.body.total


  
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

  router.post("/add-new-payment-values", authMiddleware, async (req, res) => {
   
    try {
      
   const bill =   await Bill.findOneAndUpdate({_id:req.body.billId},
       {
        medicationFee:req.body.medicationFee,
        total: req.body.total,
         
       }
       ) ;
       
     res.status(200).send({
       success: true,
       message: "Bill Updated successfully",
       data:bill
     });
   } catch (error) {
     res
       .status(500)
       .send({ message: "Error updating bill", success: false, error });
   }
 
  
 });

//  router.get('/income-by-month', async (req, res) => {
//   try {
//     const incomePermonth = await Bill.aggregate([
      
//         {
//           $group: {
//               _id: {
//                 year: { $year: { $toDate: "$updatedAt" } },
//                 month: { $month: { $toDate: "$updatedAt" } },
//               },
//               numOrders: { $sum: 1 },
//               count: { $sum: "$total" },
//           }
//       },
//       {
//         $sort: { "_id.year": 1, "_id.month": 1 },
//       },
//     ]);
//     res.json(incomePermonth);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server error" });
//   }
// });


router.get('/income-by-month', async (req, res) => {
  try {
    const incomePermonth = await Bill.aggregate([
      
        {
          $group: {
              _id: {
                year: { $year: { $toDate: "$updatedAt" } },
                month: { $month: { $toDate: "$updatedAt" } },
              },
              numOrders: { $sum: 1 },
              count: { $sum: "$total" },
          }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    res.json(incomePermonth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});


router.get('/income-by-month-for-card', async (req, res) => {
  try {
    const incomePermonth = await Bill.aggregate([
      
        {
          $group: {
              _id: {
                year: { $year: new Date() },
                month: { $month: new Date() },
              },
              numOrders: { $sum: 1 },
              count: { $sum: "$total" },
          }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    res.json(incomePermonth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/get-all-bills", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).send({
      message: "Bills fetched successfully",
      success: true,
      data: bills,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting bills",
      success: false,
      error,
    });
  }
});


module.exports = router;