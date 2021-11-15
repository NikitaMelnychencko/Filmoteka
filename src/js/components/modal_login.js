import {
  regUser,
  signInUser,
  AuthState,
  updateInUser,
  user,
} from './appFirebase';
import { refs } from '../refs/refs.js';
import { addSpinner,removeSpinner } from './spinner';


refs.formLog.addEventListener('submit', e => {
  e.preventDefault();
  addSpinner()
  const formData = new FormData(e.currentTarget)
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  signInUser(emailValue, passValue)
  clearInput(refs.formLog, 2)
  removeSpinner()
  addClass()
})

refs.formReg.addEventListener('submit', e => {
  e.preventDefault();
  addSpinner()
  const formData = new FormData(e.currentTarget)
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  const nameValue = formData.get('name');
  regUser(emailValue, passValue)
  updateInUser(nameValue)
  AuthState(user)
  clearInput(refs.formReg, 3)
  removeSpinner()
  addClass()
})


function clearInput(ref,number) {
  for (let i = 0; i < number; i++) { 
    ref.children[i].children[1].value=''
  }
}

// function for render sing up sing in

refs.singUP.addEventListener('click', openSinUp);

function openSinUp(eve) {
  // eve.preventDefault();
  const item = eve.target.textContent.trim();
  console.log(item);
  if (item === 'Sign up Now') {
    refs.singOutMod.classList.remove('hidden');
    refs.singInMod.classList.add('hidden');
  }
}

// function close modal

window.addEventListener('keydown', onCloseModal);
window.addEventListener('click', mouseCloseMOdal);

function onCloseModal(eve) {
  const cli = eve.code;
  if (cli === 'Escape') {
    refs.sininModal.classList.add('hidden');
  }
}

function mouseCloseMOdal(event) {
  if (event.target.className === 'backdrop-sing'||event.target.className === 'cl-btn-mod-txt') {
    addClass()
  }
}
function addClass() {
  refs.sininModal.classList.add('hidden');
}
// back sing Up

refs.backModal.addEventListener('click', backSingOut);

function backSingOut(event) {
  const item = event;
  refs.singOutMod.classList.add('hidden');
  refs.singInMod.classList.remove('hidden');
}

