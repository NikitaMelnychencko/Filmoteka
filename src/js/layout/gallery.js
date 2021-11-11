import { GENRES_MAP, init } from '../data/genres';
import { renderMovieGlobal } from '../components/fetch';
import img from '../../images/img/png/gallery/no-image.png';
import card from '../../views/components/card_galery.hbs';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

let currentPage = undefined;
init();
renderGallery();

// Tests
//renderGallery("titanic", 3);
//renderGallery("borat");
//renderGallery('', 3);

// renderGallery () - отрисовывает первую страницу самых популярных фильмов
// renderGallery (search) - отрисовывает первую страницу по слову вопросу
// renderGallery ('', page) - отрисовывает страницу №page самых популярных фильмов

export async function renderGallery(searchQuery, page = 1, options = 'home') {
  currentPage = page;
  let movies = undefined;
  if (!searchQuery) {
    movies = (await renderMovieGlobal(currentPage, '', '', options)).results;
  } else {
    movies = (await renderMovieGlobal(currentPage, searchQuery, '', ''))
      .results;
  }
  renderMovies(movies);
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
      genres: m.genre_ids.map(id => {
        return { id, name: genres.get(id), url: '' };
      }),
      release_date: m.release_date,
      release_date_year: m.release_date.slice(0, 4),
      poster_path: !m.poster_path ? img : `${IMG_URL}${m.poster_path}`,
    };
  });
}
