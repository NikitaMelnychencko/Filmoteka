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
    renderGallery('sort', 'filter', idGenres);
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

const linkOpenGenres = document.querySelector('.filter-link__genres');
const listGenres = document.querySelector('.filter-list__genres');
linkOpenGenres.addEventListener('click', onOpenListGenres);
function onOpenListGenres(evt) {
    evt.preventDefault();
    if (evt.target === linkOpenGenres) {
        listGenres.classList.toggle('open');
    } else {
        listGenres.classList.remove('open');
    }

}