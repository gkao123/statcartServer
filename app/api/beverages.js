//app/api/beverages.js
var express = require('express');
var router = express.Router();
var db = require('./productDB.js')

router.get('/', (req,res, next) =>{
	//console.log(req.query.item_name);
  db.collection('beverages').find({item_name: req.query.item_name}).toArray(function(err, result) {
		if (err) {
			console.log('error');
				res.send({"result": "error"});
		}
		else {
			console.log(result)
		  res.send(result);// The result should be a JSON object that you can access with result.field (example)
		}
	});
})



module.exports= router;
