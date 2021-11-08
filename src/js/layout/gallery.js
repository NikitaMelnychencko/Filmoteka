import { genres } from '../data/genres.json'
import img from '../../images/img/png/gallery/no-image.png'
import card from '../../views/components/card_galery.hbs'
import { renderMovieGlobal } from '../components/fetch.js'

const EMPTY_DATA = '-';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const currentPage = 999;

const gallery = document.querySelector('.gallery-list');

const genreDB = new Map(
    genres.map(i => [i.id, i.name])
);

renderMovieGlobal(currentPage, '', '', 'home').then(renderCards);

function renderCards(data) {
    const movies = modifyData(data);
    gallery.insertAdjacentHTML('afterbegin', card(movies));
}

function modifyData(data) {
    const newData = data.results;
    newData.forEach(movie => {
        movie.vote_average = movie.vote_average.toFixed(1);
        movie.genre_ids = !movie.genre_ids.length ? [EMPTY_DATA] : movie.genre_ids.map(genre => genreDB.get(genre));
        movie.genre_ids = movie.genre_ids.join(", ");
        movie.release_date = !movie.release_date ? EMPTY_DATA : movie.release_date.slice(0, 4);
        movie.poster_path = !movie.poster_path ? img : `${IMG_URL}${movie.poster_path}`
    });
    return newData;
};