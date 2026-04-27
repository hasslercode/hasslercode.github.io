// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Detectar preferencia guardada — dark por defecto
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

// Aplicar tema
function setTheme(theme) {
    if (theme === 'light') {
        htmlElement.dataset.theme = 'light';
        themeIcon.className = 'fas fa-sun';
        document.body.style.backgroundColor = '#ffffff';
    } else {
        delete htmlElement.dataset.theme;
        themeIcon.className = 'fas fa-moon';
        document.body.style.backgroundColor = '#0a0a0c';
    }
    localStorage.setItem('theme', theme);
}

// Toggle tema
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.dataset.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Inicializar tema al cargar
initTheme();

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
    const bars = mobileMenuBtn.querySelectorAll('.hamburger-bar');
    if (isOpen) {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
        bars[2].style.width = '';
    } else {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        bars[2].style.width = '1.5rem';
    }
});

// Cerrar menú al clicar un enlace
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const bars = mobileMenuBtn.querySelectorAll('.hamburger-bar');
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
        bars[2].style.width = '';
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { 
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});

// ===== COMPANY LOGO FALLBACK =====
document.querySelectorAll('img.company-logo').forEach(img => {
    img.addEventListener('error', function () {
        const fallback = document.createElement('span');
        fallback.textContent = this.dataset.fallback || this.alt;
        fallback.className = 'text-xs font-bold tracking-widest text-gray-400 opacity-40 hover:opacity-95 transition cursor-default';
        this.replaceWith(fallback);
    });
});

// ===== MOBILE LOGO SLIDER =====
const companyLogosRow = document.querySelector('.company-logos-row');
let logoSliderRafId = null;
let logoSliderPaused = false;

function cleanupLogoClones() {
    if (!companyLogosRow) return;
    companyLogosRow.querySelectorAll('[data-logo-clone="true"]').forEach(node => node.remove());
    companyLogosRow.scrollLeft = 0;
    delete companyLogosRow.dataset.sliderReady;
}

function startMobileLogoSlider() {
    if (!companyLogosRow) return;

    const isMobile = globalThis.matchMedia('(max-width: 1023px)').matches;
    const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (logoSliderRafId) {
        cancelAnimationFrame(logoSliderRafId);
        logoSliderRafId = null;
    }

    if (!isMobile || reducedMotion) {
        companyLogosRow.classList.remove('is-mobile-slider');
        cleanupLogoClones();
        return;
    }

    companyLogosRow.classList.add('is-mobile-slider');

    if (!companyLogosRow.dataset.sliderReady) {
        const originals = Array.from(companyLogosRow.children);
        originals.forEach(item => {
            const clone = item.cloneNode(true);
            clone.dataset.logoClone = 'true';
            clone.setAttribute('aria-hidden', 'true');
            companyLogosRow.appendChild(clone);
        });
        companyLogosRow.dataset.sliderReady = 'true';
    }

    if (!companyLogosRow.dataset.sliderBound) {
        companyLogosRow.addEventListener('touchstart', () => {
            logoSliderPaused = true;
        }, { passive: true });
        companyLogosRow.addEventListener('touchend', () => {
            logoSliderPaused = false;
        }, { passive: true });
        companyLogosRow.addEventListener('mouseenter', () => {
            logoSliderPaused = true;
        });
        companyLogosRow.addEventListener('mouseleave', () => {
            logoSliderPaused = false;
        });
        companyLogosRow.dataset.sliderBound = 'true';
    }

    const step = () => {
        if (!logoSliderPaused) {
            companyLogosRow.scrollLeft += 0.6;
            const loopPoint = companyLogosRow.scrollWidth / 2;
            if (companyLogosRow.scrollLeft >= loopPoint) {
                companyLogosRow.scrollLeft -= loopPoint;
            }
        }
        logoSliderRafId = requestAnimationFrame(step);
    };

    logoSliderRafId = requestAnimationFrame(step);
}

startMobileLogoSlider();
globalThis.addEventListener('resize', startMobileLogoSlider);
