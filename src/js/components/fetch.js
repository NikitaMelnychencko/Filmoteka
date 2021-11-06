
export function renderMuvieGlobal(page, searchQuery, movie_id, options) {
    if (options === 'home') { // Для рендера Вызов функции renderMuvieGlobal(page, '', '', home) для страници "Home"
        const BASEURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=843d6905879c9b52f41f5f6a1e2c8966&page=${page}`
        return baseFetch(BASEURL);


    } else if (searchQuery !== undefined) { //Для рендера Вызов функции renderMuvieGlobal(page, searchQuery) для "input"
        const BASEURL = (`https://api.themoviedb.org/3/search/movie?api_key=843d6905879c9b52f41f5f6a1e2c8966&query=${searchQuery}&page=${page}`)
        return baseFetch(BASEURL);
    } else {
        const BASEURL = (`https://api.themoviedb.org/3/movie/{movie_id}?api_key=843d6905879c9b52f41f5f6a1e2c8966&language=en-US`)
        return baseFetch(BASEURL);
    }
}
function baseFetch(BASEURL) {
    return fetch(BASEURL)
        .then(response => {
            return response.json();
        }).catch(error => alert(errorNot));
}