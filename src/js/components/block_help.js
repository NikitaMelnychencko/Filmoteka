import scrollTo from './scroll_too';
import { renderThemeModal } from '../layout/modal_theme';
export function blockhelpOpen() {
  const PROMPT_DELAY = 30000;
  const MAX_PROMPT_ATTEMPTS = 3;
  let promptCounter = 0;
  let hasSubscribed = false;
  const storageKey = 'user email';

  const buttonHelp = document.querySelectorAll('.help__button');
  const buttonScroll = document.querySelector('.button-scroll');
  const buttonSettings = document.querySelector('#modal-settings');
  const openHelpModalBtn = document.querySelector('.button-subscribe');
  const subscribeModal = document.querySelector('.help__modal');
  const btnCloseModal = subscribeModal.querySelector(
    '.help__button-close-modal',
  );
  const subscribeForm = subscribeModal.querySelector('.client-mail__form');
  const mailInput = subscribeForm.querySelector('.client-mail__input');
  const thanksNotification = document.querySelector('.help__thanks');

  buttonHelp.forEach(button => {
    const buttonHint = button.querySelector('.help__button-hint');
    button.addEventListener('mouseover', () => {
      elementIsVisible(buttonHint);
    });
    button.addEventListener('mouseout', () => {
      elementIsHidden(buttonHint);
    });
  });

  buttonSettings.addEventListener('click', renderThemeModal);
  openHelpModalBtn.addEventListener('click', onOpenModalBtnClick);
  autoOpenModal();

  function onOpenModalBtnClick(event) {
    openModal();
  }
  function onBtnCloseModal(event) {
    closeModal();
    autoOpenModal();
  }
  function openModal() {
    subscribeModal.classList.add('isActive');
    btnCloseModal.addEventListener('click', onBtnCloseModal);
    subscribeForm.addEventListener('submit', onSubscribe);
    mailInput.value = localStorage.getItem(storageKey);

    subscribeForm.addEventListener('input', event => {
      localStorage.setItem(storageKey, mailInput.value);
    });
  }
  function closeModal() {
    subscribeModal.classList.remove('isActive');
  }

  function onSubscribe(event) {
    event.preventDefault();
    hasSubscribed = true;
    closeModal();
    elementIsVisible(thanksNotification);
    setTimeout(() => {
      elementIsHidden(thanksNotification);
    }, 5000);
  }
  function autoOpenModal() {
    if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
      console.log('Максимальное кол-во надоеданий или подписался');

      return;
    }

    const timerId = setTimeout(() => {
      console.log('Открываем надоедалку');
      openModal();
      promptCounter += 1;
      console.log(
        '🚀 ~ file: block_help.js ~ line 76 ~ setInterval ~ promptCounter',
        promptCounter,
      );
    }, PROMPT_DELAY);
  }

  function btnScrollIsVisible() {
    setInterval(() => {
      if (window.pageYOffset > 400) {
        elementIsVisible(buttonScroll);
        buttonScroll.addEventListener('click', scrollTo);
      } else {
        elementIsHidden(buttonScroll);
        buttonScroll.removeEventListener('click', scrollTo);
      }
    }, 1000);
  }
  btnScrollIsVisible();

  function elementIsVisible(element) {
    element.classList.add('is-visible');
  }
  function elementIsHidden(element) {
    element.classList.remove('is-visible');
  }
}
