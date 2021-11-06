
export function apiServiceHomePage(page) {
    return fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=843d6905879c9b52f41f5f6a1e2c8966&page=${page}`)
        .then(response => {
            console.log(response);
            return response.json();
        }).catch(error => alert(errorNot));
};


export function apiServiceSeorch(searchQuery, page) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=843d6905879c9b52f41f5f6a1e2c8966&query=${searchQuery}&page=${page}`)
        .then(response => {
            console.log(response);
            return response.json();
        }).catch(error => alert(errorNot));
};

export function apiServiceSeorchParam() {
    return fetch(`https://api.themoviedb.org/3/movie/{movie_id}?api_key=843d6905879c9b52f41f5f6a1e2c8966&language=en-US`)
        .then(response => {
            console.log(response);
            return response.json();
        }).catch(error => alert(errorNot));
};
