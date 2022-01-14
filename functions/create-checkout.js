const express = require('express')
const app = express();
const serverless = require('serverless-http')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const bodyParser = require('body-parser');

app.use(bodyParser)

app.post('/create-checkout-session', async (req, res) => {
    res.send(req.body)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://naughty-williams-126c1a.netlify.app/',
    cancel_url: 'https://naughty-williams-126c1a.netlify.app/',
  });

  res.redirect(303, session.url);
});


module.exports.handler = serverless(app)