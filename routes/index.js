const express = require('express');
const router = express.Router();
const Inventory = require('./../models/inventory');

// Chan: test middleware works????
router.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'This is Amazon clone site, welcome!!!' });
});

// get inentory and display all
router.get('/inventory', (req, res, next) => {
  Inventory.find({}).then(inventory => {
    res.render('index', { inventory: inventory });
  });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

/* Log out page, redirect to login page, clear cookie */
router.get('/logout', (req, res, next) => {
  res.clearCookie('auth');
  res.clearCookie('seller');
  res.redirect('login');
});

router.get('/purchase/:id', function (req, res) {
  console.log('GET function');
  console.log(req.params.id);
  Inventory.findOne({ _id: req.params.id })
    .then(product => {
      res.render('purchase', { product: product });
      //window.location='/purchase';
    })
    .catch(function (err) {
      res.json(err);
    });
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
router.post('/inventory/search', function (req, res, next) {
  const searchQuery = req.body.searchQuery;
  // const searchQuery = 'Simpsons';
  Inventory.find({ itemName: searchQuery }, function (err, inventory) {
    if (err) {
      return res.status(200).send(err);
    } else {
      // res.json(inventory);
      res.render('index', { inventory: inventory });
    }
  });
});

/* [pending] */
//-----pagination feature----Tri-----//
router.get('/inventory/:page', function (req, res, next) {
  const perPage = 10;
  const page = req.params.page || 1;

  Inventory.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, products) {
      Inventory.count().exec(function (err, count) {
        if (err) {
          return err;
        } else {
          const pages = Math.ceil(count / perPage);
          if (pages > 0) {
            res.render('index', {
              inventory: products,
              current: page,
              pages: Math.ceil(count / perPage)
            });
          } else {
            res.render('index', {
              inventory: products,
              current: page
            });
          }
        }
      });
    });
});

// -----search by department----//
router.post('/inventory/search/department/', function (req, res) {
  Inventory
    .find({ itemDepartment: req.body.departmentSelect })
    .then(function (data) {
      res.render('index', { inventory: data });
    });
});

module.exports = router;
