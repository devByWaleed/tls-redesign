// ── Off-Canvas Sidebar ──────────────────────────────────────────
const sb = document.getElementById('sidebar');
const ov = document.getElementById('overlay');

function toggleSidebar(isOpen) {
    if (!sb || !ov) return;
    sb.classList.toggle('translate-x-full', !isOpen);
    ov.classList.toggle('opacity-0', !isOpen);
    ov.classList.toggle('pointer-events-none', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
        sb.removeAttribute('inert');
        sb.setAttribute('aria-hidden', 'false');
    } else {
        sb.setAttribute('inert', '');
        sb.setAttribute('aria-hidden', 'true');
    }
}

document.getElementById('sbOpen')?.addEventListener('click', () => toggleSidebar(true));
document.getElementById('sbClose')?.addEventListener('click', () => toggleSidebar(false));
ov?.addEventListener('click', () => toggleSidebar(false));
sb?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleSidebar(false)));


// ── Theme Switcher ─────────────────────────────────────────────
function switchTheme() {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
        html.removeAttribute('data-theme');
        localStorage.setItem('tls-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('tls-theme', 'light');
    }
}

document.getElementById('tdsk')?.addEventListener('click', switchTheme);
document.getElementById('tmob')?.addEventListener('click', switchTheme);


// ── Copyright Year ─────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ── Unified Scroll Fade-In Observer ────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up, .reveal').forEach(el => observer.observe(el));


// ── Video/Image Media Toggle ───────────────────────────────────
let isVideoVisible = false;
const slideImage = document.getElementById('slide-image');
const slideVideo = document.getElementById('slide-video');
const dotImage = document.getElementById('dot-image');
const dotVideo = document.getElementById('dot-video');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');
const videoElement = slideVideo?.querySelector('video');

function toggleSlider() {
    isVideoVisible = !isVideoVisible;

    if (slideImage) slideImage.style.opacity = isVideoVisible ? '0' : '1';
    if (slideVideo) slideVideo.style.opacity = isVideoVisible ? '1' : '0';
    if (dotImage) dotImage.style.opacity = isVideoVisible ? '0.4' : '1';
    if (dotVideo) dotVideo.style.opacity = isVideoVisible ? '1' : '0.4';
    if (toggleIcon) toggleIcon.textContent = isVideoVisible ? '✕' : '▶';
    if (toggleText) toggleText.textContent = isVideoVisible ? 'Hide Video' : 'Watch Video';

    if (videoElement) {
        if (isVideoVisible) {
            videoElement.play().catch(() => console.log('Autoplay prevented'));
        } else {
            videoElement.pause();
        }
    }
}

// Add event listener
document.getElementById('slider-toggle')?.addEventListener('click', toggleSlider);

if (videoElement) {
    videoElement.addEventListener('error', () => {
        if (slideVideo) slideVideo.style.opacity = '0';
        if (slideImage) slideImage.style.opacity = '1';
        if (dotImage) dotImage.style.opacity = '1';
        if (dotVideo) dotVideo.style.opacity = '0.4';
        if (toggleIcon) toggleIcon.textContent = '▶';
        if (toggleText) toggleText.textContent = 'Watch Video';
    });
}


// ── Scroll To Top Button ───────────────────────────────────────
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// Function to send Email
function sendMail(event) {
    // CRITICAL: Prevents URL parameter addition
    event.preventDefault();

    let status = document.getElementById("formStatus");
    let form = event.target;

    // Clear previous status
    status.textContent = "Sending...";
    status.style.color = "var(--page-text-muted)";

    // Get form values
    let params = {
        parent_name: document.getElementById("personName").value,
        user_email: document.getElementById("personEmail").value,
        child_age: document.getElementById("childAge").value,
        program: document.getElementById("programSelect").value,
        city: document.getElementById("personCity").value,
    };

    // EMAILJS CREDENTIALS
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Initialize EmailJS with your public key
    emailjs.init(PUBLIC_KEY);

    // Send email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
        .then(function (response) {
            status.textContent = "✅ Message sent successfully! Coach will respond within 24 hours.";
            status.style.color = "#2D6A4F";
            console.log('SUCCESS!', response.status, response.text);
            form.reset();
        })
        .catch(function (error) {
            status.textContent = "❌ Failed to send message. Please try again or contact us directly at (123) 456-7890.";
            status.style.color = "#DC2626";
            console.log('FAILED...', error);
        });
}
document.getElementById('contactForm')?.addEventListener('submit', sendMail);


// ── Skip Link Focus Handler ────────────────────────────────────
document.querySelector('.skip-link')?.addEventListener('click', (e) => {
    const main = document.getElementById('main-content');
    if (main) {
        e.preventDefault();
        main.focus({ preventScroll: false });
        main.scrollIntoView();
    }
});