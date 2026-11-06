# Brew & Bloom — Coffee House Website

A multi-page coffee shop website built with HTML, CSS and vanilla JavaScript.

## Pages
- `index.html` — Home page with a CSS 3D coffee cup, featured products and story sections.
- `menu.html` — Searchable and filterable menu.
- `cart.html` — Shopping bag with quantity controls, item removal and live totals.
- `about.html` — Brand story and values.
- `contact.html` — Visit details and a demo table-request form.

## Features
- Responsive navigation for mobile and desktop
- CSS 3D coffee cup illustration with floating and steam animations
- Hover transitions, image zoom and tilt effects
- Scroll reveal animations using Intersection Observer
- Product filtering and menu search
- Add-to-cart, quantity updates and cart persistence with localStorage
- Form validation and feedback toast
- Consistent typography, spacing and reusable design tokens

## Run locally
Open `index.html` in a browser. For the best local development experience, use the Live Server extension in VS Code.

## Notes
- Product photos are loaded from Unsplash and Google Fonts are loaded online.
- The cart is a front-end demo. Checkout does not process payments.
- The contact form demonstrates client-side validation and feedback; it does not send data to a server.
- The CSS 3D cup and tilt effects are built without a 3D library, keeping the project lightweight and easy to customize.
