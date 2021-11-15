
const API_KEY = '843d6905879c9b52f41f5f6a1e2c8966';
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`;


export function filterGlobalYear(year, page) {
    const REQUEST_ADRESS = `${BASE_URL}&include_adult=false&include_video=false&page=${page}&year=1995&with_watch_monetization_types=flatrate`
    return baseFetch(REQUEST_ADRESS)
}

function baseFetch(REQUEST_ADRESS) {
    return fetch(REQUEST_ADRESS)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).catch(error => alert(errorNot));
}



