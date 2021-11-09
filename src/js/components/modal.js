import { renderBackdrop, closeBackdrop } from './backdrop';

const refsModal = {
  modalClose: document.querySelector('.modal'),
  modal_content: document.querySelector('.modal__content'),
  buttonCloseModal: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.backdrop'),
};

export function renderModal(modalContent) {
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
  refsModal.modal_content.innerHTML = '';
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

// setTimeout(e => renderModal('TEST'), 200); //test
