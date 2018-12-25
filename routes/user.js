const express = require('express');
const pg = require('pg');
const { Pool, Client} = require('pg')
const models = require('../models');
const prod = require('./products');
const sequelize = require('sequelize');

// Connect Express Server to Postgress
const config = {
  host: 'localhost',
  port: 5432,
  database: 'jsondata',
  user: 'postgres',
  password: 123456,
  max: 1000
}

// Query postgress using pool
const pool = new Pool(config);
const client = new Client(config)

//creates routes for different requests
const router = express.Router()


router.get('/products', (req, res) => {
  models.product.findAll()
  .then(data => {
    res.send(data)
  })
})


router.get('/products/:id', (req, res) => {
  const id = req.params.id
  models.product.findAll({
    where: {
      id: `${id}`
    }
  })
  .then(data => {
    res.send(data)
  })
})


router.post('/orders', (req, res) => {
  const {name, email, order_items} = req.body.orders;
  const sql1 = `INSERT INTO orders(name, email, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id`
  const sql2 = `INSERT INTO order_items(order_id, product_id, qty, products, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`
  const date = new Date()

  pool.connect((err, client, done) => {
    const shouldAbort = (err) => {
      if(err) {
        console.error('Error in transaction', err.stack)
        client.query('ROOLBACK', (err) => {
          if(err) {
            console.error('Error rolling back client', err.stack)
          }
          done()
        })
      }
      return !!err
    }

    client.query('BEGIN', (err) => {
      console.log('BREAK')
      if(shouldAbort(err)) return
       client.query(sql1, [name, email, date, date], (err, res) => {
        if(shouldAbort(err)) return
        const id = res.rows[0].id
        order_items.map(data => {
          switch(data.product_id){
            case 1:
              products = prod.product1;
              break;
            case 2:
              products = prod.product2;
              break;
            case 3:
              products = prod.product3;
              break;
            case 4:
              products = prod.product4;
              break;
            case 5:
              products = prod.product5;
              break;
            case 6:
              products = prod.product6;
              break;
            case 7:
              products = prod.product7;
              break;
            case 8:
              products = prod.product8;
              break;
            case 9:
              products = prod.product9;
              break;
            case 10:
              products = prod.product10;
              break; 
            case 11:
              products = prod.product11;
              break;
            case 12:
              products = prod.product12;
              break;
            case 13:
              products = prod.product13;
              break;
            case 14:
              products = prod.product14;
              break;
            case 15:
              products = prod.product15;
              break;
            case 16:
              products = prod.product16;
              break;
            case 17:
              products = prod.product17;
              break;
            case 18:
              products = prod.product18;
              break;
            case 19:
              products = prod.product19;
              break;
            case 20:
              products = prod.product20;
              break;                             
          }
          client.query(sql2, [id, data.product_id, data.qty, products, date, date], (err, res) => {
            if(shouldAbort(err)) return
            console.log('BREAK2')
            console.log('RESPONSE: ',res)
            client.query('COMMIT', (err) => {
              if(err) {
                console.error('Error committing transaction', err.stack)
              }
              done()
            })
          })
        })
      })
    })
  })
    setTimeout(() =>{
      models.order.findAll({
        limit: 1,
        order: [
          ['id', 'DESC']
        ]
      })
      .then(data => {
        console.log('BREAK3')
        console.log(data[0].dataValues.id)
        res.send(data[0])
      })
      .catch(err => res.status(400).json('Something Went Wrong'))
    }, 2000)
})

router.get('/orders/:id', (req, res) => {
  const { id } = req.params
  const sql3 = `SELECT row_to_json(t) FROM ( SELECT id, name, email, ( SELECT json_agg(row_to_json(order_items)) FROM order_items WHERE order_id=orders.id ) AS order_items FROM orders WHERE id = ${id}) t;`

  pool.connect()
    .then(() => {
      console.log('BREAK4', id)
      return pool.query(sql3)
    })
    .then(data => {
      res.send(data.rows[0].row_to_json)
    })
    .catch(err => res.status(400).json('Something Went Wrong'))
})


module.exports = router