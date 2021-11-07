import main from '../../views/layout/main.hbs';
import { refs } from '../refs/refs.js';
import { homeMarkUp } from '../layout/hero_home';
import searchSvg from '../../images/svg/sprite.svg';

function homeRender() {
  refs.main.innerHTML = main({ homeMarkUp, searchSvg });
}
homeRender();
