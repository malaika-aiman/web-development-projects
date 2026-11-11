const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".food-card");
filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    const category = filter.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle("hidden", category !== "all" && card.dataset.category !== category);
    });
  });
});

const toast = document.getElementById("toast");
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}
document.querySelectorAll(".quick-reserve").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("reservation").scrollIntoView({ behavior: "smooth" });
    showToast("Great choice! Complete the form to request your table.");
  });
});

const dateInput = document.getElementById("bookingDate");
const today = new Date();
dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("formMessage").textContent = "Thanks! Your reservation request is ready. Our team will contact you to confirm.";
  showToast("Reservation request received!");
});

// Reveal content smoothly as visitors scroll.
const revealTargets = document.querySelectorAll(".section-heading,.food-card,.deal-copy,.deal-art,.chef-card,.why-card,.reservation-form");
revealTargets.forEach((item,index)=>{item.classList.add("reveal-ready");item.style.setProperty("--reveal-delay",`${(index%3)*90}ms`);});
const revealObserver = new IntersectionObserver((entries,observer)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}});
},{threshold:.12});
revealTargets.forEach(item=>revealObserver.observe(item));

// Gentle 3D tilt on desktop pointer devices.
if(window.matchMedia("(hover: hover) and (pointer: fine)").matches){
  document.querySelectorAll(".food-card,.why-card").forEach(card=>{
    card.addEventListener("pointermove",event=>{
      const rect=card.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      card.style.transform=`perspective(850px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave",()=>{card.style.transform="";});
  });
}
