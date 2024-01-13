const express = require('express')
const { handleGetAllEvent, createNewEvent, getEventByEventName } = require('../controllers/event')

const router = express.Router()

//all event
router.route('/').get(handleGetAllEvent).post(createNewEvent)

//individual event
router.route('/:eventName').get(getEventByEventName).post(createNewEvent)

module.exports = router