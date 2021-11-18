import {
  regUser,
  signInUser,
  AuthState,
  updateInUser,
  user,
} from './appFirebase';
import { refs } from '../refs/refs.js';
import { addSpinner, removeSpinner } from './spinner';
import { compile } from 'handlebars';
import { ref } from '@firebase/database';

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

refs.singUP.addEventListener('click', openSinUp);

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

function removeListenerMouse() {
  document.onmousedown = null;
  document.onmouseup = null;
  refs.modalSinUP.onmouseleave = null;
}
export function mouseUp() {
  document.onmousedown = function () {
    refs.modalSinUP.onmouseleave = function () {
      document.onmouseup = null;
    };
    document.onmouseup = function (e) {
      if (
        e.target.className === 'backdrop-sing' ||
        e.target.className === 'cl-btn-mod-txt'
      ) {
        {
          
          addClass();
          backSingOut();
        }
      }
    };
  };
}

export function addClass() {
  refs.singinModal.classList.add('modal-auth--hidden');
  removeListenerMouse();
}

// back sing Up
refs.backModal.addEventListener('click', backSingOut);

function backSingOut() {
  refs.singOutMod.classList.add('modal-singup--hidden');
  refs.singInMod.classList.remove('modal-singin--hidden');
}
