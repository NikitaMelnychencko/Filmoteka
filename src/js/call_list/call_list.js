// example
// pageRender(mainTittle.home)
// pageRender(mainTittle.my_library_watched)
// pageRender(mainTittle.my_library_queue)

import main from '../../views/layout/main.hbs';
import { refs } from '../refs/refs.js';
import mainTittle from '../data/main.json';
import backdrop_markup from '../../views/components/backdrop.hbs';
import searchSvg from '../../images/svg/sprite.svg';
import { homeMarkUp } from '../layout/hero_home';
const backdropMarkUp = backdrop_markup();

//test
function pageRender(value) {
  const currentValue = value;
  refs.main.innerHTML = main({ currentValue, backdropMarkUp,searchSvg,homeMarkUp });
}

pageRender(mainTittle.home);

