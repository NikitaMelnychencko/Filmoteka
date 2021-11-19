import {
  regUser,
  signInUser,
  AuthState,
  updateInUser,
  user,
} from './appFirebase';
import { refs } from '../refs/refs.js';
import { addSpinner, removeSpinner } from './spinner';
import {
  removeModalListener,
  addModalListener,
  modalAddListener,
} from './modal.js';
import { stopScroll, restoreScroll } from './scroll';
refs.formLog.addEventListener('submit', e => {
  e.preventDefault();
  addSpinner();
  const formData = new FormData(e.currentTarget);
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  signInUser(emailValue, passValue);
  clearInput(refs.formLog, 2);
  removeSpinner();
});

refs.formReg.addEventListener('submit', e => {
  e.preventDefault();
  addSpinner();
  const formData = new FormData(e.currentTarget);
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  const nameValue = formData.get('name');
  regUser(emailValue, passValue);
  updateInUser(nameValue);
  AuthState(user);
  clearInput(refs.formReg, 3);
  removeSpinner();
});

function clearInput(ref, number) {
  for (let i = 0; i < number; i++) {
    ref.children[i].children[1].value = '';
  }
}

// function for render sing up sing in
refs.singUP.addEventListener('click', openSinUp)

function openSinUp(eve) {
  const item = eve.target.textContent.trim();
  if (item === 'Sign up Now') {
    refs.singOutMod.classList.remove('modal-singup--hidden');
    refs.singInMod.classList.add('modal-singin--hidden');
    refs.modalSinUpError.classList.add('modal__error--hidden');
  }
}

// function close modal
window.addEventListener('keydown', onCloseModal);

function removeList() {
  window.removeEventListener('keydown', onCloseModal);
  addClass();
}

function onCloseModal(eve) {
  if (eve.code === 'Escape') {
    removeList();
    backSingOut();
  }
  return window.addEventListener('keydown', onCloseModal);
}

export function addClass() {
  refs.singinModal.classList.add('modal-auth--hidden');
  refs.singOutMod.classList.add('modal-singup--hidden');
  refs.singInMod.classList.remove('modal-singin--hidden');
  refs.modalSinUpError.classList.remove('modal__error--hidden');
  
  removeListenerMouse();

  if (document.querySelector('.modal-one-movie') === null) {
    restoreScroll();
  } else if (document.querySelector('.modal-one-movie') !== null) {
    modalAddListener();
  }
}

// back sing Up

function backSingOut() {
  toggleModalVisibility(
    refs.singOutMod,
    refs.singInMod,
    'modal-singup--hidden',
    'modal-singin--hidden',
  );
}

export function logOutModalIsVisible(logOutFunction) {
  toggleModalVisibility(
    refs.singInMod,
    refs.modalLogOut,
    'modal-singin--hidden',
    'modal-logout--hidden',
  );
  refs.btnLogOutYes.addEventListener('click', e => {
    logOutFunction();
    addClass();
    toggleModalVisibility(
      refs.modalLogOut,
      refs.singInMod,
      'modal-logout--hidden',
      'modal-singin--hidden',
    );
  });
  refs.btnLogOutNo.addEventListener('click', addClass);
}

function toggleModalVisibility(elFirst, elSecond, addClass, removeClass) {
  elFirst.classList.add(addClass);
  elSecond.classList.remove(removeClass);
}

const closeEvents = function (e) {
  if (
    e.target.className === 'backdrop-sing' ||
    e.target.className === 'cl-btn-mod-txt'
  ) {
    addClass();
  }
};

function removeListenerMouse() {
  if (document.querySelector('.modal-one-movie') === null) {
    removeModalListener(refs.modalSinUP);
  }
}

export function mouseUp() {
  refs.backModal.addEventListener('click', backSingOut);
  window.addEventListener('keydown', onCloseModal);
  addModalListener(refs.modalSinUP, closeEvents);
  stopScroll();
}
