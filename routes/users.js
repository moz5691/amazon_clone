const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Inventory = require('./../models/inventory');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = 'harrypotter';


router.use(function(req, res, next){
  let token = req.body.token || req.body.query || req.headers['x-access-token'];
  if(token){
   jwt.verify(token, secret, function(err, decoded){
      if(err) res.json({err:'token invalid'});
      else{
        req.decoded = decoded;
        next();
      }
    })
  }else{
    if((req.originalUrl === '/users/newUser')||(req.originalUrl === '/users/loginUser')) {
      next();
    }
    else
    res.json({err:"no token provided cann't access to this page" });
  }
});

/*******************************************************registraition************************************* */
router.post('/newUser', function(req, res) {
  User.count({email: req.body.email}, function(err, c) {
    if(c === 0){
      User.count({username: req.body.username}, function(err, c) {
        if(c === 0){
          if((req.body.username.trim() == '')||(req.body.password == '')||(req.body.email == '')||
              (req.body.username == null)||(req.body.password == null)||(req.body.email == null))
                  res.json({success: false, message: 'check email username and password'});
          else{
            let myUser = new User();
            myUser.username = req.body.username;
            myUser.email = req.body.email;
            myUser.password = req.body.password;
            User.create(myUser)
                .then(function(dbUser) {
                  res.json({success: 'success', user: dbUser});
                 }).catch(function(err) {
                   console.log(err);
                      res.json({err: 'can not add to DB'});
                 });
            }
          }else res.json({err: 'this username is already exist!!!'});
        }).catch(function(err){
            res.json({err: 'there is som isue in database please call to support team'});
      });
    }else res.json({err: 'this email is already exist!!!'});
  });
});


/*******************************************************login************************************* */
let validPassword;
router.post('/loginUser', function(req, res) {
  User.findOne({email: req.body.emaillogin}).select('username password email').exec(function(err, user){
    if(err) throw err;
    console.log(user);
    if(!user) res.json({err : 'could not authenticate username'});
    else{
      const selectedUser = new User(user);
  
      if(req.body.passwordlogin)  validPassword = selectedUser.comparePasword(req.body.passwordlogin);
      else res.json({err : 'No password provided'});
      if(!validPassword) res.json({err : 'could not authenticate password'});
      else{
        let token = jwt.sign({username: User.username, email: User.email}, secret,{expiresIn: '24h'});
      
      res.json({token: token, user: user});        
        // res.json({token: token});
        // console.log(__dirname + '*******' + selectedUser.password + '--------'+selectedUser.email);
        //  Inventory.find({/*itemSeller: req.body._id*/}).then(inventory => {
        //   res.render('index', { inventory: inventory });
        // });
      }
    }
  });
});


router.post('/inventory/:user', (req, res, next) => {
  // res.redirect(`/users/inventory/${user.username}`);???????????????????????
  // Inventory.find({}).then(inventory => {
  //   res.redirect(`/users/inventory/${req.body.username}`);
  // });
});

router.get('/inventory/:user', (req, res, next) => {
  Inventory.find({}).then(inventory => {
    res.render('inventory', { inventory: inventory });
  });
});


// update inventory count
router.put('/inventory/:id', (req, res, next) => {
  Inventory.findOne({
    _id: req.params.id
  }).then(inventory => {
    inventory.itemCount = req.body.itemCount;
    inventory.save().then(inventory => {
      res.json(inventory);
    });
  });
});
// post inventory
router.post('/inventory', (req, res) => {
  const newInventory = {
    itemName: req.body.itemName,
    itemDepartment: req.body.itemDepartment,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription,
    itemSeller: req.body.itemSeller,
    itemCount: req.body.itemCount,
    itemImgPath: req.body.itemImgPath
  };
  new Inventory(newInventory)
    .save()
    .then(inventory => res.redirect('/inventory'));
});

router.delete('/inventory/:id', (req, res) => {
  Inventory.remove({ _id: req.params.id }).then(() => {
    res.redirect('/inventory');
  });
});

// The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res) {
  res.send('what??? do not have such a route, 404');
});



module.exports = router;

