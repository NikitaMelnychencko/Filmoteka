import { refs } from '../../refs/refs.js';
refs.footerLink.addEventListener('click', openTeamListModal);

function openTeamListModal(e) {
  e.preventDefault();
  console.log('вызов функции, шоб модалка появилась');
}

const heart = document.querySelector('.footer__svg');
let timerFooterId = null;
function heartBeat() {
  timerFooterId = setInterval(intervalBeat, 1000);
}

function intervalBeat() {
  heart.classList.add('footer__svg-heartbeat');
  timerFooterId = setTimeout(delayBeat, 150);
}

function delayBeat() {
  heart.classList.remove('footer__svg-heartbeat');
  clearTimeout(delayBeat, 150);
}

heartBeat();
