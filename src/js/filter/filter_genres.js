import { filterGlobalGenres } from './fetch_filter_genres';
import { renderGallery, renderMovies } from '../layout/gallery';
const main = document.querySelector('.hero')

let idGenres = ''

const filterList = document.querySelector('.filter__movie-genres');
filterList.addEventListener('click', onRenderGenre);

function onRenderGenre(evt) {
    evt.preventDefault()
    if (evt.target.nodeName !== 'LI') {
        return;
    }
    idGenres = evt.target.id
    filterGenre(idGenres)
}
function filterGenre() {
    filterGlobalGenres(idGenres)
        .then(data => {

            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}
