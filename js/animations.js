class MilitaryUI {
    constructor() {
        this.init();
    }

    init() {
        this.checkMotionPreferences();
        this.setupNav();
        this.setupAnimations();
        this.setupAccessibility();
    }

    // Проверка предпочтений пользователя по анимации
    checkMotionPreferences() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.body.classList.add('no-animations');
            this.disableAnimations();
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('no-animations');
                this.disableAnimations();
            } else {
                document.body.classList.remove('no-animations');
                this.enableAnimations();
            }
        });
    }

    disableAnimations() {
        document.querySelectorAll('.document-item, .contact-card, .link-card')
            .forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
            });
    }

    enableAnimations() {
        document.querySelectorAll('.document-item, .contact-card, .link-card')
            .forEach(el => {
                el.style.animation = '';
                el.style.transition = '';
            });
    }

    // Настройка навигации
    setupNav() {
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Убираем активный класс у всех ссылок
                navLinks.forEach(l => l.classList.remove('active'));
                // Добавляем активный класс текущей ссылке
                e.currentTarget.classList.add('active');
            });
        });
    }

    // Инициализация анимаций с задержками
    setupAnimations() {
        this.setAnimationDelays('.document-item', 0.1);
        this.setAnimationDelays('.contact-card', 0.15);
        this.setAnimationDelays('.link-card', 0.12);
    }

    setAnimationDelays(selector, baseDelay = 0.1) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            const delay = baseDelay * index;
            el.style.animationDelay = `${delay}s`;
        });
    }

    // Обработка динамического добавления элементов
    addDocumentItem(title, link, status = 'pending') {
        const container = document.querySelector('.document-list');
        const item = document.createElement('div');
        item.className = `document-item ${status === 'disabled' ? 'disabled' : ''}`;
        item.innerHTML = `
            <span class="link-icon">📄</span>
            <a href="${link}" class="doc-link">${title}</a>
            <span class="status-badge ${status}">${status}</span>
        `;
        container.appendChild(item);
        // Обновляем задержки анимаций
        this.setAnimationDelays('.document-item', 0.1);
    }

    addContactCard(name, rank, position, phone, email) {
        const container = document.querySelector('.contact-list');
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.innerHTML = `
            <div class="card-header">
                <h3 class="contact-name">${name}</h3>
                <span class="rank-badge ${rank}">${rank}</span>
            </div>
            <div class="card-body">
                <div class="contact-info">
                    <p><span class="info-label">Должность:</span> <span class="info-value">${position}</span></p>
            <p><span class="info-label">Телефон:</span> <span class="info-value">${phone}</span></p>
            <p><span class="info-label">Email:</span> <span class="info-value">${email}</span></p>
                </div>
            </div>
        `;
        container.appendChild(card);
        // Обновляем задержки анимаций
        this.setAnimationDelays('.contact-card', 0.15);
    }

    // Улучшенная обработка скролла для параллакса
    setupParallax() {
        let isScrolling = false;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    // Параллакс для фона (если нужно)
                    document.body.style.backgroundPositionY = `${scrollY * 0.5}px`;
                    isScrolling = false;
                });
            }
        });
    }

    // Управление фокусом для доступности
    setupAccessibility() {
        // Подсветка активного элемента
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('user-is-tabbing');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('user-is-tabbing');
        });
    }

    // Вспомогательные методы
    showAlert(message, type = 'warning') {
        const alertBox = document.createElement('div');
        alertBox.className = `alert-box ${type}`;
        alertBox.innerHTML = `
            <h4>${type === 'warning' ? 'ВНИМАНИЕ' : 'ИНФОРМАЦИЯ'}</h4>
            <p>${message}</p>
        `;

        const container = document.querySelector('.emergency-info') || document.body;
        container.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 5000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.militaryUI = new MilitaryUI();
});

// Экспорт для использования в других модулях (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MilitaryUI;
}
