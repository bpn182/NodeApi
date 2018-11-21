const express = require('express');
const app = express();
const PORT= process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bpndb');


const products = require('./routes/products');
const user = require('./routes/user');

app.use('/products',products);
app.use('/user',user);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});



app.listen(PORT);
console.log("Listening on localhost://"+PORT);
