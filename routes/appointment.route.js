const express = require("express");
const { AppointmentModel } = require("../model/appointment.model");
const { authentication } = require("../middlewares/auth.middleware");
const { default: mongoose } = require("mongoose");

const appointmentRouter = express.Router();
appointmentRouter.use(authentication);

appointmentRouter.post("/", async (req, res) => {
  const payload = req.body;
  payload.date = Date();

  try {
    let appointment = AppointmentModel(payload);

    await appointment.save();
    res.send("saved successfully");
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

appointmentRouter.get("/get", async (req, res) => {
  console.log(req.query);
  const q = req.query.q;
  if (q) {
    let data = await AppointmentModel.find({ specialization: q });
    console.log(data);
    res.send(data);
  } else {
    let data = await AppointmentModel.find();
    console.log(data);
    res.send(data);
  }
});

// appointmentRouter.patch("/book/:id", async (req, res) => {
//   const id = req.params;
//   const s = req.body.slots;
//   console.log(id);
//   console.log(s);
//   await AppointmentModel.findByIdAndUpdate(id, { $set: { slots: s }});
//   res.send("success");
// });

module.exports = { appointmentRouter };
