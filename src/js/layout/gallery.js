import { GENRES_MAP, initGenres } from '../data/genres';
import { renderMovieGlobal } from '../components/fetch';
import { getUser } from '../components/appFirebase';
import { filterGlobal } from '../filter/fetch_filter_sort';
import { hideFilter } from '../filter/filter_sort';
import { renderPagination } from '../components/pagination-list';
import { addSpinner, removeSpinner } from '../components/spinner';
import img from '../../images/img/png/gallery/no-image.png';
import imgEmpty from '../../images/img/null_in_box/null_in_box.jpg'
import card from '../../views/components/card_galery.hbs';
import nullInBox from '../../views/components/null_in_box.hbs';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const renderParams = {
  globalOptions: 'home',
  globalSearch: '',
  globalYear: '',
  globalOrder: '',
  globalGenre: '',
  globalId: '',
  globalLibrary: '',
};

export async function renderGallery(page = 1, options, ...criterias) {
  addSpinner();

  let movies = {};

  if (options === '' || !options) {
    options = renderParams.globalOptions;
  }

  if (options === 'home') {
    renderParams.globalOptions = options;
    movies = await renderMovieGlobal(page, '', '', renderParams.globalOptions);
  }

  if (options === 'search') {
    hideFilter(true);
    if (!criterias[0]) { criterias[0] = renderParams.globalSearch };
    renderParams.globalOptions = options;
    renderParams.globalSearch = criterias[0];
    movies = await renderMovieGlobal(page, renderParams.globalSearch, '', '');
  }

  if (options === 'sort') {
    renderParams.globalOptions = options;
    renderParams.globalYear = criterias[0];
    renderParams.globalOrder = criterias[1];
    renderParams.globalGenre = criterias[2];

    movies = (await filterGlobal(renderParams.globalOrder, page, renderParams.globalYear, renderParams.globalGenre))
  }

  if (options === 'library') {
    renderParams.globalOptions = options;
    renderParams.globalId = criterias[0];
    renderParams.globalLibrary = criterias[1];

    const allMovies = await getUser(renderParams.globalId, renderParams.globalLibrary);

    movies['total_pages'] = Math.ceil(allMovies.length / 20);
    movies['results'] = allMovies.slice((page - 1) * 20, page * 20);
  }

  if (!movies) {
    renderPagination(0, 0);
    removeSpinner();
    return;
  }

  renderMovies(movies.results);
  renderPagination(page, movies.total_pages);
  removeSpinner();

  initGenres();
  return movies;
}

export function renderMovies(movies) {
  const gallery = document.querySelector('.gallery-list');

  if (movies.length === 0) {
    gallery.innerHTML = nullInBox({ imgEmpty })
    return;
  }

  const moviesData = getData(movies, GENRES_MAP);
  gallery.innerHTML = card(moviesData);
}

function getData(movies, genresList) {
  return movies.map(m => {
    let genr = [];
    if (!m.genres) {
      if (!genresList) {
        return (genr = ['-']);
      }
      genr = m.genre_ids.map(id => genresList.get(id));
    } else {
      genr = m.genres.map(id => id.name);
    }
    return {
      id: m.id,
      title: m.title,
      vote_average: m.vote_average.toFixed(1),
      genres: genr,
      release_date: m.release_date,
      release_date_year: !m.release_date ? '-' : m.release_date.slice(0, 4),
      poster_path: !m.poster_path ? img : `${IMG_URL}${m.poster_path}`,
    };
  });
}
