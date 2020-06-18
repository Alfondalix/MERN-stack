const express = require('express')
const multer = require('multer')
const verifyToken = require('./config/verifyToken')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const uploadConfig = require('./config/upload')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/status', (req, res) => {
  res.send({ status: 200 })
})

// LoginController
routes.post('/login', LoginController.store)

//registration
routes.post(
  '/registration/:eventId',
  verifyToken,
  RegistrationController.create
)
routes.get(
  '/registration',
  verifyToken,
  RegistrationController.getMyRegistrations
)
routes.get(
  '/registration/:registration_id',
  RegistrationController.getRegistration
)
// ApprovalController
routes.post(
  '/registration/registration_id/approvals',
  verifyToken,
  ApprovalController.approval
)
// RejectionController
routes.post(
  '/registration/registration_id/rejections',
  verifyToken,
  RejectionController.rejection
)

// Dashboard
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/user/events', verifyToken, DashboardController.getEventByUserId)
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById)

// Events
routes.post(
  '/event',
  verifyToken,
  upload.single('thumbnail'),
  EventController.createEvent
)
routes.delete('/events/:eventId', verifyToken, EventController.delete)

// User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes
