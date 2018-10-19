const express = require('express');
const app = express();
const PORT= process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bpndb');


const products = require('./routes/products');
const user = require('./routes/user');

app.use('/products',products);
app.use('/user',user);


app.listen(PORT);
console.log("Listening on localhost://"+PORT);
