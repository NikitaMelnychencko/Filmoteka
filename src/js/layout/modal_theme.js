import modal_theme from '../../views/partials/modal_theme.hbs';
import { renderModal } from '../components/modal';
import { palitre, defaultAccent, saveAccent } from './palitre';
import { darkTheme, defaultTheme } from './dark-theme';
const modalThemeContent = modal_theme(); //need insert object with movie detail //test

setTimeout(e => {
  renderModal(modalThemeContent);
  initModalTheme();
}, 100);

setTheme();

function initModalTheme() {
  darkTheme();
  palitre();
  setTheme();
  const modalTheme = document.querySelector('.modal-theme');
  modalTheme.addEventListener('click', modalThemeButtons);
}

function modalThemeButtons(evt) {
  if (evt.target.id === 'default-theme') {
    evt.preventDefault();
    defaultTheme();
    defaultAccent();
    setTheme();
    return;
  } else if (evt.target.id === 'apply-theme') {
    evt.preventDefault();
    saveAccent();
    setTheme();
    return;
  }
  saveAccent();
  setTheme();
  return;
}

function initDataAccent() {
  return JSON.parse(localStorage.getItem('colorAccent'));
}

function initDataTheme() {
  return JSON.parse(localStorage.getItem('darkTheme'));
}

function initAccent() {
  console.log(JSON.parse(localStorage.getItem('colorAccent')));
  const setColor = initDataAccent();
  if (initDataAccent() !== null && initDataAccent() !== undefined) {
    return `--button: hsl(${setColor.h}deg, ${setColor.s}%, ${setColor.l}%); --clear-accent-color: hsl(${setColor.h}deg, 100%, 50%)`;
  }
  return '';
}

export function setTheme() {
  const darkColor =
    '--background: #1D1D21; --primary-text-color: #ffffff; --footer-background: #232328; --third-text-color: #B8B8C6;';

  const accent = initAccent();
  if (initDataTheme() === 'dark') {
    document.documentElement.style.cssText = `${darkColor}${accent}`;
    return;
  }
  document.documentElement.style.cssText = `${accent}`;
  return;
}
