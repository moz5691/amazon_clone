const express = require('express');
const router = express.Router();
const Inventory = require('./../models/inventory');

// Chan: test middleware works????
router.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is Amazon clone site, welcome!!!' });
});

//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res) {
  res.send('what??? do not have such a route, 404');
});

module.exports = router;
