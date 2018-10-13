const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const secret = 'harrypotter';


/********(chan)*********middleware for fail message */
router.use((req, res, next) => {
  if (req.query.msg === 'fail') {
    res.locals.msg = 'Username or Password is not matched!';
  } else if (req.query.msg === 'failemail') {
    res.locals.msg = 'this email is already exist!!!';
  } else if (req.query.msg === 'failauthenticate') {
    res.locals.msg = 'could not authenticate user';
  } else if (req.query.msgok === 'welcome') {
    res.locals.msgok = 'your account made successfuly';
  }else if(req.query.msg === 'failauthenticatetoken'){
    res.locals.msg = "no token provided can't access to this page";
  }else if(req.query.msgok === 'successfullupdate'){
    res.locals.msgok = "hghghghy";
  } else {
    res.locals.msgok = '';
    res.locals.msg = '';
  }
  next();
});


/************(Maryam)*************registraition */
router.post('/newUser', function(req, res) {
  User.count({email: req.body.email}, function(err, c) {
    if(c === 0){
      User.count({username: req.body.username}, function(err, c) {
        if(c === 0){
          if((req.body.username.trim() == '')||(req.body.password == '')||(req.body.email == '')||
              (req.body.username == null)||(req.body.password == null)||(req.body.email == null))
              res.redirect('/users/register?msg=fail');//res.json({success: false, err: 'check email username and password'});
          else{
            let myUser = new User();
            myUser.username = req.body.username;
            myUser.email = req.body.email;
            myUser.password = req.body.password;
            User.create(myUser)
                .then(function(dbUser) {
                  res.cookie('username', dbUser.username);
                  res.redirect('/users/login?msg=welcome');
                 }).catch(function(err) {
                  res.redirect('/users/register?msg=fail');//res.json({err: 'can not add to DB'});
                 });
            }
          }else res.redirect('/users/register?msg=failemail');//res.json({err: 'this username is already exist!!!'});
        }).catch(function(err){
          res.redirect('/users/register?msg=fail');//res.json({err: 'there is som isue in database please call to support team'});
      });
    }else res.redirect('/users/register?msg=failemail');//res.json({err: 'this email is already exist!!!'});
  });
});

/**************(Chan)************* GET login page rendering */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/**************(Maryam)*********** GET register page rendering */
router.get('/register', (req, res , next) => {
  res.render('register');
});


/****************(Maryam)*******login */
let validPassword;
router.post('/loginUser', function(req, res) {
  User.findOne({email: req.body.emaillogin}).select('username password email').exec(function(err, user){
    if(err) res.redirect('/users/login?msg=failauthenticate');
    if(!user) res.redirect('/users/login?msg=failauthenticate');//res.json({err : 'could not authenticate username'});
    else{
      const selectedUser = new User(user);
  
      if(req.body.passwordlogin)  validPassword = selectedUser.comparePasword(req.body.passwordlogin);
      else res.redirect('/users/login?msg=fail');//res.json({err : 'No password provided'});
      if(!validPassword) res.redirect('/users/login?msg=failauthenticate');//res.json({err : 'could not authenticate password'});
      else{
        let token = jwt.sign({username: User.username, email: User.email}, secret,{expiresIn: '24h'});
        res.cookie('auth', token);
        res.cookie('seller', selectedUser.username);
        res.redirect(`/inventories/:${selectedUser.username}`);    
      }
    }
  });
});




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

module.exports = router;
