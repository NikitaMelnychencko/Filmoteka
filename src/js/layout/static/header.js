import { before, has, remove } from 'lodash';
// import buttonHeader from '../../../views/partials/header_my_lib.hbs';
// import modalWindow from '../../../views/partials/modal_wind.hbs';

const refs = {
  headBtn: document.querySelector('.header__button'),
  clicMyLib: document.querySelectorAll('.nav__list'),
  removeSerch: document.querySelector('.header-form'),
  bodymodal: document.querySelector('.js-backdrop'),
  closeModalBnt: document.querySelector('[data-action="close-modal"]'),
};

var a = document.querySelectorAll('.nav__title li a');
for (var i = 0, length = a.length; i < length; i++) {
  a[i].onclick = function () {
    var b = document.querySelector('.nav__title li.nav__current');
    if (b) b.classList.remove('nav__current');
    this.parentNode.classList.add('nav__current');
  };
}

refs.clicMyLib.forEach(list => {
  list.addEventListener('click', function (eve) {
    eve.preventDefault();
    if (eve.target.textContent == 'my library') {
      refs.removeSerch.classList.add('hidden');
      refs.headBtn.classList.remove('hidden');
    } else if (eve.target.textContent == 'home') {
      refs.headBtn.classList.add('hidden');
      refs.removeSerch.classList.remove('hidden');
    } else if (eve.target.textContent !== 'login') {
      // Передать функцию модального окна авторизации

      console.log('Open modal Auteri');
    }
  });
});

// function appendfotoTpl(articles) {
//   refs.headBtn.insertAdjacentHTML('beforeend', buttonHeader(articles));
// }

// function removefotoTpl(event) {
//   refs.headBtn.remove(buttonHeader(event));
// }
// eve.preventDefault()

// Модальное окно
// function onOpenModal(event) {
//   window.addEventListener('keydown', closeEsc);
//   refs.bodymodal.insertAdjacentHTML('beforeend', modalWindow(event));
//   console.log('Modal');
// }
// function onCloseModal() {
//   window.removeEventListener('keydown', closeEsc);
//   document.body.classList.remove('show-modal');
// }

// function mouseCloseMOdal(event) {
//   if (event.currentTarget === event.target) {
//     onCloseModal();
//   }
// }

// function closeEsc(event) {
//   console.log(event.currentTarget);
//   if (event.code === 'Escape') {
//     onCloseModal();
//   }
// }
