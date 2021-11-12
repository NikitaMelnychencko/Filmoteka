import { pageRender } from '../../call_list/call_list.js';
import mainTittle from '../../data/main.json';
import { homeMarkUp } from '../../layout/hero_home';
import { renderGallery } from '../../layout/gallery';
import myLibraryMarkUp from '../../../views/partials/hero_my_list.hbs';

const refs = {
  myUlEle: document.querySelectorAll('.nav__title >li a'),
};

refs.myUlEle.forEach((list, id, a) => {
  list.addEventListener('click', () =>
    a.forEach(elem => elem.classList.toggle('nav__current', elem === list)),
  );
});

// функция для рендера

function toggleTodo(event) {
  event.preventDefault();
  let target = event.target;
  let item = target.textContent;
  console.log(item);

  if (item === 'home') {
    // Сюда передать функцию
    pageRender(mainTittle.home, homeMarkUp);
    renderGallery();
  }
  if (item === 'my library') {
    const myLib = myLibraryMarkUp;
    pageRender(mainTittle.my_library_watched, myLib);
  }
}

refs.myUlEle.forEach(function (link) {
  link.addEventListener('click', toggleTodo);
});
// toggleTodo();
