const express = require("express");

const multer = require('multer')

const storage = multer.diskStorage({
  destination : (req,file,cb)=>{
   return cb(null,'./uploads/images/eventThumbnails')
  },
  filename : (req,file,cb)=>{
    fName = Date.now()+file.originalname
    return cb(null,fName)
  }
})

const upload = multer({storage})



const {
  handleGetAllEvent,
  createNewEvent,
  getEventByEventName,
  updateEventByEventName,
  deleteEventByEventName,
} = require("../controllers/event");

const app = express();
const router = express.Router();

//all event
router.route("/").get(handleGetAllEvent).post(upload.single('thumbnailImage'),createNewEvent);

//individual event
router
  .route("/:eventName")
  .get(getEventByEventName)
  .patch(updateEventByEventName)
  .delete(deleteEventByEventName);


module.exports = router;
