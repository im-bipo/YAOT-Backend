const Event = require("../models/event");

//get all events
const handleGetAllEvent = async (req, res) => {
  const result = await Event.find({});

  res.json(result);
};

//create new event
const createNewEvent = async (req, res) => {
  try {
    const result = await Event.create(req.body);
    return res.json({ msg: "create new event", res: result });
  } catch (error) {
    //block user form entering multiple event with same event name
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          msg: "error occure",
          errorCode: error.code,
          errorName: error.name,
          reason: "duplicate value if unique field",
          solution: "Try using another title",
        });
    }
    return res.status(500).json({ msg: "server error" });
  }
};

//get event with event name
const getEventByEventName = async (req,res) =>{
  const {eventName} = req.params
  const result = await Event.find({name : eventName})
  if(result.length === 0){
    return res.json({msg: 'user not found', sucess : false})
  }

  return res.json({msg: 'user found',sucess : true ,res : eventName ,reslut : result})
}

module.exports = { handleGetAllEvent, createNewEvent,getEventByEventName };
