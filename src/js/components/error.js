
import errorRend from '..//..//views/components/error.hbs';
import img from '../../images/img/png/error/error.jpeg';
export const imgMarkup = errorRend({ img });
const errors = document.querySelector('.gallery');


export function renderError() {
    const marcup = errorRend();
    errors.innerHTML = marcup;
}
// renderError()

