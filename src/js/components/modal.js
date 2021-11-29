import { renderBackdrop, closeBackdrop } from './backdrop';
let modalTimerId = null;

const refsModal = function () {
  return {
    modalClose: document.querySelector('.modal'),
    modal_content: document.querySelector('.modal__content'),
    body: document.querySelector('body'),
    allHtml: document.querySelector('html body'),
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

// function bodyFixPosition() {
//   setTimeout(function () {
//     if (!document.body.hasAttribute('data-body__scroll-fix')) {
//       let scrollPosition =
//         window.pageYOffset || document.documentElement.scrollTop;
//       refsModal().body.setAttribute('data-body__scroll-fix', scrollPosition);
//       refsModal().body.style.overflow = 'scroll';
//       refsModal().body.style.position = 'fixed';
//       refsModal().body.style.top = '-' + scrollPosition + 'px';
//     }
//   }, 15);
//   if (hasScrollbar()) {
//     // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
//     refsModal().body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
//     // refsModal().body.classList.add('no-scroll');
//     console.log(refsModal().body.style.width);
//   } else {
//     console.log('object');
//     refsModal().body.style.width = '100%';
//   }
// }

// function getScrollbarSize() {
//   // получение ширины скролла
//   const outer = document.createElement('div');
//   outer.style.visibility = 'hidden';
//   outer.style.width = '100%';
//   outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
//   document.body.appendChild(outer);

//   let widthNoScroll = outer.offsetWidth;
//   // force scrollbars
//   outer.style.overflow = 'scroll';

//   // add innerdiv
//   let inner = document.createElement('div');
//   inner.style.width = '100%';
//   outer.appendChild(inner);
//   let widthWithScroll = inner.offsetWidth;

//   // remove divs
//   outer.parentNode.removeChild(outer);
//   return widthNoScroll - widthWithScroll;
// }

// function hasScrollbar() {
//   // проверка на боковой скролл
//   console.log(
//     document.body.scrollHeight > document.documentElement.clientHeight,
//   );

//   return document.body.scrollHeight > document.body.clientHeight;
// }

// function bodyUnfixPosition() {
//   if (document.body.hasAttribute('data-body__scroll-fix')) {
//     let scrollPosition = document.body.getAttribute('data-body__scroll-fix');
//     document.body.removeAttribute('data-body__scroll-fix');
//     refsModal().body.style.overflow = '';
//     refsModal().body.style.position = '';
//     refsModal().body.style.width = '';
//     refsModal().body.style.top = '';

//     window.scroll(0, scrollPosition);
//   }
// }

// 1. Фиксация <body>

function bodyFixPosition() {
  setTimeout(function () {
    /* Ставим необходимую задержку, чтобы не было «конфликта» в случае, если функция фиксации вызывается сразу после расфиксации (расфиксация отменяет действия расфиксации из-за одновременного действия) */

    if (!document.body.hasAttribute('data-body-scroll-fix')) {
      // Получаем позицию прокрутки
      let scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      // Ставим нужные стили
      document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollPosition + 'px';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      refsModal().allHtml.style.right = '0';
    }
  }, 15); /* Можно задержку ещё меньше, но у меня работало хорошо именно с этим значением на всех устройствах и браузерах */
}

// 2. Расфиксация <body>
function bodyUnfixPosition() {
  if (document.body.hasAttribute('data-body-scroll-fix')) {
    // Получаем позицию прокрутки из атрибута
    let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
    // Удаляем атрибут
    document.body.removeAttribute('data-body-scroll-fix');

    // Удаляем ненужные стили
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.overflowY = '';

    // Прокручиваем страницу на полученное из атрибута значение
    window.scroll(0, scrollPosition);
  }
}
