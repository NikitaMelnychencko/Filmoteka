import main from '../../views/layout/main.hbs'
import { refs } from '../refs/refs.js'
//test
function homeRender() {
  refs.main.innerHTML = main({homeMarkUp});
}
homeRender()
function myLibraryRender() {
  refs.main.innerHTML = main({homeMarkUp});
}