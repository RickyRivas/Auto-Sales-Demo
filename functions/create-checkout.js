const express = require('express')
const app = express();
const serverless = require('serverless-http')
const stripe = require('stripe')('sk_test_51KHf12AC31TQrdAWF4dtXXzd1DuI26OpkShLsQwCwENmYb4GB1PhX6utzbGb4dgFCNBj9oBQ4YxM4zr14rvTMN2700UBybxiqz')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.post('/.netlify/functions/create-checkout', async (req, res) => {

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