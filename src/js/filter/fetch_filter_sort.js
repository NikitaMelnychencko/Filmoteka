
const API_KEY = '843d6905879c9b52f41f5f6a1e2c8966';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL_DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`
const INCLUDE = 'include_adult=false&include_video=false'

export function filterGlobal(order, page) {
    const REQUEST_ADRESS = `${URL_DISCOVER}&sort_by=${order}&${INCLUDE}&page=${page}&with_watch_monetization_types=flatrate`
    return baseFetch(REQUEST_ADRESS);
}

function baseFetch(REQUEST_ADRESS) {
    return fetch(REQUEST_ADRESS)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).catch(error => alert(errorNot));
}


