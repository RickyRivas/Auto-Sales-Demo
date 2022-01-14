class navbar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = ` 
        <nav>
            <div class='logo-wrapper'>
                <img src='assets/logo01.svg' class='' alt=''>
            </div>
            <div class='navlinks-overlay'></div>
            <ul class="nav-links">
                <li class="nav-link"><a href="index.html">Home</a></li>
                <li class="nav-link"><a href="menu.html">Menu</a></li>
                <li class="nav-link"><a href="gallery.html">Gallery</a></li>
                <li class="nav-link"><a href="about.html">About Us</a></li>
                <li class="nav-link"><a href="contact.html">Contact Us</a></li>
                <li class='social-media'>
                    <img src='assets/ig.svg' alt="instagram icon" class="">
                    <img src='assets/fb02.svg' alt="instagram icon" class="">
                </li>
            </ul>
            <button class="hamburger" type="button" aria-label="Navigation Toggle" aria-controls="navigation">
                <span class="hamburger-inner">
                </span>
            </button>
            <a href='' class='btn btn-primary nav-btn'>Order Now</a>
        </nav>
    `
    }
}
customElements.define('elegant-navigation', navbar);
// Navigation Logic
const body = document.querySelector('body');
const burger = document.querySelector(".hamburger");
const navOverlay = document.querySelector('.navlinks-overlay');
const nav = document.querySelector(".nav-links");

burger.addEventListener('click', () => {
    nav.classList.toggle('is-active');
    burger.classList.toggle('is-active');
    body.classList.toggle('body-fixed');
    navOverlay.classList.toggle('is-active');
})
navOverlay.addEventListener('click', () => {
    nav.classList.toggle('is-active');
    burger.classList.toggle('is-active');
    body.classList.toggle('body-fixed');
    navOverlay.classList.toggle('is-active');
})
const imgsArr = document.querySelectorAll('#img');
imgsArr.forEach(img => {
    img.addEventListener('click', () => {
        // create modal
        const modal = document.querySelector('#modal');
        modal.id = 'modal';
        modal.style.display = 'flex';

        // create img container 
        const imgContainer = document.createElement('div');
        imgContainer.className = 'container';
        modal.append(imgContainer);

        // create para 
        const para = document.createElement('p');
        para.className = 'para';
        const caption = img.getAttribute('data-caption');
        para.textContent = caption;
        modal.append(para)

        // create img
        const imgEl = document.createElement('img');
        imgEl.className = 'img'
        imgEl.src = img.src
        imgContainer.appendChild(imgEl);

        // close modal
        let closeModal = document.createElement('div');
        closeModal.className = 'close-modal';
        closeModal.innerHTML = `<img src='/assets/close.svg'>`
        imgContainer.append(closeModal);
        
        // close modal logic
        closeModal.addEventListener('click', () => {
            imgContainer.remove();
            para.remove();
            modal.style.display = 'none';
        })
    });
})