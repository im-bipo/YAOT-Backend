const fs = require("fs");
const errorHandler = require("../middlewares/errorHandler");
const Event = require("../models/event");

//get all events
const handleGetAllEvent = async (req, res) => {
  const result = await Event.find({});

  res.json(result);
};

//create new event
const createNewEvent = async (req, res, next) => {
  req.body = { ...req.body, reqType: "createNewEvent", image: req.file.path };

  const data = req.body;
  if (!data.name || !data.name || !data.time || !data.mentor) {
    return res.status(400).json({
      msg: "Insufficent data",
      "field required": "name, date, time and mentro",
      sucess: false,
      deleteImage,
    });
  }
  if (!req?.file?.path)
    return res.status(400).json({
      msg: "Invalid File",
      sucess: false,
    });

  try {
    const result = await Event.create(data);

    return res.json({ msg: "create new event", sucess: true, res: result });
  } catch (err) {
    fs.unlink(req.body?.image, (data, err) => {
      if (err) console.log(err);
    });
    next(err);
  }
};

//get event details
const getEventByEventName = async (req, res) => {
  const { eventName } = req.params;
  const result = await Event.find({ name: eventName });
  if (result.length === 0) {
    return res.json({ msg: "Event not found", sucess: false });
  }

  return res.json({
    msg: "Event found",
    sucess: true,
    res: eventName,
    result: result[0],
  });
};

//update event informatio
const updateEventByEventName = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.name || !data.time || !data.mentor)
    return res.status(400).json({
      msg: "Insufficent data",
      "field required": "name, date, time and mentro",
      sucess: false,
    });
  try {
    const { name, date, time, mentor } = req.body;
    const result = await Event.findOneAndUpdate(
      { name: req.params.eventName },
      {
        name: name,
        date: date,
        time: time,
        mentor: mentor,
      },
      { new: true }
    );
    if (!result) {
      return res.json({ msg: "Event not fouund", sucess: false });
    }
    return res.json({ msg: "Event updated", sucess: true, res: result });
  } catch (err) {
    next(err);
    //block user form entering multiple event with same event name
    if (err.code === 11000) {
      return res.status(400).json({
        msg: "duplicate value in unique field",
        sucess: false,
        error: err,
      });
    }
    return res.status(500).json({ msg: "server error", err: err });
  }
};

//delete event
const deleteEventByEventName = async (req, res, next) => {
  try {
    const result = await Event.findOneAndDelete({ name: req.params.eventName });
    if (!result) {
      return res.json({ msg: "Event Not found", sucess: false });
    }
    return res.json({ msg: "Event Deleted", sucess: true, res: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleGetAllEvent,
  createNewEvent,
  getEventByEventName,
  updateEventByEventName,
  deleteEventByEventName,
};
