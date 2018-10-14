const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect(
     // 'mongodb://amazon:amazon123@ds121183.mlab.com:21183/amazon',
     // {useNewUrlParser: true}
     'mongodb://localhost/amazon1'
  )
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

module.exports = { mongoose };
