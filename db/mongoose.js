const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect(
    'mongodb://amazon-2:amazon-2@ds131763.mlab.com:31763/amazon-2',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

module.exports = { mongoose };
