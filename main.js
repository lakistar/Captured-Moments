document.addEventListener('DOMContentLoaded', () => {
    // --- Плавне прокручування ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; // Висота хедера
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Закрити бургер-меню після кліку на мобільному
                if (window.innerWidth <= 768 && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    burgerMenu.classList.remove('open');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });


    // --- Фільтрація Портфоліо ---
    const categoryButtons = document.querySelectorAll('.category-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;

            // Створимо масив для елементів, які треба показати/приховати
            const itemsToShow = [];
            const itemsToHide = [];

            portfolioItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    itemsToShow.push(item);
                } else {
                    itemsToHide.push(item);
                }
            });

            // Анімація приховування
            itemsToHide.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300); // Час збігається з CSS transition
            });

            // Анімація показу
            setTimeout(() => { // Даємо час прихованим елементам зникнути
                itemsToShow.forEach(item => {
                    item.style.display = 'block';
                    // Trigger reflow, щоб анімація спрацювала знову
                    item.offsetWidth;
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                });
            }, 300);
        });
    });


    // --- Анімація елементів при прокрутці (Intersection Observer API) ---
    const animatedElements = document.querySelectorAll('.common-section, .portfolio-item, .service-card, .contact-form-wrapper, .contact-info');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% елемента має бути видимим
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.classList.add('fade-in-on-scroll'); // Додати базовий клас
        observer.observe(element);
    });

    // --- Ефект паралаксу (легкий рух зображень при прокрутці) ---
    // Це базовий приклад, для складнішого паралаксу потрібні бібліотеки або більш комплексний JS
    const parallaxElements = document.querySelectorAll('.parallax-element');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.08; // Налаштуйте швидкість руху
            const yOffset = window.pageYOffset;
            const transformValue = `translateY(${yOffset * speed}px)`;
            element.style.transform = transformValue;
        });
    });
});
