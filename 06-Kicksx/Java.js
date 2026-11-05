// Mobile Menu Toggle
let menuIcon = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navlist.classList.toggle('active');
};

// Interactive Color Swatches & Auto-Slider for Main Sneaker Image
const colorBoxes = document.querySelectorAll('.color-box');
const mainShoeImg = document.getElementById('mainShoeImg');
let currentIndex = 0;

// Images array for auto sliding
const slides = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", // Red
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", // Blue
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=800&auto=format&fit=crop", // Black
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop"  // Yellow
];

// Click handlers for manual color boxes
colorBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        currentIndex = index;
        updateActiveSlide();
    });
});

function updateActiveSlide() {
    colorBoxes.forEach(b => b.classList.remove('active'));
    colorBoxes[currentIndex].classList.add('active');
    
    mainShoeImg.style.opacity = '0';
    setTimeout(() => {
        mainShoeImg.src = slides[currentIndex];
        mainShoeImg.style.opacity = '1';
    }, 200);
}

// Auto Slide every 3.5 seconds (Picture khud-ba-khud change hoti rahegi)
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateActiveSlide();
}, 3500);

mainShoeImg.style.transition = 'opacity 0.2s ease';

// Cart State & Functionality
let cart = [];
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartCountEl = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');

cartBtn.onclick = () => cartModal.classList.add('active');
closeCart.onclick = () => cartModal.classList.remove('active');

window.addToCart = function(name, price) {
    cart.push({ name, price });
    updateCartUI();
};

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    cartCountEl.textContent = cart.length;
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="color: #777; text-align: center; margin-top: 40px;">Your cart is empty.</p>';
        cartTotalPrice.textContent = 'Rs. 0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        let div = document.createElement('div');
        div.className = 'cart-item-card';
        div.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Rs. ${item.price.toLocaleString()}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})"><i class='bx bx-trash'></i></button>
        `;
        cartItemsList.appendChild(div);
    });

    cartTotalPrice.textContent = `Rs. ${total.toLocaleString()}`;
}

window.checkout = function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully! Thank you for shopping with KicksX Pakistan.');
    cart = [];
    updateCartUI();
    cartModal.classList.remove('active');
};

// Search & Filter Products Functionality
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', (e) => {
    let term = e.target.value.toLowerCase();
    productCards.forEach(card => {
        let title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        let filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            let category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
