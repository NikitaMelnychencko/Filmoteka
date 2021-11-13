
const API_KEY = '843d6905879c9b52f41f5f6a1e2c8966';
const BASE_URL = 'https://api.themoviedb.org/3';


export function filterGlobalGenres(genres) {
    if (popularityDesc === 'popularity.desc') {
        const REQUEST_ADRESS = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&genres=${genres}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        console.log(REQUEST_ADRESS);
        return baseFetch(REQUEST_ADRESS).then(data => {
            console.log(data);

        });
    }
}


function baseFetch(REQUEST_ADRESS) {
    return fetch(REQUEST_ADRESS)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).catch(error => alert(errorNot));
}



