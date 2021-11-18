import scrollTo from './scroll_too';
import { renderThemeModal } from '../layout/modal_theme';

const PROMPT_DELAY = 30000;
const MAX_PROMPT_ATTEMPTS = 3;
let promptCounter = 0;
let hasSubscribed = false;
const storageKey = 'user email';

function getRefs() {
  const refs = {
 buttonHelp : document.querySelectorAll('.help__button'),
   buttonScroll : document.querySelector('.button-scroll'),
   buttonSettings : document.querySelector('#modal-settings'),
   openHelpModalBtn : document.querySelector('.button-subscribe'),
  subscribeModal : document.querySelector('.help__modal'),
   btnCloseModal : document.querySelector(
    '.help__button-close-modal',
  ),
   subscribeForm : document.querySelector('.client-mail__form'),
   mailInput : document.querySelector('.client-mail__input'),
   thanksNotification : document.querySelector('.help__thanks')
  }
  return refs;
}

export function blockhelpOpen() {
  btnHintIsVisible();
  getRefs().buttonSettings.addEventListener('click', renderThemeModal);
  getRefs().openHelpModalBtn.addEventListener('click', onOpenModalBtnClick);
  autoOpenModal();
 btnScrollIsVisible();
  
}

function btnHintIsVisible() {
   getRefs().buttonHelp.forEach(button => {
    const buttonHint = button.querySelector('.help__button-hint');
    button.addEventListener('mouseover', () => {
      elementIsVisible(buttonHint);
    });
    button.addEventListener('mouseout', () => {
      elementIsHidden(buttonHint);
    });
  });
}

function onOpenModalBtnClick(event) {
    openModal();
  }
  function onBtnCloseModal(event) {
    closeModal();
    autoOpenModal();
  }
  function openModal() {
    getRefs().subscribeModal.classList.add('isActive');
    getRefs().btnCloseModal.addEventListener('click', onBtnCloseModal);
    getRefs().subscribeForm.addEventListener('submit', onSubscribe);
    getRefs().mailInput.value = localStorage.getItem(storageKey);

    getRefs().subscribeForm.addEventListener('input', event => {
      localStorage.setItem(storageKey, getRefs().mailInput.value);
    });
  }
  function closeModal() {
    getRefs().subscribeModal.classList.remove('isActive');
  }

  function onSubscribe(event) {
    event.preventDefault();
    hasSubscribed = true;
    closeModal();
    elementIsVisible(getRefs().thanksNotification);
    setTimeout(() => {
      elementIsHidden(getRefs().thanksNotification);
    }, 5000);
  }
  function autoOpenModal() {
    if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
      return;
    }

    const timerId = setTimeout(() => {
      openModal();
      promptCounter += 1;
    }, PROMPT_DELAY);
  }

  function btnScrollIsVisible() {
    setInterval(() => {
      if (window.pageYOffset > 400) {
        elementIsVisible(getRefs().buttonScroll);
        getRefs().buttonScroll.addEventListener('click', scrollTo);
      } else {
        elementIsHidden(getRefs().buttonScroll);
        getRefs().buttonScroll.removeEventListener('click', scrollTo);
      }
    }, 1000);
  }
 

  function elementIsVisible(element) {
    element.classList.add('is-visible');
  }
  function elementIsHidden(element) {
    element.classList.remove('is-visible');
  }
