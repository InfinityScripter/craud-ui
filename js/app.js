document.addEventListener('DOMContentLoaded', function () {
  // Плавный скролл для кнопок с data-target
  const buttons = document.querySelectorAll('button[data-target]');
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const targetId = button.getAttribute('data-target');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Функция для анимации строк
  function animateLine(lineSelector, lineListSelector) {
    const line = document.querySelector(lineSelector);
    const lineList = document.querySelector(lineListSelector);
    const listWidth = lineList.scrollWidth;

    // Клонируем список для создания эффекта непрерывности
    const cloneList = lineList.cloneNode(true);
    line.appendChild(cloneList);

    let position = 0;

    function animate() {
      position -= 1; // Скорость движения
      if (position <= -listWidth) {
        position = 0; // Возвращаемся в исходное положение
      }
      lineList.style.transform = `translateX(${position}px)`;
      cloneList.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  }

  // Запускаем анимацию для обеих строк
  animateLine('.line', '.line-list');
  animateLine('.line-two', '.line-list-two');

  // Карусель партнёров
  (function() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.partner-block-card');
    const totalSlides = slides.length;
    const container = document.querySelector('.partner-block');
    let visibleSlidesCount = 3;

    // Определяем количество видимых слайдов на основе ширины контейнера
    const containerWidth = container.offsetWidth;
    if (containerWidth <= 400) {
      visibleSlidesCount = 1;
    } else if (containerWidth <= 1200) {
      visibleSlidesCount = 2;
    }

    const slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(slides[0]).marginRight);
    let currentSlide = 0;
    let slideInterval;

    function updateSlideNumber() {
      const slideNumber = currentSlide + visibleSlidesCount;
      const slideNumberText = `${slideNumber} <span>/ ${totalSlides}</span>`;
      document.querySelector('.title-number p').innerHTML = slideNumberText;
      document.querySelector('.title-number-mobile p').innerHTML = slideNumberText;
    }

    function updateSlidePosition() {
      const newTransformValue = -currentSlide * slideWidth;
      wrapper.style.transform = `translateX(${newTransformValue}px)`;
      updateSlideNumber();
    }

    function prevSlide() {
      currentSlide = (currentSlide === 0) ? totalSlides - visibleSlidesCount : currentSlide - 1;
      updateSlidePosition();
      resetSlideInterval();
    }

    function nextSlide() {
      currentSlide = (currentSlide >= totalSlides - visibleSlidesCount) ? 0 : currentSlide + 1;
      updateSlidePosition();
      resetSlideInterval();
    }

    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 4000);
    }

    function resetSlideInterval() {
      clearInterval(slideInterval);
      startSlideInterval();
    }

    // Добавляем обработчики событий для кнопок карусели
    const prevButtons = document.querySelectorAll('.carousel-prev, .carousel-prevTwo');
    const nextButtons = document.querySelectorAll('.carousel-next, .carousel-nextTwo');

    prevButtons.forEach(button => button.addEventListener('click', prevSlide));
    nextButtons.forEach(button => button.addEventListener('click', nextSlide));

    // Запуск автоматической смены слайдов
    startSlideInterval();
  })();

  // Мобильная карусель информации о карточках
  (function() {
    const slides = document.querySelectorAll('.card-info-mobile');
    const prevButton = document.querySelector('.carousel-prevThree');
    const nextButton = document.querySelector('.carousel-nextThree');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function updateCarousel() {
      // Скрываем все слайды, кроме текущего
      slides.forEach((slide, index) => {
        slide.style.display = index === currentIndex ? 'block' : 'none';
      });

      // Обновляем индикаторы
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('indicator-active', index === currentIndex);
      });

      // Блокируем или разблокируем кнопки в зависимости от текущего индекса
      prevButton.classList.toggle('button-disabled', currentIndex === 0);
      nextButton.classList.toggle('button-disabled', currentIndex === slides.length - 1);
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Инициализация карусели на первом слайде
    updateCarousel();
  })();

});
