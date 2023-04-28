// import modules
const express = require("express")
const mongoose = require("mongoose")
const { json, urlencoded } = express
const cors = require("cors")
const bodyParser = require('body-parser');



// require
require("./models/UserSchema")
require("dotenv").config();

// app
const app = express()
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors())
app.set("view engine", "ejs")
app.use(bodyParser.json());

// db
const db = require("./Database/db");

// import routes
const UserRoute = require('./routes/UserRoute');
const ProductRoute = require('./routes/ProductRoute');
const CategoryRoute = require('./routes/CategoryRoute');
const CartRoute = require('./routes/CartRoute');

// user routes
app.use('/', UserRoute);
app.use('/products', ProductRoute);
app.use('/category', CategoryRoute);
app.use('/cart', CartRoute);

// port
const port = process.env.PORT || 8080

// listener
app.listen(port, () => { console.log("Server started!") })