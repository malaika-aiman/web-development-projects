

const header = document.querySelector("#header");
const menu = document.querySelector("#menuBtn");
const nav = document.querySelector("#navLinks");

// Scroll event for header
window.addEventListener("scroll", function() {
    if (window.scrollY > 25) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Mobile Menu Toggle
menu.onclick = function() {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
        menu.textContent = "×";
    } else {
        menu.textContent = "☰";
    }
};

// Close menu when clicking a link
nav.querySelectorAll("a").forEach(function(a) {
    a.onclick = function() {
        nav.classList.remove("open");
        menu.textContent = "☰";
    };
});

// Scroll Reveal Animation using Intersection Observer
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(function(x) {
    observer.observe(x);
});

// Heart/Like button toggle
document.querySelectorAll(".heart").forEach(function(b) {
    b.onclick = function() {
        b.classList.toggle("liked");
        if (b.classList.contains("liked")) {
            b.textContent = "♥";
        } else {
            b.textContent = "♡";
        }
    };
});

// Filter system for properties
const cards = Array.from(document.querySelectorAll(".card"));
const filters = document.querySelectorAll(".filter");

function showCards(filterFunction) {
    cards.forEach(function(c) {
        if (filterFunction(c)) {
            c.classList.remove("hidden");
        } else {
            c.classList.add("hidden");
        }
    });
}

filters.forEach(function(f) {
    f.onclick = function() {
        filters.forEach(function(x) {
            x.classList.remove("active");
        });
        f.classList.add("active");
        
        let filterValue = f.dataset.filter;
        showCards(function(c) {
            if (filterValue === "all") return true;
            return c.dataset.type === filterValue;
        });
    };
});

// Search Form Handler
document.querySelector("#searchForm").onsubmit = function(e) {
    e.preventDefault();
    
    let selectedLoc = location.value;
    let selectedType = type.value;
    let selectedPrice = priceFilter.value;
    let matchCount = 0;

    cards.forEach(function(c) {
        let cardLoc = c.dataset.location;
        let cardType = c.dataset.type;
        let cardPrice = c.dataset.price;

        let locMatch = (selectedLoc === "all" || cardLoc === selectedLoc);
        let typeMatch = (selectedType === "all" || cardType === selectedType);
        let priceMatch = (selectedPrice === "all" || cardPrice === selectedPrice);

        let isOk = locMatch && typeMatch && priceMatch;

        if (isOk) {
            c.classList.remove("hidden");
            matchCount++;
        } else {
            c.classList.add("hidden");
        }
    });

    let resultText = "";
    if (matchCount > 0) {
        if (matchCount === 1) {
            resultText = "1 matching property found.";
        } else {
            resultText = matchCount + " matching properties found.";
        }
    } else {
        resultText = "No exact match found. Try another search.";
    }

    document.querySelector("#result").textContent = resultText;
    document.querySelector("#properties").scrollIntoView({ behavior: "smooth" });
};

// Detail button alerts
document.querySelectorAll(".detail").forEach(function(b) {
    b.onclick = function() {
        let title = b.closest(".card").querySelector("h3").textContent;
        alert(title + " is a concept listing. Later you can create a separate details page.");
    };
});

// Modal Popup Control
const modal = document.querySelector("#modal");

document.querySelectorAll(".openModal").forEach(function(b) {
    b.onclick = function() {
        modal.classList.add("show");
    };
});

document.querySelector("#closeModal").onclick = function() {
    modal.classList.remove("show");
};

modal.onclick = function(e) {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
};

// Contact Form Submit Handler
document.querySelector("#contactForm").onsubmit = function(e) {
    e.preventDefault();
    document.querySelector("#message").textContent = "Thanks! This demo form can later be connected to a real backend.";
    e.target.reset();
};