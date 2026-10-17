/**
 * Enhanced JavaScript for the website
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Copyright Year
    updateCopyrightYear();

    // 2. Smooth Scrolling for Internal Navigation Links
    initSmoothScrolling();

    // 3. Sticky Header Shadow on Scroll
    initHeaderScrollEffect();

    // 4. Contact Form Submission Handling
    initContactForm();
});

/**
 * Updates the footer copyright year automatically to the current year
 */
function updateCopyrightYear() {
    const yearSpan = document.querySelector('footer p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = `&copy; ${currentYear} My Website. All rights reserved.`;
    }
}

/**
 * Adds smooth scrolling behavior when clicking header navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Adds a subtle shadow to the header when the user scrolls down
 */
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * Handles form submission feedback
 */
function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic verification (you can expand this as needed)
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');

        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        // Simulate successful submission
        alert(`Thank you, ${nameInput.value}! Your message has been sent successfully.`);
        form.reset();
    });
}
