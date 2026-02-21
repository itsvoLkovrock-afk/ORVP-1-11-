document.addEventListener('DOMContentLoaded', function() {
    // Создаём курсор-follower
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follow';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Параллакс-эффект при скролле
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelector('.parallax-bg').style.transform = `translateY(${scrollY * 0.5}px)`;
    });

    // Добавляем анимации к элементам
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

    // Применяем анимации к нужным элементам
    document.querySelectorAll('.animate-on-scroll, .card-3d').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Эффект печатной машинки для главного заголовка
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('typewriter');
    }

    // Плавная прокрутка
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

    // Мигающие индикаторы статуса
    setInterval(() => {
        const statusIndicators = document.querySelectorAll('.status-indicator');
        statusIndicators.forEach(indicator => {
            indicator.style.boxShadow = `0 0 10px ${indicator.dataset.color}`;
            setTimeout(() => {
                indicator.style.boxShadow = 'none';
            }, 500);
        });
    }, 2000);
});
