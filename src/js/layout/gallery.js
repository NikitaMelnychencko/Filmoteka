import { GENRES_MAP, init } from '../data/genres';
import { renderMovieGlobal } from '../components/fetch'
import img from '../../images/img/png/gallery/no-image.png'
import card from '../../views/components/card_galery.hbs'

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const gallery = document.querySelector('.gallery-list');
let currentPage = undefined;

init();
renderGallery();

//renderGallery("titanic", 3);
//renderGallery("borat");
renderGallery('', 2);

// renderGallery () - отрисовывает первую страницу самых популярных фильмов

async function renderGallery(options = 'home', page = 1) {
    currentPage = page;
    let movies = undefined;
    console.log(options);
    if (!options) {
        console.log("Ooops!");
        return;
    }
    if (options === 'home') {
        movies = (await renderMovieGlobal(currentPage, '', '', options)).results;
    } else {
        movies = (await renderMovieGlobal(currentPage, options, '', '')).results;
    };
    renderMovies(movies);
    return movies;
};

function renderMovies(movies) {
    const moviesData = getData(movies, GENRES_MAP);
    gallery.innerHTML = card(moviesData);
};

function getData(movies, genres) {
    return movies.map(m => {
        return {
            id: m.id,
            title: m.title,
            vote_average: m.vote_average.toFixed(1),
            genres: m.genre_ids.map(id => { return { id, name: genres.get(id), url: '' } }),
            release_date: m.release_date,
            release_date_year: m.release_date.slice(0, 4),
            poster_path: !m.poster_path ? img : `${IMG_URL}${m.poster_path}`
        }
    });
};
