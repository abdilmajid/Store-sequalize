const express = require('express');
// const models = require('./models');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan');
const pg = require('pg');
const pr = require('./product_Info');
const Sequelize = require('sequelize');


const app = express()


app.use(express.static('public'));

//Allows you to set eviroment variable
require('dotenv').config()

// Morgan logs server requests in the terminal
app.use(morgan('short'))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


//importing routes from different file
const router = require('./routes/user.js')
app.use(router)


// pr.product1.save().then(task => {
//   console.log(task)
// })
// pr.product2.save().then(task => {
//   console.log(task)
// })
// pr.product3.save().then(task => {
//   console.log(task)
// })
// pr.product4.save().then(task => {
//   console.log(task)
// })
// pr.product5.save().then(task => {
//   console.log(task)
// })
// pr.product6.save().then(task => {
//   console.log(task)
// })
// pr.product7.save().then(task => {
//   console.log(task)
// })
// pr.product8.save().then(task => {
//   console.log(task)
// })
// pr.product9.save().then(task => {
//   console.log(task)
// })
// pr.product10.save().then(task => {
//   console.log(task)
// })
// pr.product11.save().then(task => {
//   console.log(task)
// })
// pr.product12.save().then(task => {
//   console.log(task)
// })
// pr.product13.save().then(task => {
//   console.log(task)
// })
// pr.product14.save().then(task => {
//   console.log(task)
// })
// pr.product15.save().then(task => {
//   console.log(task)
// })
// pr.product16.save().then(task => {
//   console.log(task)
// })
// pr.product17.save().then(task => {
//   console.log(task)
// })
// pr.product18.save().then(task => {
//   console.log(task)
// })
// pr.product19.save().then(task => {
//   console.log(task)
// })
// pr.product20.save().then(task => {
//   console.log(task)
// })




const port = process.env.PORT || 4003

app.listen(port, () => {
  console.log(`App Running on port ${port}`)
});
