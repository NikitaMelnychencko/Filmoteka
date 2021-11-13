import modal_theme from '../../views/partials/modal_theme.hbs';
import { renderModal } from '../components/modal';
import { palitre } from './palitre';
// import { darkTheme } from './dark-theme';
const modalThemeContent = modal_theme(); //need insert object with movie detail //test

setTimeout(e => {
  renderModal(modalThemeContent);
  palitre();
  // darkTheme();
}, 100);

export function setTheme() {
  const defaultTheme = {
    theme: 'light',
  };
  const darkColor =
    '--background: #1D1D21; --primary-text-color: #ffffff; --footer-background: #232328; --third-text-color: #B8B8C6;';

  const theme = JSON.parse(sessionStorage.getItem('darkTheme'));
  const accent = JSON.parse(sessionStorage.getItem('accent'));
  const themeInit = { ...defaultTheme, ...theme };
  console.log(themeInit);
  if (themeInit.theme === 'dark') {
    document.documentElement.style.cssText = `${darkColor}${accent}`;
    return;
  } else if (themeInit.theme === 'light') {
    document.documentElement.style.cssText = `${accent}`;
    return;
  }
  return;
}
