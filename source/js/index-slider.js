// Для первого слайдера:
const slider1List = document.querySelector('.slider1 .slider__list');
const slider1Items = document.querySelectorAll('.slider1 .slider__item');
const slider1Toggles = document.querySelectorAll('.slider1 .slider__toggle');

// Обрабатываем переключение слайдов по кнопкам
slider1Toggles.forEach(function(toggle, index) {
  toggle.addEventListener('click', function(evt) {
    evt.preventDefault();
    // Убираем класс слайдера у всех элементов списка
    slider1Items.forEach(function(item) {
      item.classList.remove('slider__item_current');
    });
    // Добавляем класс слайдера элементу, соответствующему нажатой кнопке
    slider1Items[index].classList.add('slider__item_current');
    // Убираем класс текущей кнопки у всех переключателей
    slider1Toggles.forEach(function(toggle) {
      toggle.classList.remove('slider__toggle_current');
    });
    // Добавляем класс текущей кнопки нажатой кнопке
    toggle.classList.add('slider__toggle_current');
  });
});

// Для второго слайдера:
const slider2List = document.querySelector('.slider2 .slider__list');
const slider2Items = document.querySelectorAll('.slider2 .slider__item');
const slider2Toggles = document.querySelectorAll('.slider2 .slider__toggle');
const slider2Buttons = document.querySelectorAll('.slider2 .slider__button');

// Обрабатываем переключение слайдов по кнопкам
slider2Toggles.forEach(function(toggle, index) {
  toggle.addEventListener('click', function(evt) {
    evt.preventDefault();
    // Убираем класс слайдера у всех элементов списка
    slider2Items.forEach(function(item) {
      item.classList.remove('slider__item_current');
    });
    // Добавляем класс слайдера элементу, соответствующему нажатой кнопке
    slider2Items[index].classList.add('slider__item_current');
    // Убираем класс текущей кнопки у всех переключателей
    slider2Toggles.forEach(function(toggle) {
      toggle.classList.remove('slider__toggle_current');
    });
    // Добавляем класс текущей кнопки нажатой кнопке
    toggle.classList.add('slider__toggle_current');
  });
});

const prevButton = document.querySelector('.slider2 .slider__button_prev');
const nextButton = document.querySelector('.slider2 .slider__button_next');
let currentSlideIndex = 0;

// Обработчик клика на кнопку "Вправо"
nextButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (currentSlideIndex < slider2Items.length - 1) {
    currentSlideIndex++;
  } else {
    currentSlideIndex = 0;
  }
  changeSlide();
});

// Обработчик клика на кнопку "Влево"
prevButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = slider2Items.length - 1;
  }
  changeSlide();
});

// Функция изменения слайда и переключателей
function changeSlide() {
slider2Items.forEach(function(item) {
  item.classList.remove('slider__item_current');
});
slider2Items[currentSlideIndex].classList.add('slider__item_current');
slider2Toggles.forEach(function(toggle) {
  toggle.classList.remove('slider__toggle_current');
});
  slider2Toggles[currentSlideIndex].classList.add('slider__toggle_current');
}
