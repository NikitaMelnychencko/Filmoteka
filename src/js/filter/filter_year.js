import { filterGlobalYear } from './fetch_filter_year';
import { renderMovieGlobal } from '../components/fetch';
import { renderGallery, renderMovies } from '../layout/gallery';
import yearRend from '../../views/components/filter/filter_sort.hbs';
let year = '';
const containerYear = document.querySelector('.filter__movie-year');
const listYear = document.querySelector('.filter-list__year');
const itemYear = document.querySelectorAll('.filter-item__year');

containerYear.addEventListener('click', onOpenListYear);

let releaseDate = '';

function onOpenListYear(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'A') {
        listYear.classList.remove('open')
    } else {
        removeClassOpen()
        listYear.classList.toggle('open')
    }
}

itemYear.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        releaseDate = e.target.textContent
        renderGallery(releaseDate)
    })
})

function onRenderYear() {
    filterGlobalYear(year, '')
        .then(data => {
            renderMovies(data.results)
        })
}

function removeClassOpen() {
    const listOpenSort = document.querySelector('.filter-list__sort');
    const listGenres = document.querySelector('.filter-list__genres');
    listGenres.classList.remove('open');
    listOpenSort.classList.remove('open');

}