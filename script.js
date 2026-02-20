// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Проверяем сразу при загрузке
});
// Анимация загрузки страницы
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    const content = document.querySelector('.content');

    setTimeout(() => {
        loader.classList.add('hidden');
        content.classList.add('loaded');
    }, 1500); // Задержка 1.5 с для анимации загрузки
});

// Создание анимированных частиц фона
function createParticles() {
    const container = document.querySelector('.animated-bg');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Случайные параметры для каждой частицы
        const size = Math.random() * 8 + 2;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 15;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        container.appendChild(particle);
    }
}

// Инициализация частиц при загрузке
document.addEventListener('DOMContentLoaded', createParticles);

// Плавная анимация параллакса для заголовка
function initParallax() {
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
}

document.addEventListener('DOMContentLoaded', initParallax);

// Анимация появления карточек при скролле
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.resources');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', animateCardsOnScroll);

// Интерактивность для кнопок
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 0 var(--military-green)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 0 var(--olive-green)';
        });

        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });
}

document.addEventListener('DOMContentLoaded', addButtonEffects);

// Анимация для таблиц при наведении
function addTableHoverEffects() {
    const tables = document.querySelectorAll('.schedule-table');

    tables.forEach(table => {
        table.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.6)';
        });

        table.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', addTableHoverEffects);
