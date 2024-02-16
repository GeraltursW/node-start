const express = require('express')
const tourRouter = require('./../controllers/tourController')

//route 
const router = express.Router()


router.param('id', tourRouter.checkId)


//封装route

router.route('/').get(tourRouter.getAllTours).post(tourRouter.checkBody, tourRouter.createTour)

router.route('/:id').get(tourRouter.getTour).patch(tourRouter.updateTour)

module.exports = router