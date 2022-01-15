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


const createCheckout = async (id) => {
    try {
        const response = await fetch('/.netlify/functions/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(id)
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
        imgs: ['https://naughty-williams-126c1a.netlify.app/assets/teslax.jpeg'],
        id: "prod_KxaOe4lbnnR7Hr",
    },
    {
        title: 'Tesla Model Y',
        price: 99999,
        desc: 'lorem inpsum decs one tewo three',
        imgs: ['https://naughty-williams-126c1a.netlify.app/assets/teslay.jpeg'],
        id: 2
    },
    {
        title: 'Tesla Model S',
        price: 54000,
        desc: 'lorem inpsum decs one tewo three',
        imgs: ['https://naughty-williams-126c1a.netlify.app/assets/teslas.jpeg'],
        id: 3
    }
]
let result = '';
const displayVehicles = (vehicles) => {
    vehicles.forEach(vehicle => {
        result += `
        <div class='item'>
            <div class='img-container'>
                <img src='${vehicle.imgs[0]}'>
            </div>
            <div class='body'>
            <div>
                <h1>${vehicle.title}</h1>
                <p>Starting at $${vehicle.price}</p>
            </div>
            <div class='btns'>
                <button>Inquire</button>
                <button id='checkoutVehicle' data-id='${vehicle.id}'>Buy Now</button>
            </div>
            </div>
        </div>
        `
        output.innerHTML = result
    })
}

displayVehicles(vehicles);

const allCheckoutVehicleBtns = document.querySelectorAll('#checkoutVehicle');
allCheckoutVehicleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // const foundProd = vehicles.find(item => item.id === +e.target.dataset.id);
        // send id to the back
        const id = e.target.dataset.id
        console.log(id)
        createCheckout(id)
    })
})