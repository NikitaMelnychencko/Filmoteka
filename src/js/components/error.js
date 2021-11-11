
import errorRend from '../../views/components/error_search.hbs';
import errorServ from '../../views/components/error_server.hbs';

import img from '../../images/img/png/error/error.jpeg';
export const imgMarkup = errorRend({ img });
import { renderGallery, renderMovies } from '../layout/gallery'


export function renderErrorSearch() {
    const errors = document.querySelector('.gallery');
    const marcup = errorRend({ img });
    errors.innerHTML = marcup;
    const btnHome = document.querySelector('.error__button')
    btnHome.addEventListener('click', el => {
        el.preventDefault()
        if (el.target) {
            renderGallery()
        }
        console.log(el);
    })
}

export function renderErrorServer() {
    const errorsServ = document.querySelector('.gallery');
    console.log(errorsServ);
    const marcup = errorServ({ img });
    errorsServ.innerHTML = marcup;
}
// renderErrorServer()





// renderErrorSearch()
