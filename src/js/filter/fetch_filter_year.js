
const API_KEY = '843d6905879c9b52f41f5f6a1e2c8966';
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`;


export function filterGlobalYear(year, page) {
    const REQUEST_ADRESS = `${BASE_URL}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&year=1992&with_watch_monetization_types=flatrate`
    console.log(REQUEST_ADRESS);
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



