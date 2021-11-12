import modal_theme from '../../views/partials/modal_theme.hbs';
import { renderModal } from '../components/modal';
import { palitre } from './palitre';
const modalThemeContent = modal_theme(); //need insert object with movie detail //test

setTimeout(e => {
  renderModal(modalThemeContent);
  palitre();
}, 100);
