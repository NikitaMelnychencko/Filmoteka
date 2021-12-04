import { renderBackdrop, closeBackdrop } from './backdrop';
let modalTimerId = null;
import { getBrowserId } from '../components/scroll';

const refsModal = function () {
  return {
    modalClose: document.querySelector('.modal'),
    modal_content: document.querySelector('.modal__content'),
  };
};

export function renderModal(modalContent) {
  renderBackdrop();
  refsModal().modal_content.innerHTML = modalContent;
  refsModal().modalClose.classList.add('modal_is-open');

  bodyFixPosition();
  modalAddListener();
}

export function modalAddListener() {
  window.addEventListener('keydown', modalCloseEcsKey);
  addModalListener(refsModal().modalClose, buttonClose);
}

function modalCloseEcsKey(evt) {
  if (evt.code === 'Escape') {
    bodyUnfixPosition();
    closeModal();
  }
}

const buttonClose = function (evt) {
  if (
    evt.target.id === 'close-modal' ||
    evt.target.parentElement.id === 'close-modal' ||
    evt.target.parentElement.parentElement.id === 'close-modal' ||
    evt.target.id === 'backdrop'
  ) {
    return bodyUnfixPosition(), closeModal();
  }
  return;
};

export const closeModal = function () {
  modalTimerId = setTimeout(clearDelay, 250);
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal_is-open');
  bodyUnfixPosition();
  modalRemoveListener();
  removeModalListener(refsModal().modalClose);
  closeBackdrop();
  closeModalSignal();
  localStorage.removeItem('idFilm');
  localStorage.removeItem('marcupFilm');
};

function clearDelay() {
  refsModal().modal_content.innerHTML = '';
  clearTimeout(modalTimerId);
}

function modalRemoveListener() {
  window.removeEventListener('keydown', modalCloseEcsKey);
}

export function closeModalSignal() {
  return;
}

export function removeModalListener(modalrefs) {
  modalrefs.onmouseleave = null;
  document.onmousedown = null;
  document.onmouseup = null;
}

export function addModalListener(modalrefs, callback) {
  document.onmousedown = function (e) {
    document.onmouseup = function (e) {
      callback(e);
    };
    modalrefs.onmouseleave = function () {
      document.onmouseup = null;
    };
    document.onmouseup = function (e) {
      callback(e);
    };
  };
}

function bodyFixPosition() {
  if (getBrowserId() === 2) {
    if (!document.body.hasAttribute('data-body-scroll-fix')) {
      let scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute('data-body-scroll-fix', scrollPosition);
      removeStyle('hidden', 'fixed', `-${scrollPosition}px`, '100%');
      document.documentElement.classList.remove('scrollRem');
    }
  }
}

function bodyUnfixPosition() {
  if (document.body.hasAttribute('data-body-scroll-fix')) {
    let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
    document.body.removeAttribute('data-body-scroll-fix');
    removeStyle('', '', '', '');
    document.documentElement.classList.add('scrollRem');
    window.scroll(0, scrollPosition);
  }
}

function removeStyle(overflow, position, top, width) {
  document.body.style.overflow = overflow;
  document.body.style.position = position;
  document.body.style.top = top;
  document.body.style.width = width;
}
