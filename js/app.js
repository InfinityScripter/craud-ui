document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('button[data-target]');
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const targetId = button.getAttribute('data-target');
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const line = document.querySelector('.line');
  const lineList = document.querySelector('.line-list');
  const listWidth = lineList.scrollWidth; // Ширина оригинального списка

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
});

document.addEventListener('DOMContentLoaded', function () {
  const line = document.querySelector('.line-two');
  const lineList = document.querySelector('.line-list-two');
  const listWidth = lineList.scrollWidth; // Ширина оригинального списка

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
});


document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.carousel-wrapper');
  const slides = document.querySelectorAll('.partner-block-card');
  const totalSlides = slides.length;
  let visibleSlidesCount = 0; // Количество видимых слайдов
  const container = document.querySelector('.partner-block');
  const slideWidth = slides[0].offsetWidth + parseFloat(window.getComputedStyle(slides[0]).marginRight);
  let currentSlide = 0;
  let slideInterval;




  if (container.offsetWidth <= 400) {
    visibleSlidesCount = 1;
  } else if (container.offsetWidth <= 1200) {
    visibleSlidesCount = 2;
  } else {
    visibleSlidesCount = 3; // Если ширина контейнера больше 1200px
  }
  console.log(visibleSlidesCount)
  // Функция для обновления номера текущего слайда
  function updateSlideNumber() {
    const slideNumber = currentSlide + visibleSlidesCount; // Номера слайдов начинаются с 1
    document.querySelector('.title-number p').innerHTML = `${slideNumber} <span>/ ${totalSlides}</span>`;
    document.querySelector('.title-number-mobile p').innerHTML = `${slideNumber} <span>/ ${totalSlides}</span>`;
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

  document.querySelector('.carousel-prev').addEventListener('click', prevSlide);
  document.querySelector('.carousel-next').addEventListener('click', nextSlide);

  document.querySelector('.carousel-prevTwo').addEventListener('click', prevSlide);
  document.querySelector('.carousel-nextTwo').addEventListener('click', nextSlide);

  // Запуск интервала переключения слайдов
  startSlideInterval();
});


document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.card-info-mobile');
  const prevButton = document.querySelector('.carousel-prevThree');
  const nextButton = document.querySelector('.carousel-nextThree');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;

  function updateCarousel() {
    // Скрываем все слайды и удаляем активные индикаторы
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? 'block' : 'none';
    });

    // Обновляем индикаторы
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('indicator-active', index === currentIndex);
    });

    // Блокируем/разблокируем кнопки в зависимости от текущего индекса
    if (currentIndex === 0) {
      prevButton.classList.add('button-disabled')
    } else {
      prevButton.classList.remove('button-disabled')
    }

    if (currentIndex === slides.length - 1) {
      nextButton.classList.add('button-disabled')
    } else {
      nextButton.classList.remove('button-disabled');
    }
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

  updateCarousel(); // Инициализация карусели на первом слайде
});
