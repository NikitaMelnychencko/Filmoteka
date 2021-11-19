import { setTheme } from './modal_theme';
import { stopScroll } from '../components/scroll';

function dark_toggle() {
  return document.querySelector('#dark-toggle');
}

export function darkTheme() {
  dark_toggle().addEventListener('change', changeTheme);
  initialiseCheckOnDownload();
}

function changeTheme(evt) {
  if (evt.target.checked) {
    setDarkTheme();
    stopScroll();
    return;
  }
  setLightTheme();
  stopScroll();
  return;
}

function setDarkTheme() {
  localStorage.setItem('darkTheme', JSON.stringify('dark'));
  setTheme();
}

function setLightTheme() {
  localStorage.removeItem('darkTheme');
  setTheme();
}

export function defaultTheme() {
  localStorage.removeItem('darkTheme');
  dark_toggle().checked = '';
}

function initialiseCheckOnDownload() {
  if (JSON.parse(localStorage.getItem('darkTheme')) == 'dark') {
    dark_toggle().checked = 'checked';
  }
  return;
}
