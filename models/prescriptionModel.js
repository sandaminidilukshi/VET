const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema(
    {
        doctor: {
          type: String,
          required: [true, "Please enter Doctor Name"],
        },
        user: {
          type: String,
          required: [true, "Please enter user Number"],
         
        },
        animal: {
          type: String,
          required: [true, "Please enter animal type"],
         
        },
        animal: {
          type: String,
          required: [true, "Please enter animal name"],
         
        },
        chiefComplaints: [
          {
            complaint: {
              type: String,
            },
            duration: {
              type: Number,
            },
            finding: {
              type: String,
            },
          },
        ],
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
            medicineName: {
              type: String,
            },
            type: {
              type: String,
            },
            dosage: {
              morning: {
                quantity: {
                  type: Number,
                },
                remark: {
                  type: String,
                },
              },
              afternoon: {
                quantity: {
                  type: Number,
                },
                remark: {
                  type: String,
                },
              },
              evening: {
                quantity: {
                  type: Number,
                },
                remark: {
                  type: String,
                },
              },
            },
            duration: {
              type: Number,
            },
            total: {
              type: Number,
            },
          },
        ],
        investigations: [
          {
            investigation: {
              type: String,
            },
          },
        ],
        advices: [
          {
            advice: {
              type: String,
            },
          },
        ],
      },
      { timestamps: true }


)


const prescriptionModel = mongoose.model("prescription", prescriptionSchema);
module.exports = prescriptionModel;