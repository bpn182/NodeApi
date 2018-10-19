const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const chechAuth = require('../middleware/check-auth');

route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

route.get('/', chechAuth, function(req,res,next){
	res.json({

		message: 'handling GET request to products'	
	});
});

route.get('/get', chechAuth, function(req,res,next){
	res.json({

		message: 'handling GET request to products'	
	});
});

route.post('/',function(req,res,next){
	const products={
		name: req.body.name,
		price: req.body.price
	};
	res.json({
		message: 'handling GET request to /products',
		order:products		
	});
});

route.get('/:productsID',function(req,res){
	const id = req.params.productsID;
	res.json(id);
})



module.exports = route;