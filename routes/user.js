const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');
const chechAuth = require('../middleware/check-auth');

route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

route.post('/signup',function(req,res){
	User.find({email: req.body.email})
	.exec()
	.then(function(user){
		if(user.length >=1)
			res.status(409).json({message: "email already exists"});
		else
			bcrypt.hash(req.body.password, 10, function(err,hash){
				if(err)
					res.json(err);
				else
					var user = new User();
					user.email = req.body.email;
					user.password = hash	

					user.save(function(err){
					if(err)
						res.json(err);
					res.json({message:"User is sucessfully added"});
			});
		});
	})
});



route.post('/login', function(req,res){
	User.find({email: req.body.email})  
	.exec()
	.then(function(user){
		if(user.length <1)
			return res.json({message:"Auth failed"});
		bcrypt.compare(req.body.password, user[0].password, function(err,result){ //user[0]=> since user.find will return array of email
			if(err)
				{return res.status(401).json({message:"Auth failed"});}
			if(result){
				const token = jwt.sign({
					email: user[0].email,
					userId: user[0]._id
				},
				process.env.JWT_KEY,{
					expiresIn: "5h"
				});

				return res.json({message:"Auth sucessful", token:token});
			}
			return res.status(401).json({message:"Auth failed"});
		});
		
	});

});


route.get('/list' , function(req,res){

	User.find({},function(err,user){
		if(err){
			res.json(err);
		}else if(user.length<=0){
			res.json({message:"Users are not inserted"})
			}else{
				res.json(user);
			}
	})
	
});

route.delete('/deleteall', function(req,res){
	User.remove(function(err,user){
		if(err)
			res.json(err);
		res.json({message:"All users are sucessfully deleted"})
				
	})
});







module.exports = route;
