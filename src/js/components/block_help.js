import { refs } from '../refs/refs';
import blockHelpTemplate from '../../views/components/block_help.hbs';
import scrollTo from './scroll_too';
import sprite from '../../images/svg/sprite.svg'

const { main } = refs;
const PROMPT_DELAY = 3000;
const MAX_PROMPT_ATTEMPTS = 3;
let promptCounter = 0;
let hasSubscribed = false;
const storageKey = 'user email';

main.insertAdjacentHTML('beforeend', blockHelpTemplate({sprite}));
const buttonHelp = document.querySelectorAll('.help__button');
const buttonScroll = document.querySelector('.button-scroll');
const openHelpModalBtn = document.querySelector('.button-subscribe');
const subscribeModal = document.querySelector('.help__modal');
const btnCloseModal = subscribeModal.querySelector('.help__button-close-modal');
const subscribeForm = subscribeModal.querySelector('.client-mail__form');
const mailInput = subscribeForm.querySelector('.client-mail__input')
const thanksNotification = document.querySelector('.help__thanks')

buttonHelp.forEach(button => {
    const buttonHint = button.querySelector('.help__button-hint');
    button.addEventListener('mouseover', () => {
        buttonHint.classList.add('is-visible')
    })
    button.addEventListener('mouseout', () => {
        buttonHint.classList.remove('is-visible')
    }) 
})



openHelpModalBtn.addEventListener('click', onOpenModalBtnClick)
autoOpenModal()

function onOpenModalBtnClick(event) {
    openModal()   
}
function onBtnCloseModal(event) {
    closeModal();
    autoOpenModal();
}
function openModal() {
  subscribeModal.classList.add('isActive');
  btnCloseModal.addEventListener('click', onBtnCloseModal);
    subscribeForm.addEventListener('submit', onSubscribe);
    mailInput.value = localStorage.getItem(storageKey)
    
    subscribeForm.addEventListener('input', (event) => {
        
        localStorage.setItem(storageKey, mailInput.value);
    })
}
function closeModal() {
     subscribeModal.classList.remove('isActive');
}

function onSubscribe(event) {
    event.preventDefault();
    hasSubscribed = true;
    closeModal();
    thanksNotification.classList.add('is-visible');
    setTimeout(() => { thanksNotification.classList.remove('is-visible') }, 5000)
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
    console.log("🚀 ~ file: block_help.js ~ line 76 ~ setInterval ~ promptCounter", promptCounter)
  }, PROMPT_DELAY);
}

function btnScrollIsVisible(){
    setInterval(() => {
        if (window.pageYOffset > 400) {
            buttonScroll.classList.add('is-visible');
            buttonScroll.addEventListener('click', scrollTo);
        }
        else{
            buttonScroll.classList.remove('is-visible');
            buttonScroll.removeEventListener('click', scrollTo);
        }
    }, 1000
    )
    
}
btnScrollIsVisible()