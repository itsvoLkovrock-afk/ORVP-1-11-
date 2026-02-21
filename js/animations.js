// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
function checkFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Запускаем проверку при загрузке и скролле
window.addEventListener('load', checkFadeInElements);
window.addEventListener('scroll', checkFadeInElements);

// Активная навигация — подсветка текущего раздела
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем анимацию появления для карточек
    const cards = document.querySelectorAll('.card, .contact-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Проверяем видимость элементов при загрузке
    checkFadeInElements();
});

// Мобильное меню (если понадобится в будущем)
const mobileMenuToggle = document.createElement('div');
mobileMenuToggle.className = 'menu-toggle';
mobileMenuToggle.innerHTML = '☰';
mobileMenuToggle.style.cssText = `
    display: none;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
    z-index: 1001;
`;

// Показ мобильного меню на маленьких экранах
function setupMobileMenu() {
    if (window.innerWidth <= 768) {
        if (!document.body.contains(mobileMenuToggle)) {
            document.querySelector('.header').appendChild(mobileMenuToggle);
            
            mobileMenuToggle.addEventListener('click', function() {
                document.querySelector('.nav-list').classList.toggle('active');
            });
        }
    } else {
        if (document.body.contains(mobileMenuToggle)) {
            mobileMenuToggle.remove();
        }
    }
}

window.addEventListener('resize', setupMobileMenu);
setupMobileMenu();
