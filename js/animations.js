document.addEventListener('DOMContentLoaded', function() {
    // Плавное появление элементов при прокрутке
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

    // Наблюдаем за элементами с классом animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Добавляем класс animate-on-scroll к нужным элементам
    document.querySelectorAll('.revision-item, .contact-item, .links-list li').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Плавная прокрутка для навигации
    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            } else {
                window.location.href = targetId;
            }
        });
    });

    // Эффект мерцания для логотипа
    setInterval(() => {
        const logo = document.querySelector('.logo');
        logo.style.textShadow = '0 0 10px rgba(253, 187, 45, 0.8)';
        setTimeout(() => {
            logo.style.textShadow = '0 0 20px rgba(253, 187, 45, 0.5)';
        }, 500);
    }, 3000);
});
