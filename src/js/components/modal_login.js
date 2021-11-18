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
  }
}

// function close modal
refs.singinModal.addEventListener('click', mouseCloseMOdal);
window.addEventListener('keydown', onCloseModal);

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
refs.modalSinInOpen.addEventListener('moseup', mouseUp);

function mouseUp(e) {
  if (
    e.target.className === 'backdrop-sing' ||
    e.target.className === 'cl-btn-mod-txt'
  ) {
    console.log(e.target);
    // refs.singinModal.classList.remove('modal-auth--hidden');
  }
}

function mouseCloseMOdal(event) {
  if (
    event.target.className === 'backdrop-sing' ||
    event.target.className === 'cl-btn-mod-txt'
  ) {
    return addClass();
  }

  return;
}

export function addClass() {
  refs.singinModal.classList.add('modal-auth--hidden');
}

// back sing Up
refs.backModal.addEventListener('click', backSingOut);

function backSingOut() {
  refs.singOutMod.classList.add('modal-singup--hidden');
  refs.singInMod.classList.remove('modal-singin--hidden');
}
