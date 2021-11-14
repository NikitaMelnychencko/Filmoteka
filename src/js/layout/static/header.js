import { pageRender } from '../../call_list/call_list.js';
import mainTittle from '../../data/main.json';
import { homeMarkUp } from '../../layout/hero_home';
import { renderGallery } from '../../layout/gallery';
import myLibraryMarkUp from '../../../views/partials/hero_my_list.hbs';
import { refs } from '../../refs/refs.js';
import { initGenres } from '../../data/genres';
import {
  renderBackdrop,
  closeMd,
  closeBackdrop,
} from '../../components/backdrop';
import { signOutUser, userId } from '../../components/films_library';
import { ref } from '@firebase/database';

refs.myUlEle.forEach((list, id, a) => {
  list.addEventListener('click', () =>
    a.forEach(elem => elem.classList.toggle('nav__current', elem === list)),
  );
});

const refas = {
  singUP: document.querySelector('.signup-now__button'),
  singInMod: document.querySelector('.backdrop-sing'),
  logIn: document.querySelector('[data-action="login"]'),
  logOut: document.querySelector('[data-action="logout"]'),
};

refas.singUP.addEventListener('click', openSinUp);
// function for render sing up sing in
function openSinUp(eve) {
  eve.preventDefault();
  const item = eve.target.textContent.trim();
  if (item === 'Sign up Now') {
    refas.singInMod.classList.add('is-hidden');
  }
}

// function close modal
window.addEventListener('keydown', onCloseModal);

function onCloseModal(eve) {
  const cli = eve.code;
  if (cli === 'Escape') {
    refs.sininModal.classList.add('is-hidden');
  }
}
window.addEventListener('click', mouseCloseMOdal);

function mouseCloseMOdal(event) {
  if (event.target.className === 'backdrop-sing') {
    refs.sininModal.classList.add('is-hidden');
  }
}

// Funchtion for render header
function canheHeader(event) {
  event.preventDefault();
  let target = event.target;
  let item = target.textContent.trim();
  console.log(item);

  if (item === 'home') {
    // here render header page serch
    initGenres();
    renderGallery();
    pageRender(mainTittle.home, homeMarkUp, 'hero--home', 'hero--my-library');
  }
  if (item === 'my library') {
    // here render header page Button
    const myLib = myLibraryMarkUp();
    pageRender(
      mainTittle.my_library_watched,
      myLib,
      'hero--my-library',
      'hero--home',
    );

    onLibButtons();
    const userId = sessionStorage.getItem('userId');
    getUser(`${userId}`, `watched`);
  }
  if (item === 'log in') {
    // renderBackdrop();
    refs.sininModal.classList.remove('is-hidden');
  }
}

refs.myUlEle.forEach(function (link) {
  link.addEventListener('click', canheHeader);
});

if (userId === null) {
  refs.logOut.classList.remove('hidden');
}
