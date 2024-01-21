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
  .get(restrictTo(['Admin']) ,handleGetAllEvent)
  .post(uploadEventThumbnail.single("thumbnailImage"), createNewEvent);

//individual event
router
  .route("/:eventName")
  .get(getEventByEventName)
  .patch(updateEventByEventName)
  .delete(deleteEventByEventName);



module.exports = router;
