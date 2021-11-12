import { pageRender } from '../../call_list/call_list.js';
import mainTittle from '../../data/main.json';
import { homeMarkUp } from '../../layout/hero_home';

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

  if (item === 'my library') {
    // Сюда передать функцию
    pageRender(mainTittle.home, homeMarkUp);
  }
}

refs.myUlEle.forEach(function (link) {
  link.addEventListener('click', toggleTodo);
});
// toggleTodo();
