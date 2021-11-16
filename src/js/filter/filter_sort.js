import { renderGallery } from '../layout/gallery';
import filter from '../../views/components/filter/filter_sort.hbs';
import { filterGlobal } from './fetch_filter_sort'
const main = document.querySelector('.hero');

export function filterMain() {
    const markup = filter()
    main.insertAdjacentHTML("beforeend", markup);
}

filterMain();

const filterList = document.querySelector('.filter-list__sort');
filterList.addEventListener('click', onRenderFilter)

function onRenderFilter(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'LI') {
        return;
    }
    const link = evt.target.dataset.atribute;
    renderGallery('sort', '', link);
};

const containerSort = document.querySelector('.filter__movie-sort');
containerSort.addEventListener('click', onOpenListSorts);
const listOpenSort = document.querySelector('.filter-list__sort');

function onOpenListSorts(evt) {
    evt.preventDefault()
    if (evt.target.nodeName !== 'A') {
        listOpenSort.classList.remove('open')
    } else {
        removeClassOpen()
        listOpenSort.classList.toggle('open')
    }
}

function removeClassOpen() {
    const listGenres = document.querySelector('.filter-list__genres');
    const listYear = document.querySelector('.filter-list__year');
    listYear.classList.remove('open')
    listGenres.classList.remove('open')
}



// filterGlobal("popularity.asc", 1, 2010, 28)
