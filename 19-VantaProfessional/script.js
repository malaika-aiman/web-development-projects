const $ = (selector, scope = document) => scope.querySelector(selector);

// Reading progress stays subtle and does not interfere with scrolling.
const progress = $('.progress');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
    ticking = false;
  });
}, { passive: true });

// Mobile navigation.
const menuButton = $('.menu');
const navigation = $('#primary-nav');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuButton.textContent = open ? '×' : '☰';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.textContent = '☰';
}));

// Reveal content only as it enters the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Start the driving shot only when it enters view, then let it play naturally.
const driveScene = $('.drive-scene');
if (driveScene && 'IntersectionObserver' in window) {
  const driveObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      driveScene.classList.add('is-active');
      driveObserver.unobserve(driveScene);
    }
  }), { threshold: 0.25 });
  driveObserver.observe(driveScene);
} else if (driveScene) {
  driveScene.classList.add('is-active');
}

// Expand one engineering detail at a time.
document.querySelectorAll('.spec').forEach(button => button.addEventListener('click', () => {
  const shouldOpen = !button.classList.contains('active');
  document.querySelectorAll('.spec').forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-expanded', 'false');
    $('i', item).textContent = '+';
  });
  if (shouldOpen) {
    button.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    $('i', button).textContent = '−';
  }
}));

// Front-end demonstration only; connect a form endpoint before collecting enquiries.
$('.lead-form').addEventListener('submit', event => {
  event.preventDefault();
  $('.form-note').textContent = 'Thanks for your interest. This demo form is not connected to an enquiry service yet.';
  event.currentTarget.reset();
});
