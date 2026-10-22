document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const closeButtons = document.querySelectorAll(".close, .close-modal");

  // Open modal on plan button click
  document.querySelectorAll(".choose-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const planName = button.getAttribute("data-plan");
      if (modalTitle && planName) {
        modalTitle.textContent = planName;
      }
      modal.classList.add("show");
    });
  });

  // Close modal buttons
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  });

  // Close modal when clicking outside box
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Scroll to plans on "Start studying" click
  const joinBtn = document.querySelector(".join-btn");
  if (joinBtn) {
    joinBtn.addEventListener("click", () => {
      const plansSection = document.querySelector("#plans");
      if (plansSection) {
        plansSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});