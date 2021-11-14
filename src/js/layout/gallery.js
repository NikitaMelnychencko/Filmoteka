import { GENRES_MAP, initGenres } from '../data/genres';
import { renderMovieGlobal } from '../components/fetch';
import { renderPagination, hidePagination } from '../components/pagination-list';
import { clearInput } from './hero_home';
import img from '../../images/img/png/gallery/no-image.png';
import card from '../../views/components/card_galery.hbs';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Tests
//renderGallery("titanic", 3);
//renderGallery("borat");
//renderGallery('', 3);

// renderGallery () - отрисовывает первую страницу самых популярных фильмов
// renderGallery (search) - отрисовывает первую страницу по слову вопросу
// renderGallery ('', page) - отрисовывает страницу №page самых популярных фильмов

export async function renderGallery(search, page = 1, options = 'home') {
    let movies = undefined;
    if (!search) {
        clearInput();
        movies = (await renderMovieGlobal(page, '', '', options));
    } else {
        movies = (await renderMovieGlobal(page, search, '', ''));
    }

    if (!movies) {
        renderPagination(0, 0);
        return
    }

    renderMovies(movies.results);
    renderPagination(page, movies.total_pages);
    initGenres();
    return movies;
}

export function renderMovies(movies) {
    const moviesData = getData(movies, GENRES_MAP);
    const gallery = document.querySelector('.gallery-list');
    gallery.innerHTML = card(moviesData);
}

function getData(movies, genres) {
    return movies.map(m => {
        return {
            id: m.id,
            title: m.title,
            vote_average: m.vote_average.toFixed(1),
            genres: !genres ? '-' : m.genre_ids.map(id => {
                return { id, name: genres.get(id), url: '' };
            }),
            release_date: m.release_date,
            release_date_year: !m.release_date ? '-' : m.release_date.slice(0, 4),
            poster_path: !m.poster_path ? img : `${IMG_URL}${m.poster_path}`,
        };
    });
}
