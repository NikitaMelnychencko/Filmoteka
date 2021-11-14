import { filterGlobalGenres } from './fetch_filter_genres';
import { renderGallery, renderMovies } from '../layout/gallery';
const main = document.querySelector('.hero')
let idGenres = ''

function filterGenre() {
    filterGlobalGenres(idGenres)
        .then(data => {
            console.log(data);
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}

const filterList = document.querySelector('.filter-list__genres');
// filterList.addEventListener('click', onRenderGenre);

function onRenderGenre(evt) {
    evt.preventDefault()
    idGenres = evt.target.id
    filterGenre(idGenres)
}