const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   1. Mobile menu
   ========================================================= */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn && mobileNav) {
    const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
    const toggle = (open) => {
        mobileNav.classList.toggle('hidden', !open);
        mobileNav.classList.toggle('flex', open);
        if (icon) icon.textContent = open ? 'close' : 'menu';
    };
    mobileMenuBtn.addEventListener('click', () => toggle(mobileNav.classList.contains('hidden')));
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggle(false)));
}

/* =========================================================
   2. Sticky header state
   ========================================================= */
const header = document.getElementById('site-header');
const onScrollHeader = () => header && header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

/* =========================================================
   3. Scroll reveal (IntersectionObserver)
   ========================================================= */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('active');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('active'));
}

/* =========================================================
   4. 3D tilt on cards / hero visual
   ========================================================= */
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tilt').forEach(el => {
        const strength = el.id === 'hero-visual' ? 6 : 9;
        el.addEventListener('mousemove', (ev) => {
            const r = el.getBoundingClientRect();
            const px = (ev.clientX - r.left) / r.width - 0.5;
            const py = (ev.clientY - r.top) / r.height - 0.5;
            el.style.transform =
                `perspective(1000px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-4px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

/* =========================================================
   5. Phone modal + copy (exposed to inline handlers)
   ========================================================= */
const phoneModal = document.getElementById('phone-modal');
const copyToast = document.getElementById('copy-toast');

window.openPhoneModal = function () {
    if (!phoneModal) return;
    phoneModal.classList.remove('hidden');
    phoneModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};
window.closePhoneModal = function () {
    if (!phoneModal) return;
    phoneModal.classList.add('hidden');
    phoneModal.classList.remove('flex');
    document.body.style.overflow = '';
};
window.copyToClipboard = function (text) {
    navigator.clipboard.writeText(text).then(() => {
        if (!copyToast) return;
        copyToast.style.opacity = '1';
        setTimeout(() => (copyToast.style.opacity = '0'), 1800);
    }).catch(err => console.error('Copy failed:', err));
};

if (phoneModal) {
    phoneModal.addEventListener('click', (e) => { if (e.target === phoneModal) window.closePhoneModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') window.closePhoneModal(); });
}
