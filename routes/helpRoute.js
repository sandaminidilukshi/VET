const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const HelpRequest = require("../models/helpModel");

router.post("/save-help-request", async (req, res) => {
  try {
    const newHelpRequest = new HelpRequest({
      userId: req.body.userId,
      animalTypeHelp: req.body.animalTypeHelp,
      phone: req.body.phone,
      issue: req.body.issue,
      need: req.body.need,
      reply:req.body.reply
    });
    await newHelpRequest.save();
    res.status(200).send({
      success: true,
      message: "Help request sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in requesting help",
      success: false,
      error,
    });
  }
});

router.get("/get-all-help-requests", async (req, res) => {
  try {
    const help = await HelpRequest.find();
    res.status(200).send({
      message: "Help requests fetched successfully",
      success: true,
      data: help,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting help requests",
      success: false,
      error,
    });
  }
});

router.get("/get-help-requests-by-user", async (req, res) => {
  try {
    const helpView = await HelpRequest.find({userId:req.body.userId});
    res.status(200).send({
      message: "Help requests fetched successfully",
      success: true,
      data: helpView,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting help requests",
      success: false,
      error,
    });
  }
});

router.post("/update-reply", authMiddleware, async (req, res) => {
  try {
    
     await HelpRequest.findOneAndUpdate({_id:req.body.helpReqId},
      {
        doctorId: req.body.doctorId,
        reply: req.body.reply
      }
      ) ;
      
    res.status(200).send({
      success: true,
      message: "Reply added successfully",
    
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting reply", success: false, error });
  }

  // const helpReq = await HelpRequest.findById(req.body.helpReqId);
  //  if (helpReq){
  //       helpReq.phone = req.body.phone;
  //       await helpReq.save();
  //       res.status(200).send({
  //             success: true,
  //             message: "Reply updated successfully",
  //             data: helpReq,
  //           });
  //  }
});

module.exports = router;
