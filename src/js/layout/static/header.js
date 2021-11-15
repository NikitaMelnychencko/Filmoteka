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
import { signOutUser } from '../../components/appFirebase';
import {onLibButtons} from '../../layout/hero_my_list.js';


refs.myUlEle.forEach((list, id, a) => {
  list.addEventListener('click', () =>
    a.forEach(elem => elem.classList.toggle('nav__current', elem === list)),
  );
});

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

    renderGallery('library', `${userId}`, `watched`);

    //getUser(`${userId}`, `watched`);
  }
  if (item === 'log in') {
    // renderBackdrop();
    refs.sininModal.classList.remove('hidden');
  }
}

refs.myUlEle.forEach(function (link) {
  link.addEventListener('click', canheHeader);
});

// function auth

export function swetchClass() {
  console.log(sessionStorage.getItem('userId') === null);
  if (sessionStorage.getItem('userId') === null) {
    refs.logIn.classList.remove('hidden');
    refs.logOut.classList.add('hidden');
  } else {
    refs.logIn.classList.add('hidden');
    refs.logOut.classList.remove('hidden');
  }
}
swetchClass();

refs.logOut.addEventListener('click', loginOutUser);

function loginOutUser() {
  signOutUser()
}
