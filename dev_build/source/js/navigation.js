let navigationMain = document.querySelector('.main-navigation');
let navigationToggle = document.querySelector('.main-navigation__toggle');

navigationMain.classList.remove('main-navigation_nojs');

navigationToggle.addEventListener('click', function() {
  if (navigationMain.classList.contains('main-navigation_closed')) {
    navigationMain.classList.remove('main-navigation_closed');
    navigationMain.classList.add('main-navigation_opened');
  } else {
    navigationMain.classList.add('main-navigation_closed');
    navigationMain.classList.remove('main-navigation_opened');
  }
});
