const router = require('express').Router()
const reservationController = require('./reservation.controller')

router.route('/create').post(reservationController.create)

module.exports = router