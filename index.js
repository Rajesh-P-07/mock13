const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { appointmentRouter } = require("./routes/appointment.route");
require("dotenv").config();
const cors=require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/users", userRouter);

app.use("/appointment", appointmentRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("conencted to db");
  } catch (err) {
    console.log(err);
    console.log("cannot connect to db");
  }
  console.log(`server started at port ${process.env.port}`);
});

// {
//   "email":"rajesh@gmail.com",
//   "password":"rajesh@123"
// }





// {
// 	  "name": "Jane Doe",
// 	  "image": "https://example.com/doctor-image.jpg",
// 	  "specialization": "Dermatologist",
// 	  "experience": 10,
// 	  "location": "Los Angeles",
// 		"slots" : 2,
// 	  "fee": 150
// 	}
