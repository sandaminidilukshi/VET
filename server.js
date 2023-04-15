const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const prescriptionRoute = require("./routes/prescriptionRoute");
const animalRoute = require("./routes/animalRoute");
const helpRoute = require ("./routes/helpRoute");
const pharmacistRoute = require ("./routes/pharmacistRoute");
const drugRoute = require  ("./routes/drugRoute");
const salesRoute = require  ("./routes/salesRoute");
const receivingRoute = require  ("./routes/receivingRoute");
const supplierRoute = require  ("./routes/supplierRoute");
const billRoute = require("./routes/billRoute")
const path = require("path");

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/prescription", prescriptionRoute);
app.use("/api/animal", animalRoute);
app.use("/api/help", helpRoute);
app.use("/api/pharmacist", pharmacistRoute)
app.use("/api/drugs", drugRoute)
app.use("/api/sales", salesRoute)
app.use("/api/receive", receivingRoute)
app.use("/api/supplier", supplierRoute)
app.use("/api/bill", billRoute)
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
