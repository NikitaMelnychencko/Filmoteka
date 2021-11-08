import main from '../../views/layout/main.hbs'
import card from '../../views/components/card_galery.hbs'
import { renderMuvieGlobal, genreMovie } from '../components/fetch.js'
//test

const genreDB = new Map(
    JSON.parse('[{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]')
        .map(i => [i.id, i.name]));

console.log(genreDB);

const gallery = document.querySelector('.gallery-list');

console.log(gallery)

function renderCards(data) {
    const movies = data.results;
    gallery.insertAdjacentHTML('afterbegin', card(movies));
}

const page = 1;

renderMuvieGlobal(page, '', '', 'home').then(showCards);



function showCards(data) {
    //console.log(data.results);
    data.results.map(movie => {
        // console.log(movie.release_date);
        // console.log(movie.release_date.slice(0, 4));
        // console.log(movie.vote_average.toFixed(1));
        movie.vote_average = movie.vote_average.toFixed(1);
        movie.release_date = movie.release_date.slice(0, 4);
        // console.log(movie.genre_ids);
        movie.genre_ids = movie.genre_ids.map(genre => genreDB.get(genre));//{
        // console.log(genre)
        //genreDB[genre]
        //.find(gen => { if (gen.id == genre) { genre = gen.name } })

        // for (let i = 0; i < genreDB.length; i += 1) {

        //     // console.log('DB', genreDB[i].id)
        //     // console.log('name', genreDB[i].name)
        //     if (genre == genreDB[i].id) {
        //         genre = genreDB[i].name;
        //         // console.log(genreDB[i].name);
        //     }
        //     //return genre;
        //     //else { return }
        // }
        //return genre;
        //});
        movie.genre_ids = movie.genre_ids.join(", ");
    });
    //console.log(data.results);
    renderCards(data);
};


console.log((genreMovie().then(show)));

function show(data) {
    console.log(data);
    return data;
}