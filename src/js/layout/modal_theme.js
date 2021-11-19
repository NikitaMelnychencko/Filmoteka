import modal_theme from '../../views/partials/modal_theme.hbs';
import { renderModal } from '../components/modal';
import { palitre, defaultAccent, saveAccent } from './palitre';
import { darkTheme, defaultTheme } from './dark-theme';
import { stopScroll } from '../components/scroll';
const modalThemeContent = modal_theme();

export function renderThemeModal() {
  renderModal(modalThemeContent);
  initModalTheme();
  stopScroll();
}

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
  const setColor = initDataAccent();
  if (initDataAccent() !== null && initDataAccent() !== undefined) {
    const accent = `hsl(${setColor.h}deg, ${setColor.s}%, ${setColor.l}%);`;
    return `--accent-color: ${accent}--selection-text-color: ${accent}--second-accent-btn-color: ${accent}--secondary-background-color: ${accent}--primary-svg-color: ${accent}--active-btn-color: ${accent}--spinner-primary-color: ${accent}--clear-accent-color: hsl(${setColor.h}deg, 100%, 50%);`;
  }
  return '';
}

function darkColors() {
  const setColor = initDataAccent();
  const defaultColors = 'hsl(25deg, 100%, 50%);';
  const darkzz =
    '--background: #1D1D21;--primary-text-color: #ffffff;--primary-title-text-color: #ffffff;--accent-btn-color: #ffffff;--fourth-background-color: #232328;--footer-background: #232328;--third-text-color: #B8B8C6;--gallery-card-shadow: 0 0 8px hsl(25deg, 100%, 50%);--primary-btn-text-color: #ffffff;--filter-border: #898989;--button-border: #ffffff;';
  if (initDataAccent() !== null && initDataAccent() !== undefined) {
    return `${darkzz} hsl(${setColor.h}deg, ${setColor.s}%, ${setColor.l}%);`;
  }
  return `${darkzz} ${defaultColors};`;
}

export function setTheme() {
  const darkColor = darkColors();
  const accent = initAccent();
  if (initDataTheme() === 'dark') {
    document.documentElement.style.cssText = `${darkColor}${accent}`;
    return;
  }
  document.documentElement.style.cssText = `${accent}`;
  return;
}
