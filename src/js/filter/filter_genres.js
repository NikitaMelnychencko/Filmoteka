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

const containerGenres = document.querySelector('.filter__movie-genres');
const listGenres = document.querySelector('.filter-list__genres');

containerGenres.addEventListener('click', onOpenListGenres);
function onOpenListGenres(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'A') {
        listGenres.classList.remove('open');
    } else {
        removeClassOpen()
        listGenres.classList.toggle('open');
    }
}

function removeClassOpen() {
    const listOpenSort = document.querySelector('.filter-list__sort');
    const listYear = document.querySelector('.filter-list__year');
    listYear.classList.remove('open');
    listOpenSort.classList.remove('open');

}