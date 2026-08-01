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


const faqs = [
    {
        question: "What age groups do you train?",
        answer: "We work with players aged 4 to 18. Training is adapted to each age group — playful for young kids, technically intensive for older players."
    },
    {
        question: "Do you offer sessions 7 days a week?",
        answer: "Yes! We offer sessions every day including weekends, based on availability at your preferred field location."
    },
    {
        question: "Where exactly do sessions take place?",
        answer: "Sessions are held at local parks and recreational fields in your city — no travel to a training facility required."
    },
    {
        question: "Is there a contract or minimum commitment?",
        answer: "No contracts and no minimum sessions. Book individually or in packages — whatever works for you."
    },
    {
        question: "How do I register?",
        answer: "Fill out the registration form on this page. Coach John Doe will follow up within 24 hours to confirm your program and first session."
    }
];


let open = null;

document.getElementById('faqs').innerHTML = faqs.map((faq, i) => `
        <div class="bg-slate-50 p-3.5 rounded-lg cursor-pointer transition-all duration-300 border border-slate-200 hover:bg-slate-100 faq-item" data-index="${i}">
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-neutral-800">${faq.question}</span>
                <div class="text-slate-400 p-1 rounded transition-colors icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
            </div>
            <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 answer">
                <div class="overflow-hidden">
                    <p class="text-sm text-neutral-600 leading-relaxed mt-4">${faq.answer}</p>
                </div>
            </div>
        </div>
    `).join('');

document.querySelectorAll('.faq-item').forEach(item => {
    item.onclick = () => {
        const i = item.dataset.index;
        const answer = item.querySelector('.answer');
        const icon = item.querySelector('.icon');

        if (open === i) {
            answer.classList.remove('grid-rows-[1fr]', 'opacity-100');
            answer.classList.add('grid-rows-[0fr]', 'opacity-0');
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
            icon.classList.remove('bg-slate-200', 'text-slate-500');
            item.classList.remove('row-span-2');
            open = null;
        } else {
            if (open !== null) {
                const prev = document.querySelector(`[data-index="${open}"]`);
                prev.querySelector('.answer').classList.remove('grid-rows-[1fr]', 'opacity-100');
                prev.querySelector('.answer').classList.add('grid-rows-[0fr]', 'opacity-0');
                prev.querySelector('.icon').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
                prev.querySelector('.icon').classList.remove('bg-slate-200', 'text-slate-500');
                prev.classList.remove('row-span-2');
            }
            answer.classList.add('grid-rows-[1fr]', 'opacity-100');
            answer.classList.remove('grid-rows-[0fr]', 'opacity-0');
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>';
            icon.classList.add('bg-slate-200', 'text-slate-500');
            item.classList.add('row-span-2');
            open = i;
        }
    };
});


// ============================================
// SCROLL TO TOP BUTTON (bottom-right corner)
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when clicked
scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



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
    const SERVICE_ID = 'service_1ludv8h';
    const TEMPLATE_ID = 'template_1to4cqc';
    const PUBLIC_KEY = 'Fpp5G3rKzrZGmLRJy';

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
            status.textContent = "❌ Failed to send message. Please try again or contact us directly at (470) 123-4567.";
            status.style.color = "#DC2626";
            console.log('FAILED...', error);
        });
}