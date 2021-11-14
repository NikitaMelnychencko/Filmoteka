import { GENRES_MAP, initGenres } from '../data/genres';
import { renderMovieGlobal } from '../components/fetch';
import { renderPagination, hidePagination } from '../components/pagination-list';
import { clearInput } from './hero_home';
import img from '../../images/img/png/gallery/no-image.png';
import card from '../../views/components/card_galery.hbs';
import { filterGlobal } from '../filter/fetch_filter_sort';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
let globalOptions = "home";
let globalOrder = '';
let globalSearch = ''


// Tests
//renderGallery("titanic", 3);
//renderGallery("borat");
//renderGallery('', 3);

// renderGallery () - отрисовывает первую страницу самых популярных фильмов
// renderGallery (search) - отрисовывает первую страницу по слову вопросу
// renderGallery ('', page) - отрисовывает страницу №page самых популярных фильмов

export async function renderGallery(options, search, sortBy, page = 1) {
    let movies = undefined;
    console.log('GlobalOptions in top -', globalOptions)
    console.log('options in top -', options)
    if (!options) { options = globalOptions }
    console.log(options)
    if (options === 'home') {
        globalOptions = options;
        clearInput();
        globalSearch = '';
        movies = (await renderMovieGlobal(page, '', '', globalOptions));
        //console.log(movies);
        //return movies;
    }

    if (options === 'search') {
        globalOptions = options;
        globalSearch = search;
        //clearInput();
        console.log('Search arg - ', page, search)
        movies = (await renderMovieGlobal(page, search, '', ''));
        console.log(movies);
        //return movies;
    }

    if (options === 'sort') {
        console.log('Globalorder first', globalOrder);
        console.log('пришло sortBy', sortBy)
        if (!sortBy) { sortBy = globalOrder }
        globalOrder = sortBy
        console.log('Globalorder after', globalOrder);
        console.log('зашли в сорт')
        globalOptions = options;

        console.log('filterGlobal args - ', globalOrder, page)
        movies = (await filterGlobal(globalOrder, page))
        // movies = search;
        console.log('получили фильмы', movies)
    }

    renderMovies(movies.results);
    console.log(movies.results)
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
