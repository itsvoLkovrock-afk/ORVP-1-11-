document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
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
    const animatedElements = document.querySelectorAll(
        '.hero, .resources, .schedule-card, .instructions, .certification-rules, .certification-content, .contact-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Эффект мерцания для логотипа
    const logo = document.querySelector('.logo');
    if (logo) {
        setInterval(() => {
            logo.style.textShadow = '0 0 20px #ff4757, 0 0 40px #ff4757';
            setTimeout(() => {
                logo.style.textShadow = '0 0 10px #ff4757';
            }, 400);
        }, 3000);
    }

    // Мигающие индикаторы статуса
    setInterval(() => {
        const indicators = document.querySelectorAll('.status-indicator');
        indicators.forEach(indicator => {
            indicator.style.boxShadow = '0 0 8px ' + indicator.style.background;
            setTimeout(() => {
                indicator.style.boxShadow = 'none';
            }, 600);
        });
    }, 2000);

    // Добавление военных эффектов к элементам
    const addMilitaryEffects = () => {
        document.querySelectorAll('.schedule-card, .contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.6)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.4)';
            });
        });
    };
    addMilitaryEffects();
});
