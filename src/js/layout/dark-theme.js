import { setTheme } from './modal_theme';

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

    return;
  }
  setLightTheme();

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
  dark_toggle().removeAttribute('checked', 'true');
}

function initialiseCheckOnDownload() {
  if (JSON.parse(localStorage.getItem('darkTheme')) == 'dark') {
    dark_toggle().setAttribute('checked', 'true');
    return;
  }
  return;
}
