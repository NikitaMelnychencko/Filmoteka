import main from '../../views/layout/main.hbs'
import { refs } from '../refs/refs.js'
import { homeMarkUp } from '../layout/hero_home'

//test
function homeRender() {
  refs.main.innerHTML = main({homeMarkUp});
}
homeRender()