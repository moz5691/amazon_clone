const express = require('express');
const router = express.Router();
const Inventory = require('./../models/inventory');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
const secret = 'harrypotter';

/********(chan + thank you so much)*********middleware for override put and delete */
router.use(methodOverride('_method'));

/***************check token after router redirect */
router.use(function(req, res, next){
  let token = req.headers.authorization || req.cookies.auth || req.body.token || req.body.query || req.headers['x-access-token'];
  if(token){
   jwt.verify(token, secret, function(err, decoded){
      if(err) res.json({err:'token invalid'});
      else{
        req.decoded = decoded;
        next();
      }
    })
  }else{
    res.json({err:"no token provided cann't access to this page" });
  }
});


/**************(Maryam)*********** POST inventory page rendering */
router.get('/:user', (req, res, next) => {
    Inventory.find({}).then(inventory => { 
      console.log(inventory.length + '///////////////////////' + req.params.user);
      console.log(inventory);
       res.render('inventory', {inventory: inventory});
     });
 });

module.exports = router;