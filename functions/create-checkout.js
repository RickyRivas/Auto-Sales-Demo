const express = require('express')
const app = express();
const serverless = require('serverless-http')
const stripe = require('stripe')('sk_test_51KHf12AC31TQrdAWF4dtXXzd1DuI26OpkShLsQwCwENmYb4GB1PhX6utzbGb4dgFCNBj9oBQ4YxM4zr14rvTMN2700UBybxiqz')
// const bodyParser = require('body-parser');

const items = [];
app.use(express.json());
app.post('/.netlify/functions/create-checkout', async (req, res) => {

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
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
      maximum: 10,
    },
    quantity: 1,
  }

  items.push(obj)

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: 'payment',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    automatic_tax: {
      enabled: true,
    },
    shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          // # Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          //  # Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          }
        }
      },
    ],
    success_url: req.get("origin"),
    cancel_url: req.get("origin")
  });


  res.status(303).json({
    url: session.url
  })
});


module.exports.handler = serverless(app)