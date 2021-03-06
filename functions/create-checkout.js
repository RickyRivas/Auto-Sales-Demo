const express = require('express')
const app = express();
const serverless = require('serverless-http')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const bodyParser = require('body-parser');

// const items = [];
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

  // items.push(obj)

  const session = await stripe.checkout.sessions.create({
    line_items: [obj],
    mode: 'payment',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    consent_collection: {
      promotions: 'auto',
    },
    shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
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
    success_url: 'https://naughty-williams-126c1a.netlify.app/',
    cancel_url: 'https://naughty-williams-126c1a.netlify.app/'
  });


  res.status(303).json({
    url: session.url,
    prod: obj
  })
});


module.exports.handler = serverless(app)