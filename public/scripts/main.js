// Navigation
const body = document.querySelector('body');
const burger = document.querySelector(".hamburger");
const navOverlay = document.querySelector('.navlinks-overlay');
const nav = document.querySelector(".nav-links");

const toggleEverything = () => {
    nav.classList.toggle('is-active');
    burger.classList.toggle('is-active');
    body.classList.toggle('body-fixed');
    navOverlay.classList.toggle('is-active');
}

burger.addEventListener('click', toggleEverything)
navOverlay.addEventListener('click', toggleEverything)


const createCheckout = async (product) => {
    try {
        const response = await fetch('/.netlify/functions/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(product)
        });

        const body = await response.json();
        window.location = body.url;
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}
// create checkout only send product id to the back
const product = document.querySelector('#product')
    .addEventListener('click', e => {
        e.stopPropagation()
        const qty = 1;
        const product = {
            id: e.target.dataset.id,
            quantity: qty
        }
        createCheckout(product);
    })