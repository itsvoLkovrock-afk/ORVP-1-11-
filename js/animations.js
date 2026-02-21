// Плавная прокрутка для навигации
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к элементам с определёнными классами
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.hero, .resources, .schedule-card, .instructions, .certification-rules, .certification-content, .contact-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Эффект мерцания для логотипа
const logo = document.querySelector('.logo');
setInterval(() => {
    logo.style.textShadow = '0 0 20px #ff4757';
    setTimeout(() => {
        logo.style.textShadow = '0 0 10px #ff4757';
    }, 300);
}, 2000);
