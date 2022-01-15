const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const serverless = require('serverless-http');
app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
    // calc the total amount
    return 1400
}

app.post("/.netlify/functions/stripe-elements", async (req, res) => {
    const {
        items
    } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        }
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    })
})

module.exports.handler = serverless(app);

    //    <!-- Stripe elements start-->
    //     <section id='ele'>
    //         <button id='checkout-btn'>Checkout</button>
    //         <form id="payment-form">
    //             <div id="payment-element">
    //                 <!--Stripe.js injects the Payment Element-->
    //             </div>
    //             <button id="submit">
    //                 <div class="spinner hidden" id="spinner"></div>
    //                 <span id="button-text">Pay now</span>
    //             </button>
    //             <div id="payment-message" class="hidden"></div>
    //         </form>
    //     </section>
    //     <!-- Stripe elements end-->