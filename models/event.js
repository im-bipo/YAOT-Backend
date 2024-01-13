const mongoose = require("mongoose");

// const eventSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     date: {
//       start: {
//         type: String,
//         required: true,
//       },
//       end: {
//         type: String,
//       },
//     },
//     time: {
//       start: {
//         type: String,
//         required: true,
//       },
//       duration: {
//         type: String,
//       },
//     },
//     mentor: {
//       type: [
//         {
//           name: { type: String, required: true },
//           field: { type: String, required: true },
//           socialLink: { type: String },
//         },
//       ],
//     },
//   },
//   { timestamps: true }
// );
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    mentor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
