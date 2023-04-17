const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Pharmacist = require("../models/pharmacistModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const moment = require("moment");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.post("/apply-pharmacist-account", authMiddleware, async (req, res) => {
  try {
    const newpharmacist = new Pharmacist({ ...req.body, status: "pending" });
    await newpharmacist.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-pharmacist-request",
      message: `${newpharmacist.firstName} ${newpharmacist.lastName} has applied for a pharmacist account`,
      data: {
        pharmacistId: newpharmacist._id,
        name: newpharmacist.firstName + " " + newpharmacist.lastName,
      },
      onClickPath: "/admin/pharmacistlist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Pharmacist account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying pharmacist account",
      success: false,
      error,
    });
  }
});

router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-approved-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to doctor based on his userid
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

router.post("/check-booking-avilability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0  && appointments[0].status!="Cancelled") {      //isCancelled = false
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});
router.post("/get-booking-avilability-by-date", async (req, res) => {
  try {
    
    const doctorId = req.body.doctorId;
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const appointments = await Appointment.find({
      doctorId,
      date
    
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Booked appointments",
        success: true,
        data:appointments
      });
    } else { 
      if (appointments.length === 0) {
      return res.status(200).send({
        message: "Appointments not booked",
        success: true,
        data:appointments
      });
    }}
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting appointement information",
      success: false,
      error,
    });
  }
});


router.post("/show-appointment-by-time", async (req, res) => {
  try {
    
    const doctorId = req.body.doctorId;
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Booked appointments",
        success: true,
        data:appointments
      });
    } else { 
      if (appointments.length === 0) {
      return res.status(200).send({
        message: "Appointments not booked",
        success: true,
        data:appointments
      });
    }}
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting appointement information",
      success: false,
      error,
    });
  }
});

// router.post("/get-booking-avilability-by-doctor-id", async (req, res) => {
//   try {
    
//     const doctorInfo.userId = req.body.userId;
//     const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
//     const appointments = await Appointment.find({
//      doctorInfo{userId},
//       date
    
//     });
//     if (appointments.length > 0) {
//       return res.status(200).send({
//         message: "Booked appointments",
//         success: true,
//         data:appointments
//       });
//     } else { 
//       if (appointments.length === 0) {
//       return res.status(200).send({
//         message: "Appointments not booked",
//         success: true,
//         data:appointments
//       });
//     }}
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error getting appointement information",
//       success: false,
//       error,
//     });
//   }
// });
// router.post("/get-appointments-sheduled-for-the-date",  async (req, res) => {
//   try {
//     const date ="2023-03-07T18:30:00.000Z"
//     //moment(req.body.date, "DD-MM-YYYY").toISOString();
//     const doctorId = "6390101a0ffe482b78ce8625"
//     //req.body.doctorId;
//     const appointments = await Appointment.find( {$and:[{doctorId:doctorId}, 
//       {date:date}] } );
    
    
//     //find({
//     //   doctorId,
//     //   date,
//     //   time: { $gte: fromTime, $lte: toTime },
//     // });
//     if (appointments.length > 0 ) {     
//       return res.status(200).send({
//         message: "Available appointments for the day",
//         success: false,
//       });
//     } else {
//       return res.status(200).send({
//         message: "Appointments not booked",
//         success: true,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error getting appointments",
//       success: false,
//       error,
//     });
//   }
// });


// router.post("/get-appointments-sheduled-for-the-date",  async (req, res) => {
//   try {
//     var START_TIME = toISOString( moment().toDate())
// var END_TIME = toISOString(moment().startOf('day').toString())
    
  
//     const doctorId = req.body.doctorId;
//     //const date = moment().toISOString();
//     const appointments = await Appointment.$match( { 
//       dt: { $gte: START_TIME, $lt: END_TIME}
// });
//     if (appointments.length > 0) {
//       return res.status(200).send({
//         message: "Booked Appointments For the Day",
//         success: true,
//         data:appointments
//       });
//     } else { 
//       if (appointments.length === 0) {
//       return res.status(200).send({
//         message: "Appointments not booked for the day",
//         success: true,
//         data:appointments
//       });
//     }}
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error getting appointement information",
//       success: false,
//       error,
//     });
//   }
// });

router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});
router.get("/get-all-appointments",  async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});

router.post("/change-appointment-status-by-user-role", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    

    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
});


router.get('/chart-by-appointments-for-the-month', async (req, res) => {
  try {
    const monthlyAppointments = await Appointment.aggregate([
      {
        $match: {
          status: "approved", // or whichever status you want to count
        },
      },
      {
        $group: {
          _id: {
            year: { $year: { $toDate: "$date" } },
            month: { $month: { $toDate: "$date" } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    res.json(monthlyAppointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/get-number-of-users', async (req, res) => {
  try {
    const users = await User.aggregate([
      
        {
            $group: {
                _id: null,
                numUsers: { $sum: 1 },
            },
        },
    ]);
    res.json(users);
  }catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error changing appointment status",
        success: false,
        error,
      });
    }})

router.get('/get-number-of-doctors', async (req, res) => {
      try {
        const doctors = await Doctor.aggregate([
          
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);
        res.json(doctors);
      }catch (error) {
          console.log(error);
          res.status(500).send({
            message: "Error changing appointment status",
            success: false,
            error,
          });
        }})

        router.get("/appointments-by-doctor", async (req, res) => {
          const appointmentsByDoctor = await Appointment.aggregate([
            { $match: { status: "approved" } }, // Filter by status if required
            { $group: { _id: "$doctorId", count: { $sum: 1 } } },
            { $lookup: { from: "doctors", localField: "_id", foreignField: "_id", as: "doctor" } },
            { $unwind: "$doctor" },
            { $project: { doctorName: { $concat: ["$doctor.firstName", " ", "$doctor.lastName"] }, count: 1 } }
          ]);
          res.json(appointmentsByDoctor);
        });


        router.get('/revisiting-percentage', async (req, res) => {
          try {
            // Group appointments by user ID to count how many times each user has visited the hospital
            const revisitingUsers = await Appointment.aggregate([
              { $group: { _id: "$userId", count: { $sum: 1 } } },
              { $match: { count: { $gt: 1 } } },
              { $group: { _id: null, revisitingCount: { $sum: 1 } } }
            ]);
        
            // Calculate the percentage of users who have visited the hospital more than once
            const totalUsers = await Appointment.distinct('userId').count();
            const revisitingPercentage = (revisitingUsers[0].revisitingCount / totalUsers) * 100;
        
            // Return the percentage as a response
            res.json({ revisitingPercentage });
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
          }
        });
module.exports = router;//