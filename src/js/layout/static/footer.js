import { refs } from '../../refs/refs.js';
refs.footerLink.addEventListener('click', openTeamListModal);

function openTeamListModal(e) {
  e.preventDefault();
  console.log('вызов функции, шоб модалка появилась');
}
