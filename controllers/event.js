const Event = require("../models/event");

//get all events
const handleGetAllEvent = async (req, res) => {
  const result = await Event.find({});

  res.json(result);
};

//create new event
const createNewEvent = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.name || !data.time || !data.mentor)
    return res.status(400).json({
      msg: "Insufficent data",
      "field required": "name, date, time and mentro",
      sucess: false,
    });
  try {
    const result = await Event.create(req.body);
    return res.json({ msg: "create new event", sucess: true, res: result });
  } catch (err) {
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

//get event with event name
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
    reslut: result,
  });
};

module.exports = { handleGetAllEvent, createNewEvent, getEventByEventName };
