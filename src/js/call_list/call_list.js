import main from '../../views/layout/main.hbs'
import { refs } from '../refs/refs.js'
import mainTittle from '../data/main.json'
//test
function homeRender() {
  const currentValue = mainTittle.home
  refs.main.innerHTML = main({currentValue});
}
homeRender()
function myLibraryRender() {
  const currentValue = mainTittle.my_library
  refs.main.innerHTML = main({currentValue});
}
//myLibraryRender()