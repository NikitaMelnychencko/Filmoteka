// example
// pageRender(mainTittle.home)
// pageRender(mainTittle.my_library_watched)
// pageRender(mainTittle.my_library_queue)

import main from '../../views/layout/main.hbs'
import { refs } from '../refs/refs.js'
import mainTittle from '../data/main.json'

//test
function pageRender(value) {
  const currentValue = value 
  refs.main.innerHTML = main({currentValue});
}

pageRender(mainTittle.home)
