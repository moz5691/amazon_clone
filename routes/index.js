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

// get inentory and display all
router.get('/inventory', (req, res, next) => {
  Inventory.find({}).then(inventory => {
    res.render('index', { inventory: inventory });
  });
});

// get login page************************Maryam
router.get('/login', function(req, res, next) {
  res.render('login');
});

///////////////purchase page:  Ming////////////////////
/*router.get('/purchase', function(req, res) {
  res.render('purchase');
});*/


router.get('/purchase/:id',function(req,res){
  console.log('GET function');
  console.log(req.params.id);
  Inventory.findOne({_id: req.params.id}).then(product => {
    res.render('purchase', { product: product });
    //window.location='/purchase';
  }).catch(
    function(err){
      res.json(err);
    }
  );
  //res.send('purchase');
});
//////////////////////////////////////////////////////


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

//-----search by itemName-----Tri-------//
router.post('/inventory/search', function(req, res, next){
  const searchQuery = req.body.searchQuery;
  // const searchQuery = 'Simpsons';
  Inventory.find({ itemName: searchQuery }, function (err, inventory) {
    if (err) {
      return res.status(200).send(err);
    }
    else {
      // res.json(inventory);
      res.render('index', {inventory: inventory});
    }
  });
});

//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res) {
  res.send('what??? do not have such a route, 404');
});

module.exports = router;
