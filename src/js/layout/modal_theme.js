import modal_theme from '../../views/partials/modal_theme.hbs';
import { renderModal } from '../components/modal';
const modalThemeContent = modal_theme(); //need insert object with movie detail

renderModal(modalThemeContent); //test

const palitre__saturation = document.querySelector('.palitre__saturation');
const palitre__brightness = document.querySelector('.palitre__brightness');
const palitre__ring = document.querySelector('.palitre__ring');

const brightness = palitre__brightness.getContext('2d');
brightness.lineWidth = 40; // толщина линии
brightness.arc(325, 325, 300, (3 * Math.PI) / 4, (5 * Math.PI) / 4);
brightness.stroke();

const saturation = palitre__saturation.getContext('2d');
saturation.lineWidth = 40; // толщина линии
saturation.arc(325, 325, 300, (7 * Math.PI) / 4, Math.PI / 4);
saturation.stroke();

const ring = palitre__ring.getContext('2d');
ring.lineWidth = 50; // толщина линии
ring.arc(325, 325, 300, 0, 2 * Math.PI);
// ring.fillstyle(rgba(0, 0, 200, 0.5));
// ring.fillRect(30, 30, 55, 50);
ring.stroke();
