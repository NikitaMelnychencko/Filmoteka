import { pageRender } from '../../call_list/call_list.js';
import mainTittle from '../../data/main.json';
import { homeMarkUp } from '../../layout/hero_home';
import { renderGallery } from '../../layout/gallery';
import myLibraryMarkUp from '../../../views/partials/hero_my_list.hbs';
import { refs } from '../../refs/refs.js';
import { initGenres } from '../../data/genres';

refs.myUlEle.forEach((list, id, a) => {
  list.addEventListener('click', () =>
    a.forEach(elem => elem.classList.toggle('nav__current', elem === list)),
  );
});

// функция для рендера
function canheHeader(event) {
  event.preventDefault();
  let target = event.target;
  let item = target.textContent;
  
  if (item === 'home') {
    // here render header page serch
    initGenres()
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
  }
  // if (item === '  log in') {
  // }
}

refs.myUlEle.forEach(function (link) {
  link.addEventListener('click', canheHeader);
});
