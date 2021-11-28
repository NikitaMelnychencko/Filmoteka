import { renderBackdrop, closeBackdrop } from './backdrop';
let modalTimerId = null;

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
  bodyFixPosition()
  modalAddListener();
}

export function modalAddListener() {
  window.addEventListener('keydown', modalCloseEcsKey);
  addModalListener(refsModal().modalClose, buttonClose);
}

function modalCloseEcsKey(evt) {
  if (evt.code === 'Escape') {
    bodyUnfixPosition()
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
    return (bodyUnfixPosition(),closeModal());
  }
  return;
};

export const closeModal = function () {
  modalTimerId = setTimeout(clearDelay, 250);
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal_is-open');
  modalRemoveListener();
  removeModalListener(refsModal().modalClose);
  closeBackdrop();
  closeModalSignal();
  bodyUnfixPosition()
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

  setTimeout( function() {
    if ( !document.body.hasAttribute('data-body-scroll-fix')) {
        
          let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
          document.body.setAttribute('data-body-scroll-fix', scrollPosition);
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.top = '-' + scrollPosition + 'px';
          document.body.style.left = '0';
          document.body.style.width = '100%';

    }
    if(hasScrollbar()){
      document.body.style.width = `calc(100% - ${getScrollbarSize()}px)`;

    }
   

  }, 15 );

}

function getScrollbarSize() { // получение ширины скролла
  console.log('object');
  let outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);

  let widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = 'scroll';

  // add innerdiv
  let inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  let widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}



function hasScrollbar() { // проверка на боковой скролл
  return document.body.scrollHeight = document.body.clientHeight;
}

function bodyUnfixPosition() {

  if ( document.body.hasAttribute('data-body-scroll-fix') ) {
    let scrollPosition = document.body.getAttribute('data-body-scroll-fix');

    document.body.removeAttribute('data-body-scroll-fix');

    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    window.scroll(0, scrollPosition);
  }
}