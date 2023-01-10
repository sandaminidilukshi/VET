const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
 const HelpRequest = require("../models/helpModel")

router.post("/save-help-request", async (req, res) => {
    try {
      const newHelpRequest = new HelpRequest({
        animalTypehelp: req.body.animalTypehelp,
        phone: req.body.phone,
        emailAddress: req.body.emailAddress,
        issue: req.body.issue,
        need: req.body.need,
        
  
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

  module.exports = router;