import { renderBackdrop, closeBackdrop } from './backdrop';

let modalTimerId = null;

function refsModal() {
  const refsModalz = {
    modalClose: document.querySelector('.modal'),
    modal_content: document.querySelector('.modal__content'),
  };
  return refsModalz;
}

export function renderModal(modalContent) {
  renderBackdrop();
  refsModal().modal_content.innerHTML = modalContent;
  refsModal().modalClose.classList.add('modal_is-open');
  modalAddListener();
}

function modalAddListener() {
  refsModal().modalClose.addEventListener('click', buttonClose);
  window.addEventListener('keydown', modalCloseEcsKey);
}

function modalCloseEcsKey(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function buttonClose(evt) {
  if (
    evt.target.id === 'close-modal' ||
    evt.target.parentElement.id === 'close-modal' ||
    evt.target.parentElement.parentElement.id === 'close-modal'
  ) {
    return closeModal();
  }
  return;
}

export function closeModal() {
  modalTimerId = setTimeout(clearDelay, 250);
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal_is-open');
  modalRemoveListener();
  closeBackdrop();
  closeModalSignal();
}

function clearDelay() {
  refsModal().modal_content.innerHTML = '';
  clearTimeout(modalTimerId);
}

function modalRemoveListener() {
  refsModal().modalClose.removeEventListener('click', buttonClose);
  window.removeEventListener('keydown', modalCloseEcsKey);
}

export function closeModalSignal() {
  return;
}
// setTimeout(e => renderModal('TEST'), 200); //test
