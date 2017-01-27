const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/', function(req, res, next) {
  var hotelPromise = db.Hotel.findAll();
  var restaurantPromise = db.Restaurant.findAll();
  var activityPromise = db.Activity.findAll();

  Promise.all([hotelPromise, restaurantPromise, activityPromise])
    .then(([hotels, restaurants, activities]) => {
      res.render('index', {hotels, restaurants, activities})
    })
    .catch(next)

})


module.exports = router
