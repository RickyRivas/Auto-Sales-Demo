const express = require('express')
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

app.post('/create-checkout-session', async (req, res) => {
    const product = {
        price_data: {
            currency: 'USD',
            product_data: {
                name: 'item',
            },
            unit_amount: 2000
        },
        quantity: 1
    }
    console.log(product)
    const session = await stripe.checkout.sessions.create({
        line_items: [product],
        mode: 'payment',
        success_url: 'https://naughty-williams-126c1a.netlify.app/',
        cancel_url: 'https://naughty-williams-126c1a.netlify.app/'
    });
    console.log(session)
    res.redirect(303, session.url)
})

app.listen(4242, () => {
    console.log('listening on port 4242')
})