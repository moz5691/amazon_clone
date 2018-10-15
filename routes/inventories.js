const express = require('express');
const router = express.Router();
const Inventory = require('./../models/inventory');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
const secret = 'harrypotter';
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
  if (req.query.inventorymsg === 'removed') 
    res.locals.inventorymsg = 'there is no information about this item please cotact to amazon support service.';
  else if (req.query.msgeupdate === 'fail')
    res.locals.msgeupdate = 'could not update this perchase please contact to Amazon support service';
  else if (req.query.msgeupdateok === 'success')
    res.locals.msgeupdateok = 'updated successfully';
  else if (req.query.msgadd === 'fail')
    res.locals.msgadd = 'some input are wrong please fill all place correctly';
  else if (req.query.msgaddok === 'success')
    res.locals.msgadd = 'new product added you can edit it';
  
  else {
    res.locals.msgeupdate = '';
    res.locals.msgeupdateok = '';
    res.locals.inventorymsg = '';
    res.locals.msgadd = '';
    res.locals.msgaddok = '';
  }
  next();
});


/**************(Maryam)*********** POST inventory page rendering */
router.get('/:user', (req, res, next) => {
    Inventory.find({}).then(inventory => { 
       res.render('inventory', {inventory: inventory, reviewer: req.cookies.reviewer});
     });
 });

 /**************(Maryam)*********** POST inventory page rendering */
router.get('/', (req, res, next) => {
  (req.cookies.reviewer)? res.redirect(`/inventories/${req.cookies.reviewer}`):res.render('error',{noRoute: true});
});

 /************(maryam)************Post inventoer for update product */
 router.post('/update/:id', (req, res, next) => {
   Inventory.findOne({_id : req.params.id}).then(product => {
    if(!product) res.redirect('/users/inventory?msg=removed');
    else{
      const selectedproduct = new Inventory(product);
      res.render('inventory-edit', {selectedproduct: selectedproduct, reviewer: req.cookies.reviewer});    
      }
    });
  });

  router.get('/update/:id', (req, res, next) => {

    Inventory.findOne({_id : req.params.id}).then(product => {
     if(!product) res.redirect('/users/inventory?msg=removed');
     else{
       const selectedproduct = new Inventory(product);
       res.render('inventory-edit', {selectedproduct: selectedproduct, reviewer: req.cookies.reviewer });    
       }
     });
   });

  router.put('/update/product/:id', (req, res, next) => {
    Inventory.findOne({_id: req.params.id}).then(product => {
     
        (req.body.itemName)?product.itemName = req.body.itemName:0;
        (req.body.itemDepartment)?product.itemDepartment = req.body.itemDepartment: 0;
        (req.body.itemPrice)?product.itemPrice = req.body.itemPrice: 0;
        (req.body.itemDescription)?product.itemDescription = req.body.itemDescription: 0;
        (req.body.itemSeller)?product.itemSeller = req.body.itemSeller: 0;
        (req.body.itemCount)?product.itemCount = req.body.itemCount:0;
        (req.body.itemImgPath)?product.itemImgPath = req.body.itemImgPath:0;

        Inventory.update({_id: req.params.id}, product, function(err, raw) {
          if (err) {
            res.redirect(`/inventories/update/${req.params.id}?msgeupdate=fail`);
          }
          res.redirect(`/inventories/update/${req.params.id}?msgeupdateok=success`);
        });
    });
  });


  router.post('/add/product', (req, res, next) => {
   
    let product = new Inventory();
      (req.body.newitemName !== '')?product.itemName = req.body.newitemName:console.log('/*/*/*/*/*');//???????????????need address Ming
      (req.body.newitemDepartment !== '')?product.itemDepartment = req.body.newitemDepartment:res.redirect(`/inventory/?msgadd=fail`);
      (req.body.newitemPrice !== '')?product.itemPrice = req.body.inewtemPrice:res.redirect(`/inventory/?msgadd=fail`);
      (req.body.newitemDescription !== '')?product.itemDescription = req.body.newitemDescription:res.redirect(`/inventory/?msgadd=fail`);
      (req.body.newitemSeller !== '')?product.itemSeller = req.body.newitemSeller:res.redirect(`/inventory/?msgadd=fail`);
      (req.body.newitemCount !== '')?product.itemCount = req.body.newitemCount:res.redirect(`/inventory/?msgadd=fail`);
      product.itemImgPath = `/images/${product._id}.png`;
      console.log({k: product});
      Inventory.create(product)
      .then(function (dbInventory) {
        res.redirect(`/inventories/update/${dbInventory._id}?msgaddok=success`);
      })
      .catch(function (err) {
        res.redirect(`/inventory/?msgadd=fail`);//?????????????????????
      });
    
    
  });


  const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
  
  const upload = multer({dest: "../public/images"});
  
  
  router.post('/upload/:id', upload.single("file"),(req, res) => {
    let tempPath;
    (req.file.path)? tempPath = req.file.path: tempPath = '../public/images/default.png';
    let targetPath;
     (req.params.id)?targetPath= path.join(__dirname, `../public/images/${req.params.id}.png`):targetPath= path.join(__dirname, '../public/images/default.png') ;
     Inventory.findOneAndUpdate({_id: req.params.id}, {
      $set: {
        itemImgPath: `/images/${req.params.id}.png`
          }})
    .then(function (selectedproduct) {
      if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(200)
            .contentType("text/plain")
            // .end("File uploaded!");
            .redirect(`/inventories/update/${req.params.id}`);
  
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
    })
    .catch(function(err) {
      res.redirect(`/inventories/update/${req.params.id}?msgeupdate=fail`);
    });
});

    //The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function (req, res) {
  res.render('error',{noRoute: true});//{message: 'what??? do not have such a route', error: {status : 404}}
});


module.exports = router;