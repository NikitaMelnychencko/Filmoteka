// import { refs } from '../refs/refs';
// import modal_markup from '../../views/components/modal.hbs';
import { renderBackdrop, closeBackdrop } from './backdrop';
// import svg from '../../images/svg/sprite.svg';
// console.log(svg);
// refs.modal.insertAdjacentHTML('beforeend', modal_markup({ svg }));
// console.log(svg);

const refsModal = {
  modalClose: document.querySelector('.modal'),
  modal_content: document.querySelector('.modal__content'),
  buttonCloseModal: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.backdrop'),
};

export function modalMarkup(modalContent) {
  renderBackdrop();
  refsModal.modal_content.innerHTML = modalContent;
  refsModal.modalClose.classList.add('modal_is-open');
  modalAddListener();
}

function modalAddListener() {
  refsModal.buttonCloseModal.addEventListener('click', closeModal);
  window.addEventListener('keydown', modalCloseEcsKey);
  refsModal.backdrop.addEventListener('click', clickBackdropClose);
}

function modalCloseEcsKey(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function clickBackdropClose(evt) {
  if (evt.target === refsModal.backdrop) {
    closeModal();
  }
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal_is-open');
  modalRemoveListener();
  closeBackdrop();
}

function modalRemoveListener() {
  refsModal.buttonCloseModal.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', modalCloseEcsKey);
  refsModal.backdrop.removeEventListener('click', clickBackdropClose);
}

import meow from '../../views/partials/modal_one_movie.hbs';
modalMarkup(meow());
