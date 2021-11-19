import { pageRender } from '../../call_list/call_list.js';
import mainTittle from '../../data/main.json';
import { homeMarkUp } from '../../layout/hero_home';
import { renderGallery } from '../../layout/gallery';
import myLibraryMarkUp from '../../../views/partials/hero_my_list.hbs';
import { refs } from '../../refs/refs.js';
import { initGenres } from '../../data/genres';
import { signOutUser } from '../../components/appFirebase';
import { onLibButtons } from '../../layout/hero_my_list.js';
import { logOutModalIsVisible } from '../../components/modal_login';
import { mouseUp } from '../../components/modal_login.js';
// import { ref } from '@firebase/database';

function current(event) {
  if (event === 'home') {
    changeClass(refs.idhome, refs.idmyLib, 'nav__current', 'nav__current')
  } else if (event === 'my library') {
    changeClass(refs.idmyLib, refs.idhome, 'nav__current', 'nav__current')
  }
}

export function home() {
  current('home');
  initGenres();
  renderGallery(1, 'home');
  pageRender(mainTittle.home, homeMarkUp, 'hero--home', 'hero--my-library');
}

export function mylibwatch() {
  // here render header page Button
  const myLib = myLibraryMarkUp();
  pageRender(
    mainTittle.my_library_watched,
    myLib,
    'hero--my-library',
    'hero--home',
    current('my library'),
  );
  onLibButtons();
  const userId = sessionStorage.getItem('userId');
  renderGallery(1, 'library', `${userId}`, `watched`);
}

// Funchtion for render header
function canheHeader(event) {
  event.preventDefault();
  let item = event.target.textContent.trim();
  if (item === 'home' || item === 'log out') {
    // here render header page serch
    home();
  } else if (sessionStorage.getItem('userId') !== null) {
    mylibwatch();
  } else {
    removeModalClassSingIn();
    home();
  }
  if (item === 'log in') {
    removeModalClassSingIn();
  }
  return;
}

function removeModalClassSingIn() {
  refs.singinModal.classList.remove('modal-auth--hidden');
  refs.modalSinInError.classList.add('modal__error--hidden');
  mouseUp();
}

refs.myUlEle.forEach(function (link) {
  link.addEventListener('click', canheHeader);
});

// function auth
export function swetchClass() {
  changeAuthModal();
}
function hidenmodalSinUp() {
  if (sessionStorage.getItem('userId') === null) {
    changeClass(refs.logOut, refs.logIn, 'js-logout--hidden', 'js-login--hidden')
  } else {
    changeClass(refs.logIn, refs.logOut, 'js-login--hidden', 'js-logout--hidden')
  }
}
function changeClass(firstEl, secondEl, firstClass, secondClass) {
  firstEl.classList.add(firstClass);
  secondEl.classList.remove(secondClass);
}

function changeAuthModal() {
  hidenmodalSinUp();
}
swetchClass();

refs.logOut.addEventListener('click', loginOutUser);

function loginOutUser() {
  removeModalClassSingIn();
  logOutModalIsVisible(signOutUser);

}
