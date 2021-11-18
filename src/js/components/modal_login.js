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
import { removeModalListener, addModalListener } from './modal.js';

refs.formLog.addEventListener('submit', e => {
  e.preventDefault();
  addSpinner();
  const formData = new FormData(e.currentTarget);
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  signInUser(emailValue, passValue);
  clearInput(refs.formLog, 2);
  removeSpinner();
  addClass();
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
  addClass();
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
  }
}

// function close modal

function removeList() {
  window.removeEventListener('keydown', onCloseModal);
  addClass();
}

function onCloseModal(eve) {
  if (eve.code === 'Escape') {
    removeList();
  }
  return window.addEventListener('keydown', onCloseModal);
}

function addClass() {
  refs.singinModal.classList.add('modal-auth--hidden');
  removeListenerMouse();
}

// back sing Up

function backSingOut() {
  refs.singOutMod.classList.add('modal-singup--hidden');
  refs.singInMod.classList.remove('modal-singin--hidden');
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
  removeModalListener(refs.modalSinUP);
}

export function mouseUp() {
  refs.backModal.addEventListener('click', backSingOut);
  window.addEventListener('keydown', onCloseModal);
  addModalListener(refs.modalSinUP, closeEvents);
}
