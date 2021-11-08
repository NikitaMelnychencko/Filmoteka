import genr from '../data/genres.json'
import img from '../../images/img/png/gallery/no-image.png'
import card from '../../views/components/card_galery.hbs'
import { renderMovieGlobal } from '../components/fetch.js'

const genreDB = new Map(
    genr.genres.map(i => [i.id, i.name]));

console.log(img);

const gallery = document.querySelector('.gallery-list');

const currentPage = 999;

renderMovieGlobal(currentPage, '', '', 'home').then(renderCards);

function renderCards(data) {
    const movies = modifyData(data);
    gallery.insertAdjacentHTML('afterbegin', card(movies));
}

function modifyData(data) {
    const newData = data.results;
    newData.forEach(movie => {
        movie.vote_average = movie.vote_average.toFixed(1);
        movie.genre_ids = movie.genre_ids.length === 0 ? ["-"] : movie.genre_ids.map(genre => genreDB.get(genre));
        movie.genre_ids = movie.genre_ids.join(", ");
        movie.release_date = !movie.release_date ? '-' : movie.release_date.slice(0, 4);
        movie.poster_path = !movie.poster_path ? img : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    });
    return newData;
};