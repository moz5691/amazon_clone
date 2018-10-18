const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect(
    'mongodb://amazon-2:amazon-2@ds131763.mlab.com:31763/amazon-2'
    //  'mongodb://amazon:amazon123@ds121183.mlab.com:21183/amazon'
    // {useNewUrlParser: true}
    //  'mongodb://localhost/amazon1'
  )
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

module.exports = { mongoose };
