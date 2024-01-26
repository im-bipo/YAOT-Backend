const express = require("express");
const uploadEventThumbnail = require("../middlewares/eventThubnail");

const {
  handleGetAllEvent,
  createNewEvent,
  getEventByEventName,
  updateEventByEventName,
  deleteEventByEventName,
} = require("../controllers/event");
const { restrictTo } = require("../middlewares/auth");

const app = express();
const router = express.Router();

//all event
router
  .route("/")
  .get(handleGetAllEvent)
  .post(uploadEventThumbnail.single("thumbnailImage"),restrictTo(['Admin']), createNewEvent);

//individual event
router
  .route("/:eventName")
  .get(restrictTo(['Admin','user']),getEventByEventName)
  .patch(restrictTo(['Admin']),updateEventByEventName)
  .delete(restrictTo(['Admin']),deleteEventByEventName);



module.exports = router;
