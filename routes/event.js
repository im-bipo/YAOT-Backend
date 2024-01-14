const express = require('express')
const { handleGetAllEvent, createNewEvent, getEventByEventName, updateEventByEventName,deleteEventByEventName } = require('../controllers/event')

const router = express.Router()

//all event
router.route('/').get(handleGetAllEvent).post(createNewEvent)

//individual event
router.route('/:eventName').get(getEventByEventName).patch(updateEventByEventName).delete(deleteEventByEventName)

module.exports = router