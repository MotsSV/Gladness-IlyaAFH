// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('hidden');
        nav.classList.toggle('flex');
        nav.classList.toggle('flex-col');
        nav.classList.toggle('absolute');
        nav.classList.toggle('top-full');
        nav.classList.toggle('left-0');
        nav.classList.toggle('right-0');
        nav.classList.toggle('bg-white');
        nav.classList.toggle('p-6');
        nav.classList.toggle('shadow-xl');
    });
}

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Phone Modal Functionality
const phoneModal = document.getElementById('phone-modal');
const copyToast = document.getElementById('copy-toast');

function openPhoneModal() {
    phoneModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePhoneModal() {
    phoneModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
phoneModal.addEventListener('click', (e) => {
    if (e.target === phoneModal) {
        closePhoneModal();
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        copyToast.style.opacity = '1';
        setTimeout(() => {
            copyToast.style.opacity = '0';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
