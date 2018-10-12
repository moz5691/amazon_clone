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
      if(err) res.redirect('/users/login?msg=failauthenticatetoken');
      else{
        req.decoded = decoded;
        next();
      }
    })
  }else{
    res.redirect('/users/login?msg=failauthenticatetoken');
  }
});


/********(chan)*********middleware for fail message */
router.use((req, res, next) => {
  if (req.query.inventorymsg === 'removed') {
    res.locals.inventorymsg = 'there is no information about this item please cotact to amazon support service.';
  } else {
    res.locals.inventorymsg = '';
  }
  next();
});


/**************(Maryam)*********** POST inventory page rendering */
router.get('/:user', (req, res, next) => {
    Inventory.find({}).then(inventory => { 
       res.render('inventory', {inventory: inventory});
     });
 });

 /************(maryam)************Post inventoer for update product */
 router.post('/update/:id', (req, res, next) => {
   Inventory.findOne({_id : req.params.id}).then(product => {
    if(!product) res.redirect('/users/inventory?msg=removed');
    else{
      const selectedproduct = new Inventory(product);
      res.render('inventory-edit', selectedproduct);    
      }
    });
  });

  // .findOne({_id: req.params.id}).select('imagePath itemName itemDepartment itemPrice itemDescription itemSeller itemCount itemImgPath').exec(function(err, product){
  //   if(err) res.redirect('/users/inventory?msg=removed');
  //   if(!product) res.redirect('/users/inventory?msg=removed');
  //   else{
  //     const selectedproduct = new User(product);
  //       res.render('inventory-edit', selectedproduct);    
  //   }
  // });
 //});


module.exports = router;