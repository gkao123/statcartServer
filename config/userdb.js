var mongoose = require('mongoose')
var db

function connect(){
  mongoose.connect('mongodb://statcart:statcart@ds149437.mlab.com:49437/statcart', function(){
    console.log('mongodb connected')
  })
  db = mongoose.connection
  console.log('db returned')
  return db
}

module.exports = {
  'url': 'mongodb://statcart:statcart@ds149437.mlab.com:49437/statcart'
}
