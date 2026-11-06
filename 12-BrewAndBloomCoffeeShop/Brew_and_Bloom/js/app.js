const PRODUCTS = [
  { id: "velvet-latte", name: "Velvet Latte", category: "Coffee", description: "Double espresso, silky milk and a soft cocoa finish.", price: 520, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85", tag: "Bestseller" },
  { id: "iced-oat", name: "Iced Oat Cloud", category: "Cold Coffee", description: "Chilled espresso shaken with creamy oat milk.", price: 590, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85", tag: "New" },
  { id: "caramel-cold", name: "Caramel Cold Brew", category: "Cold Coffee", description: "Slow-steeped coffee with house caramel.", price: 610, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=85", tag: "" },
  { id: "flat-white", name: "Classic Flat White", category: "Coffee", description: "A balanced double shot finished with fine microfoam.", price: 480, image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=85", tag: "" },
  { id: "matcha", name: "Vanilla Matcha", category: "Tea & More", description: "Ceremonial-style matcha with a touch of vanilla.", price: 560, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=85", tag: "Staff pick" },
  { id: "mocha", name: "Dark Mocha", category: "Coffee", description: "Rich espresso blended with dark chocolate.", price: 570, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=85", tag: "" },
  { id: "croissant", name: "Butter Croissant", category: "Bakery", description: "Flaky, golden layers baked fresh each morning.", price: 350, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85", tag: "" },
  { id: "brownie", name: "Fudge Brownie", category: "Bakery", description: "A soft-centred chocolate brownie with crisp edges.", price: 390, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85", tag: "" }
];

const CART_KEY = "brewBloomCart";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = count);
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
}

function addToCart(productId) {
  const product = PRODUCTS.find(item => item.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) existing.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  saveCart(cart);
  showToast(`${product.name} added to your bag`);
}

function renderProductCard(product, compact = false) {
  return `
    <article class="${compact ? "menu-card" : "product-card"} reveal">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
        <button class="quick-add" type="button" data-add="${product.id}" aria-label="Add ${product.name} to bag">+</button>
      </div>
      <div class="product-info">
        <span class="category">${product.category}</span>
        <h3>${product.name}</h3>
        ${compact ? `<p>${product.description}</p>` : ""}
        <div class="product-bottom">
          <span class="price">Rs. ${product.price}</span>
          <span class="rating">★★★★★</span>
        </div>
      </div>
    </article>`;
}

function renderProducts(target, products, compact = false) {
  const container = document.querySelector(target);
  if (!container) return;
  container.innerHTML = products.length
    ? products.map(product => renderProductCard(product, compact)).join("")
    : `<div class="empty-state">No items found. Try another search.</div>`;
  observeReveals();
}

function setupMenu() {
  const grid = document.querySelector("#menu-grid");
  if (!grid) return;
  let activeCategory = "All";
  let searchTerm = "";
  const update = () => {
    const filtered = PRODUCTS.filter(product =>
      (activeCategory === "All" || product.category === activeCategory) &&
      `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(searchTerm)
    );
    renderProducts("#menu-grid", filtered, true);
  };
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.dataset.filter;
      update();
    });
  });
  const search = document.querySelector("#menu-search");
  if (search) search.addEventListener("input", event => {
    searchTerm = event.target.value.trim().toLowerCase();
    update();
  });
  update();
}

function setupCart() {
  const list = document.querySelector("#cart-list");
  if (!list) return;
  const render = () => {
    const cart = getCart();
    const items = cart.map(entry => {
      const product = PRODUCTS.find(item => item.id === entry.id);
      return product ? { ...product, quantity: entry.quantity } : null;
    }).filter(Boolean);

    if (!items.length) {
      list.innerHTML = `<div class="empty-state"><h3>Your bag is taking a little break.</h3><p>Find something lovely on the menu.</p><a class="btn" href="menu.html">Explore the menu</a></div>`;
    } else {
      list.innerHTML = items.map(item => `
        <div class="cart-row">
          <img src="${item.image}" alt="${item.name}">
          <div><h3>${item.name}</h3><p>${item.category}</p><button class="remove-btn" data-remove="${item.id}">Remove</button></div>
          <div class="qty-control">
            <button data-qty="${item.id}" data-change="-1" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button data-qty="${item.id}" data-change="1" aria-label="Increase quantity">+</button>
          </div>
          <strong class="price row-price">Rs. ${item.price * item.quantity}</strong>
        </div>`).join("");
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = subtotal > 0 ? 120 : 0;
    const total = subtotal + delivery;
    const subtotalEl = document.querySelector("#subtotal");
    const deliveryEl = document.querySelector("#delivery");
    const totalEl = document.querySelector("#total");
    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal}`;
    if (deliveryEl) deliveryEl.textContent = `Rs. ${delivery}`;
    if (totalEl) totalEl.textContent = `Rs. ${total}`;
    updateCartCount();
  };

  list.addEventListener("click", event => {
    const removeId = event.target.dataset.remove;
    const qtyId = event.target.dataset.qty;
    if (removeId) {
      saveCart(getCart().filter(item => item.id !== removeId));
      render();
      showToast("Item removed from your bag");
    }
    if (qtyId) {
      const change = Number(event.target.dataset.change);
      const cart = getCart();
      const item = cart.find(entry => entry.id === qtyId);
      if (item) item.quantity += change;
      saveCart(cart.filter(entry => entry.quantity > 0));
      render();
    }
  });

  const checkout = document.querySelector("#checkout-btn");
  if (checkout) checkout.addEventListener("click", () => {
    if (!getCart().length) return showToast("Your bag is empty");
    showToast("Demo checkout: your order is ready to be connected to a backend.");
  });
  render();
}

function observeReveals() {
  const elements = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(element => observer.observe(element));
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });
}

function setupForms() {
  document.querySelectorAll("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      showToast(form.dataset.success || "Thanks! Your details have been received.");
      form.reset();
    });
  });
}

function setupTilt() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(850px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-5px)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  updateCartCount();
  setupMenu();
  renderProducts("#featured-products", PRODUCTS.slice(0, 4));
  setupCart();
  setupForms();
  setupTilt();
  observeReveals();

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add]");
    if (addButton) addToCart(addButton.dataset.add);
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});
