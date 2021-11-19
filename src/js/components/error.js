import errorRend from '../../views/components/error_search.hbs';
import errorServ from '../../views/components/error_server.hbs';
import img from '../../images/img/png/error/404_error-preview.webp';
import imgMainError from '../../images/img/png/error/404-Error.png';
export const imgMarkup = errorRend({ img });
export const imgMarkupMain = errorServ({ imgMainError });
import { renderGallery } from '../layout/gallery';
import { clearInput } from '../layout/hero_home';
import { seorchId } from '../layout/modal_one_movie.js';

//displays an error if the input is incorrect in the search
export function renderErrorSearch() {
  const errors = document.querySelector('.gallery-list');
  const filterAll = document.querySelector('.filter');
  filterAll.classList.add('is-hidden')
  const marcup = errorRend({ img });
  errors.innerHTML = marcup;
  const btnHome = document.querySelector('.error__button');
  btnHome.addEventListener('click', el => {
    el.preventDefault();
    if (el.target) {
      clearInput();
      renderGallery();
      filterAll.classList.remove('is-hidden')
    }
  });
}


//throws on server error

export function renderErrorServer() {
  const errorsServ = document.querySelector('.gallery-list');
  const marcup = errorServ({ imgMainError });
  errorsServ.innerHTML = marcup;
}
