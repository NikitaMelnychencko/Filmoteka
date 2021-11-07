import main from '../../views/layout/main.hbs'
import card from '../../views/components/card_galery.hbs'
import { refs } from '../refs/refs.js'
import { renderMovieGlobal } from '../components/fetch.js'
//test
refs.main.innerHTML = main();

const gallery = document.querySelector('.gallery-list');

function renderCards(data) {
    const movies = data.results;
    gallery.insertAdjacentHTML('afterbegin', card(movies));
}

const page = 1;

renderMovieGlobal(page, '', '', 'home').then(renderCards);