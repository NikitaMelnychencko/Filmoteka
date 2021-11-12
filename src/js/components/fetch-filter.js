
const API_KEY = '843d6905879c9b52f41f5f6a1e2c8966';
const BASE_URL = 'https://api.themoviedb.org/3';

export function filterGlobal(releaseDateDesc, releaseDateAsk) {
    if (releaseDateDesc === 'primary_release_date.desc') {
        const REQUEST_ADRESS = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${releaseDateDesc}&&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        return baseFetch(REQUEST_ADRESS);

    } else if (releaseDateAsk === 'primary_release_date.asc') {
        const REQUEST_ADRESS = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${releaseDateAsk}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        return baseFetch(REQUEST_ADRESS);
    }
}
function baseFetch(REQUEST_ADRESS) {
    return fetch(REQUEST_ADRESS)
        .then(response => {
            if (response.status === 200 || response.status === 422) {
                return response.json();
            }
        }).catch(error => alert(errorNot));
}

