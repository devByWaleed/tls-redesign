// Off-Canvas Sidebar
const sb = document.getElementById('sidebar');
const ov = document.getElementById('overlay');

function openSB() {
    sb.classList.remove('translate-x-full');
    ov.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
}

function closeSB() {
    sb.classList.add('translate-x-full');
    ov.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
}

document.getElementById('sbOpen').addEventListener('click', openSB);
document.getElementById('sbClose').addEventListener('click', closeSB);
ov.addEventListener('click', closeSB);
sb.querySelectorAll('a').forEach(link => link.addEventListener('click', closeSB));

// Theme Switcher
const html = document.documentElement;

function switchTheme() {
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
        html.removeAttribute('data-theme');
        localStorage.setItem('tls-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('tls-theme', 'light');
    }
}

document.getElementById('tdsk').addEventListener('click', switchTheme);
document.getElementById('tmob').addEventListener('click', switchTheme);

// Set Copyright Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll fade-in (IntersectionObserver)
// Targets all .fade-up elements across the whole page
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire once only
        }
    });
}, { threshold: 0.15 });


document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


let isVideoVisible = false;
const slideImage = document.getElementById('slide-image');
const slideVideo = document.getElementById('slide-video');
const dotImage = document.getElementById('dot-image');
const dotVideo = document.getElementById('dot-video');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');
const videoElement = slideVideo.querySelector('video');

function toggleSlider() {
    isVideoVisible = !isVideoVisible;

    if (isVideoVisible) {
        // Show video, hide image
        slideImage.style.opacity = '0';
        slideVideo.style.opacity = '1';
        dotImage.style.opacity = '0.4';
        dotVideo.style.opacity = '1';
        toggleIcon.textContent = '✕';
        toggleText.textContent = 'Hide Video';
        // Ensure video plays
        if (videoElement) {
            videoElement.play().catch(e => console.log('Video autoplay prevented'));
        }
    } else {
        // Show image, hide video
        slideImage.style.opacity = '1';
        slideVideo.style.opacity = '0';
        dotImage.style.opacity = '1';
        dotVideo.style.opacity = '0.4';
        toggleIcon.textContent = '▶';
        toggleText.textContent = 'Watch Video';
        // Pause video when hidden
        if (videoElement) {
            videoElement.pause();
        }
    }
}

// Handle video load errors - fallback to image
if (videoElement) {
    videoElement.addEventListener('error', function () {
        slideVideo.style.opacity = '0';
        slideImage.style.opacity = '1';
        dotImage.style.opacity = '1';
        dotVideo.style.opacity = '0.4';
        toggleIcon.textContent = '▶';
        toggleText.textContent = 'Watch Video';
        console.log('Video failed to load, showing image instead');
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
        user_name: document.getElementById("personName").value,
        user_email: document.getElementById("personEmail").value,
        subject: document.getElementById("personSubject").value || "New Contact Form Submission",
        user_message: document.getElementById("personMessage").value,
    };

    // EMAILJS CREDENTIALS
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    // Initialize EmailJS with your public key
    emailjs.init(PUBLIC_KEY);

    // Send email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
        .then(function (response) {
            status.textContent = "✅ Message sent successfully! Coach Rami will respond within 24 hours.";
            status.style.color = "#2D6A4F";
            console.log('SUCCESS!', response.status, response.text);
            form.reset();
        })
        .catch(function (error) {
            status.textContent = "❌ Failed to send message. Please try again or contact us directly at (470) 123-4567.";
            status.style.color = "#DC2626";
            console.log('FAILED...', error);
        });
}