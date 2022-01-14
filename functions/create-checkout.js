const express = require('express')
const app = express();
const cors = require('cors')
const serverless = require('serverless-http')
const stripe = require('stripe')('sk_test_51KHf12AC31TQrdAWF4dtXXzd1DuI26OpkShLsQwCwENmYb4GB1PhX6utzbGb4dgFCNBj9oBQ4YxM4zr14rvTMN2700UBybxiqz')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }))

app.post('/.netlify/functions/create-checkout', async (req, res) => {
  console.log('hey')
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2500,
      },
      quantity: 1,
    }, ],
    mode: 'payment',
    success_url: 'https://naughty-williams-126c1a.netlify.app/',
    cancel_url: 'https://naughty-williams-126c1a.netlify.app/',
  });

  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.redirect(303, session.url);
});


module.exports.handler = serverless(app)