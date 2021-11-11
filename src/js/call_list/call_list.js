// example
// pageRender(mainTittle.home)
// pageRender(mainTittle.my_library_watched)
// pageRender(mainTittle.my_library_queue)

import main from '../../views/layout/main.hbs';
import { refs } from '../refs/refs.js';
import mainTittle from '../data/main.json';
import backdrop_markup from '../../views/components/backdrop.hbs';
import { homeMarkUp, openInput } from '../layout/hero_home';
import modal_markup from '../../views/components/modal.hbs';
import svg from '../../images/svg/sprite.svg';
import { GENRES_MAP, init } from '../data/genres';
import { renderGallery } from '../layout/gallery';
import { renderPagination, primaryPagination } from '../components/pagination-list';



function pageRender(value, heroValue) {
  //backdrop include plugin "modal window"
  const backdropMarkUp = backdrop_markup(modal_markup({ svg }));
  const currentValue = value;
  refs.main.innerHTML = main({ currentValue, backdropMarkUp, heroValue });
  if (value.hero_tittle === 'Search Movies') {
    openInput();
  }
  // pagination
  primaryPagination();

}

init();
pageRender(mainTittle.home, homeMarkUp);
//renderGallery();
renderGallery().then((data => {
  console.log(data.total_pages)
  renderPagination(1, data.total_pages);
}));
