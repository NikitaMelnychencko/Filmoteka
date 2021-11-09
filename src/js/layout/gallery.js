import { GENRES_MAP, init } from '../data/genres';
import { renderMovieGlobal } from '../components/fetch'
import img from '../../images/img/png/gallery/no-image.png'
import card from '../../views/components/card_galery.hbs'

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const gallery = document.querySelector('.gallery-list');
let currentPage = undefined;

init().then(renderGallery(1, '', '', 'home'));

function renderGallery(page, searchQuery, id, options) {
    currentPage = page;
    renderMovieGlobal(currentPage, searchQuery, id, options).then(renderMovies);
    return currentPage;
};

function renderMovies(movies) {
    const moviesData = getData(movies.results, GENRES_MAP);
    gallery.innerHTML = card(moviesData);
};

function getData(movies, genres) {
    return movies.map(m => {
        return {
            id: m.id,
            title: m.title,
            vote_average: m.vote_average.toFixed(1),
            genres: m.genre_ids.map(id => { return { id, name: genres.get(id), url: '' } }), // TODO: Url to show movies by genre
            release_date: m.release_date,
            release_date_year: m.release_date.slice(0, 4),
            poster_path: !m.poster_path ? img : `${IMG_URL}${m.poster_path}`
        }
    });
};