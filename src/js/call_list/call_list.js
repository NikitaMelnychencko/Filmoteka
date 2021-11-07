// example
// pageRender(mainTittle.home)
// pageRender(mainTittle.my_library_watched)
// pageRender(mainTittle.my_library_queue)

import main from '../../views/layout/main.hbs';
import { refs } from '../refs/refs.js';
import mainTittle from '../data/main.json';
import backdrop_markup from '../../views/components/backdrop.hbs';
const backdropMarkUp = backdrop_markup();

//test
function pageRender(value) {
  const currentValue = value;
  refs.main.innerHTML = main({ currentValue, backdropMarkUp });
}

pageRender(mainTittle.home);
