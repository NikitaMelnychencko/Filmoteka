import { setTheme } from './modal_theme';

// export function darkTheme() {
//   document.querySelector('#dark-toggle');
// }

function setDarkTheme() {
  sessionStorage.setItem('darkTheme', JSON.stringify({ theme: 'dark' }));
  setTheme();
}

setDarkTheme();
