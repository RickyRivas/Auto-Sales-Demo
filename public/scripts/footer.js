class footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = ` 
        <footer>
            <div class="container">
            <div class="main">
                <img src="/assets/logo01.svg" class="" alt="">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex odio unde dolore iste repellat eum
                    beatae at! Consectetur, veritatis architecto!</p>
            </div>
            <div class="social">
                <h3>Follow Us</h3>
                <div class="flex">
                    <img src="/assets/ig.svg" class="" alt>
                    <img src="/assets/fb02.svg" class="" alt>
                    <img src="/assets/twitter02.svg" class="" alt>
                    <img src="/assets/telegram.svg" class="" alt>
                </div>
                <h3>Review Us</h3>
                <div class="flex">
                    <img src="/assets/google.svg" class="" alt>
                </div>
            </div>
            <div class="links">
                <h3>Website Navigation</h3>
                <ul>
                    <li><a href='index.html'>Home</a></li>
                    <li><a href='gallery.html'>Gallery</a></li>
                    <li><a href='menu.html'>Menu</a></li>
                    <li><a href='contact.html'>Contact Us</a></li>
                    <li><a href='about.html'>About Us</a></li>
                </ul>
            </div>
        </div>
        <div class="credit">
            <p>&copy 2022 Jefes Mexican Cocina & Cantina | Developed and Designed by <a href='#'>Rivas Web Designs</a>
            </p>
        </div>
        </footer>
    `
    }
}
customElements.define('elegant-footer', footer);