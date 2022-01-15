const express = require('express')
const app = express();
const serverless = require('serverless-http')
const stripe = require('stripe')('sk_test_51KHf12AC31TQrdAWF4dtXXzd1DuI26OpkShLsQwCwENmYb4GB1PhX6utzbGb4dgFCNBj9oBQ4YxM4zr14rvTMN2700UBybxiqz')
// const bodyParser = require('body-parser');

const items = [];
app.use(express.json());
app.post('/.netlify/functions/create-checkout', async (req, res) => {
  console.log(req.body.imgs)
  const obj = {
    price_data: {
      currency: 'usd',
      product_data: {
        name: req.body.title,
        description: req.body.desc,
        images: [req.body.imgs[0]]
      },
      unit_amount: req.body.price * 100
    },
    quantity: 1,
  }
  items.push(obj)
  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: 'payment',
    success_url: 'https://naughty-williams-126c1a.netlify.app/',
    cancel_url: 'https://naughty-williams-126c1a.netlify.app/',
  });


  res.status(303).json({
    url: session.url
  })
});


module.exports.handler = serverless(app)