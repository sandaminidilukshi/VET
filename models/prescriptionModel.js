const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema(
    {    
         user: {
         type: String,
         required: true,
        },
        userId:{
          type: String,
          required: false,
         
        },
        doctor: {
          type: String,
          required: [true, "Please enter Doctor Name"], 
        },
              
        animalName: {
          type: String,
          required: [true, "Please enter animal type"],
         
        },
        animalId:{
          type: String,
          required: false,
         
        },
        animaltype: {
          type: String,
          required: [true, "Please enter animal name"],
         
        },
        chiefComplaints: 
          {
            complaint: {
              type: String,
            },
            duration: {
              type: String,
            },
            finding: {
              type: String,
            },
          },
        
        notes: {
          type: String,
        },
        diagnosis: {
          type: String,
        },
        procedureConducted: {
          type: String,
        },
        medicines: [
          {
             
           
            dosage: {
              medicineName: {
                type: String,
              },
              morning: {
                
                  type: String,
                
              },
              afternoon: {
                
                  type: String,
                
              },
              evening: {
                
                  type: String,
                },
              
            duration: {
              type: String,
            }}}],
       
        advices: 
          {
           
              type: String,
          
          },
     
      },
      { timestamps: true }


)


const prescriptionModel = mongoose.model("prescription", prescriptionSchema);
module.exports = prescriptionModel;