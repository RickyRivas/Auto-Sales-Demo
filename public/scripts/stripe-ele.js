const stripe = Stripe('pk_test_51KHf12AC31TQrdAWUG5SSpuSMqB3ZaPURX1rBO3WhDq7OZeN76i49SkCdlPfMc6VfIXzeehqKkoDZLI66eXdbIQo00zfqx6hXp')

const items = [{
    id: "tesla"
}];

let elements;

initialize();
checkStatus();

document.querySelector('#payment-form')
    .addEventListener('submit', handleSubmit);

async function initialize() {
    const response = await fetch('/.netlify/functions/stripe-elements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
    });

    const {
        clientSecret
    } = await response.json();

    const appearance = {
        theme: 'flat'
    }

    elements = stripe.elements({
        appearance,
        clientSecret
    });

    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
}
async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const {
        error
    } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: "http://localhost:8888/index.html"
        }
    })

    if (error.type === 'cart_error' || error.type === 'validation_error') {
        showMessage(error.message)
    } else {
        showMessage('An unexpected error has occured')
    }
    setLoading(false)
}

async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    )

    if (!clientSecret) {
        return
    }

    const {
        paymentIntent
    } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.staus) {
        case 'succeeded':
            showMessage("payment succeeded!")
            break;
        case 'processing':
            showMessage('Your payment is processing')
            break;
        case 'requires_payment_method':
            showMessage('Your payment was not successful, please try again.')
            break;
        default:
            showMessage('something went wrong...')
    }
}

// ------- UI helpers -------

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageText.textContent = "";
    }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}