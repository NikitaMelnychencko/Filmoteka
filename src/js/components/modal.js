import { renderBackdrop, closeBackdrop } from './backdrop';

let modalTimerId = null;

function refsModal() {
  const refsModalz = {
    modalClose: document.querySelector('.modal'),
    modal_content: document.querySelector('.modal__content'),
    buttonCloseModal: document.querySelector("[data-action='close-modal']"),
    backdrop: document.querySelector('.backdrop'),
  };
  // console.log(refsModalz.buttonCloseModal);
  // console.log(refsModalz.closeBtn);
  return refsModalz;
}

export function renderModal(modalContent) {
  renderBackdrop();
  refsModal().modal_content.innerHTML = modalContent;
  refsModal().modalClose.classList.add('modal_is-open');
  modalAddListener();
}

function modalAddListener() {
  console.dir(refsModal().buttonCloseModal);
  refsModal().buttonCloseModal.addEventListener('click', ff);
  window.addEventListener('keydown', modalCloseEcsKey);
  refsModal().backdrop.addEventListener('click', clickBackdropClose);
}

function modalCloseEcsKey(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
refsModal().buttonCloseModal.onc;
function ff(evt) {
  console.log(evt);
  console.log('tatatat');
}

function clickBackdropClose(evt) {
  if (evt.target === refsModal().backdrop) {
    closeModal();
  }
}

function closeModal() {
  modalTimerId = setTimeout(clearDelay, 250);
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal_is-open');
  modalRemoveListener();
  closeBackdrop();
}

function clearDelay() {
  refsModal().modal_content.innerHTML = '';
  clearTimeout(modalTimerId);
}

function modalRemoveListener() {
  refsModal().buttonCloseModal.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', modalCloseEcsKey);
  refsModal().backdrop.removeEventListener('click', clickBackdropClose);
}

// setTimeout(e => renderModal('TEST'), 200); //test
