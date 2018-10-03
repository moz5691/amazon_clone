# amazon_clone page.

Following is the folder structure.

├── app.js --> start file
├── bin ---> won't use for now.
│ └── www
├── db
│ └── mongoose.js --> db start point
├── models
│ └── inventory.js --> inventory db model
│ └── user.js --> user db model (buyer or seller)
├── package.json
├── public
│ ├── images  
│ ├── javascripts
│ └── stylesheets
│ ''''└── style.css
├── routes
│ ├── index.js
│ └── users.js
└── views
│ └── partial (store partial)
│ ''''└── navbar.hbs
├── error.hbs
├── index.hbs
└── layout.hbs

\*\* in db/mongoose.js, change between mlab and local db.
