const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      start: {
        type: String,
        default: "02 Jan",
        required: true,
      },
      end: {
        type: String,
        default: "03 Jan",
      },
    },
    time: {
      start: {
        type: String,
        required: true,
        default: "5:00 Pm",
      },
      duration: {
        type: String,
        default: "1 hr",
      },
    },
    mentor: {
      name: { type: String, required: true, default: "Nabin Thapa" },
      field: { type: String, required: true, default: "IT - Lead" },
      socialLink: {
        type: String,
        default: "https://linkdein.in/nabin_thapa",
      },
      tags : {
        type : [
          
        ]
      }
    },
    decs: {
      type: String,
      required: true,
      default: "this is the decs",
    },
    image: {
      type: String,
      required: true,
      default: `uploads//images//eventThumbnails//defaultImageForThumbnail Card.png`,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
