// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Detectar preferencia guardada o del sistema
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
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
