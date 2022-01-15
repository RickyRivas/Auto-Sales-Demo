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
// import data and display it in inventory section

const output = document.querySelector('#inventory');
const vehicles = [{
        title: 'Tesla Model X',
        price: 89999,
        desc: 'lorem inpsum decs one tewo three',
        img: '/assets/teslax.jpeg'
    },
    {
        title: 'Tesla Model Y',
        price: 999999,
        desc: 'lorem inpsum decs one tewo three',
        img: '/assets/teslay.jpeg'
    },
    {
        title: 'Tesla Model S',
        price: 540000,
        desc: 'lorem inpsum decs one tewo three',
        img: '/assets/teslas.jpeg'
    }
]
let result = '';
const displayVehicles = (vehicles) => {
    vehicles.forEach(vehicle => {
        result += `
        <div class='item'>
            <div class='img-container'>
                <img src='${vehicle.img}'>
            </div>
            <div class='body'>
            <div>
                <h1>${vehicle.title}</h1>
                <p>Starting at $${vehicle.price}</p>
            </div>
            <div class='btns'>
                <button>Inquire</button>
                <button>Buy Now</button>
            </div>
            </div>
        </div>
        `
        output.innerHTML = result
    })
}
displayVehicles(vehicles);