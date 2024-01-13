let buttonClose = document.querySelector('.modal__button-close');
let modal = document.querySelector('.modal');
let modalWindow = document.querySelector('.modal__container')
let buttonLogin = document.querySelector('.user-list__login');

buttonClose.addEventListener('click', function() {
  modal.classList.toggle('modal_open');
});

buttonLogin.addEventListener('click', function() {
  modal.classList.toggle('modal_open');
});

modal.addEventListener("mouseup", function(event) {
  if (!modalWindow.contains(event.target)) {
    modal.classList.remove('modal_open');
  }
});
