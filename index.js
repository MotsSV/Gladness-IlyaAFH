const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = mobileNav.classList.contains('active') ? 'close' : 'menu';
        }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = 'menu';
        });
    });
}

const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

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

if (phoneModal) {
    phoneModal.addEventListener('click', (e) => {
        if (e.target === phoneModal) closePhoneModal();
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        if (copyToast) {
            copyToast.style.opacity = '1';
            setTimeout(() => {
                copyToast.style.opacity = '0';
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
