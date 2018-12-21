const express = require('express');
const pg = require('pg');
const models = require('../models');
const prod = require('./products');
const sequelize = require('sequelize');

//Connect Express Server to Postgress
// const config = {
//   user: 'abdil',
//   database: 'jsondata',
//   password: 123456,
//   port: 5432,
// }

// Query postgress using pool
// const pool = new pg.Pool(config);

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
  return models.sequelize.transaction(function (t) {
    // chain all your queries here. make sure you return them.
    return models.order.create({
      name: `${name}`,
      email: `${email}`
    }, {transaction: t}).then(function (res) {
      const id = res.dataValues.id


      order_items.forEach(data => {
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
        }
        const orders =  models.order_items.create({
          order_id: `${id}`,
          product_id: `${data.product_id}`,
          qty: `${data.qty}`,
          products: `${products}`
        }, {transaction: t})
        return orders;
      });
    });
  
  }).then(() => {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
    const sql = 'SELECT * FROM orders ORDER BY ID DESC LIMIT 1;'
    console.log('BREAK2')
    return sequelize.query(sql)
  })
  .then(data => {
    console.log(data)
  })
  .catch(function (err) {
    console.error('Error rolling back client', err.stack)
  });
  // try {
  //   models.order.create({
  //     name: `${name}`,
  //     email: `${email}`
  //   })
  //   return 
  // } catch(err){
  //   console.error('Error rolling back client', err.stack)
  // }

})


router.post('/12', (req, res) => {
  const {name, email, order_items} = req.body[0].orders;
  // const sql = `INSERT INTO orders(name, email) VALUES (${name}, ${email}) RETURNING id`
  // console.log('BREAK2')
  // return sequelize.query(sql)

  console.log(`name:`, name)
  console.log(`email:`, email)

  order_items.forEach((data) => {
    // switch(data.product_id){
    //   case 1:
    //     products = prod.product1;
    //     break;
    //   case 2:
    //     products = prod.product2;
    //     break;
    //   case 3:
    //     products = prod.product3;
    //     break;
    //   case 4:
    //     products = prod.product4;
    //     break;
    //   case 5:
    //     products = prod.product5;
    //     break;
    // }
    if(data.product_id === 1) {
      return products = prod.product1
    }
    // return console.log(`product_id: ${data.product_id}, qty: ${data.qty}, products: ${products}`)

    return console.log(data.product_id)
  })


  res.end()
})







// router.post('/orders.json', async(req, res) => {
//   const {name, email, order_items} = req.body.orders;
//   // const {product_id, qty} = req.body.orders.order_items[1];
//   console.log(`name:${name}, email:${email}`)
//   order_items.forEach(item => {
//       console.log(item.product_id, item.qty)
//   });

//   // pool.connect()
//   //   .then(() => {
//   //     // const sql = `INSERT INTO orders (name, email) VALUES($1, $2)`
//   //     const sql = 'WITH new_order AS (INSERT INTO orders (name, email) VALUES ($1, $2) RETURNING id AS order_id) INSERT INTO order_items(order_id, product_id, qty) VALUES (order_id () $3, $4) FROM new_order'
//   //     const values = [`${name}`, `${email}`, `${product_id}`, `${qty}`]
//   //     return pool.query(sql, values)
//   //   }).then(res => {
//   //     console.log(res.row)
//   //   })
//   //   .catch(e => console.error(e.stack))
// })




// router.get('/orders/:id', (req, res) => {
//   console.log('Fetch order id:'+ req.params.id)
//   pool.connect()
//     .then(() => {
//       const sql = 'SELECT * FROM orders WHERE id = $1;'
//       const params = [req.params.id];
//       return pool.query(sql, params);
//     })
//     .then((data) => {
//       console.log(data)
//       res.json(data.rows)
//     })
//     .catch((err) => {
//       res.sendStatus(400).res.send('Something went wrong')
//     })
// })


// router.post('/test', async(req, res) => {
//   // console.log('works')
//   const {name, email, order_items} = req.body.orders;
//   const {product_id, qty} = order_items;
//   pool.connect()
//     .then(() => {
//       const sql = 'WITH ins1 AS ( INSERT INTO orders (name, email) VALUES ($1, $2) RETURNING id AS order_id), ins2 AS ( INSERT INTO order_items(order_id, product_id, qty) SELECT order_id, $3, $4 FROM ins1)'
//       order_items.forEach(data => {
//         const params = [name, email, data.product_id, data.qty]
//         console.log(sql, params)
//         return pool.query(sql, params)
//       })
//     })
//   // order_items.forEach(data => {
//   //   console.log(name, email, data.product_id, data.qty)
//   // })
  

//   .then((data) => {
//     res.json(data.rows)
//   })
//   .catch(e => console.error(e.stack))
// })




module.exports = router