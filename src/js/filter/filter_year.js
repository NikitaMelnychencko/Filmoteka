import { filterGlobalYear } from './fetch_filter_year';
import { renderMovieGlobal } from '../components/fetch';
import { renderGallery, renderMovies } from '../layout/gallery';
import yearRend from '../../views/components/filter/filter_sort.hbs';
import { removeClassOpen } from './filter_sort';
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