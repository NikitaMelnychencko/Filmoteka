import { GENRES_MAP, initGenres } from '../data/genres';
import { renderMovieGlobal } from '../components/fetch';
import { renderPagination } from '../components/pagination-list';
import img from '../../images/img/png/gallery/no-image.png';
import card from '../../views/components/card_galery.hbs';
//import { filterGlobal } from '../filter/fetch_filter_sort';
import { getUser } from '../components/appFirebase';
import { addSpinner, removeSpinner } from '../components/spinner';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const renderParams = {
  globalOptions: '',
  globalSearch: '',
  globalOrder: '',
};

export async function renderGallery(
  options = 'home',
  search,
  sortBy,
  page = 1,
) {
  addSpinner();
  let movies = {};

  if (options === '') {
    options = renderParams.globalOptions;
  }
  if (search === '') {
    search = renderParams.globalSearch;
  }
  if (sortBy === '') {
    sortBy = renderParams.globalOrder;
  }

  if (options === 'home') {
    renderParams.globalOptions = options;
    movies = await renderMovieGlobal(page, '', '', renderParams.globalOptions);
  }

  if (options === 'search') {
    renderParams.globalOptions = options;
    renderParams.globalSearch = search;
    movies = await renderMovieGlobal(page, renderParams.globalSearch, '', '');
  }

  if (options === 'library') {
    renderParams.globalOptions = options;
    renderParams.globalSearch = search;
    renderParams.globalOrder = sortBy;

    const allMovies = await getUser(
      renderParams.globalSearch,
      renderParams.globalOrder,
    );

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
  if (movies.length === 0) return;
  const moviesData = getData(movies, GENRES_MAP);
  const gallery = document.querySelector('.gallery-list');
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
