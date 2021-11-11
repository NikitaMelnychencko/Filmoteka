import modal_theme from '../../views/partials/modal_theme.hbs';
import { renderModal } from '../components/modal';
const modalThemeContent = modal_theme(); //need insert object with movie detail

renderModal(modalThemeContent); //test
