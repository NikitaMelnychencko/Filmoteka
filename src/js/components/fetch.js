
// Вызов функции renderMuvieGlobal(page, searchQuery) для "input"
// Вызов функции renderMuvieGlobal(page, '', '', home) для страници "Home"
// Вызов функции renderParamsCard(id) для страници карточки фильма

const API_KEY = '843d6905879c9b52f41f5f6a1e2c8966';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/week`;
const SEARCH_URL = `${BASE_URL}/search/movie`
const ID_URL = `${BASE_URL}/movie/`;
const GENRE_URL = `${BASE_URL}/genre/movie`

export function renderMovieGlobal(page, searchQuery, id, options) {
  if (options === 'home') {
    const REQUEST_ADRESS = `${TREND_URL}?api_key=${API_KEY}&page=${page}`
    return baseFetch(REQUEST_ADRESS);

  } else if (searchQuery !== undefined) {
    const REQUEST_ADRESS = `${SEARCH_URL}?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
    return baseFetch(REQUEST_ADRESS);
  }
}

export function renderParamsCard(id) {
  const REQUEST_ADRESS = `${ID_URL}${id}?api_key=${API_KEY}&language=en-US`
  console.log(REQUEST_ADRESS);
  return baseFetch(REQUEST_ADRESS);
}

export function genreMovie(genre) {
  const REQUEST_ADRESS = `${GENRE_URL}/list?api_key=${API_KEY}&language=en-US`
  console.log(REQUEST_ADRESS);
  return baseFetch(REQUEST_ADRESS);
}

function baseFetch(REQUEST_ADRESS) {
  return fetch(REQUEST_ADRESS)
    .then(response => {
      if (response.status === 200 || response.status === 422) {
        return response.json();
      }
    }).catch(error => alert(errorNot));
}

