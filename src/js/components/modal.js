import { refs } from '../refs/refs';
import modal_markup from '../../views/components/modal.hbs';
import { renderBackdrop, closeBackdrop } from './backdrop';
import svg from '../../images/svg/sprite.svg';
console.log(svg);
refs.modal.insertAdjacentHTML('beforeend', modal_markup({ svg }));
console.log(svg);

const refsModal = {
  modalClose: document.querySelector('.modal'),
  modal_content: document.querySelector('.modal__content'),
  buttonCloseModal: document.querySelector('[data-action="close-modal"]'),
};

export function modalMarkup(modalContent) {
  renderBackdrop();
  refsModal.modal_content.innerHTML = modalContent;
  refsModal.modalClose.classList.add('modal_is-open');
  modalAddListener();
}

function modalAddListener() {
  const backdropClose = document.querySelector('.backdrop');
  refsModal.buttonCloseModal.addEventListener('click', closeModal);
  window.addEventListener('keydown', modalCloseEcsKey);
  backdropClose.addEventListener('click', closeModal);
}

function modalCloseEcsKey(evt) {
  if (evt.code === 'Escape') {
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
  const backdropClose = document.querySelector('.backdrop');
  refsModal.buttonCloseModal.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', modalCloseEcsKey);
  backdropClose.removeEventListener('click', closeModal);
}
modalMarkup();
