import { renderGallery, renderMovies } from '../layout/gallery';
import filter from '../../views/components/filter/filter_sort.hbs';
import { filterGlobal } from './fetch_filter_sort'
// import { renderMovieGlobal } from '../components/fetch';

const main = document.querySelector('.hero')
let value = ''

export function filterMain() {
    const markup = filter()
    main.insertAdjacentHTML("beforeend", markup);
}
filterMain();


const filterListSort = document.querySelector('.filter-list__sort');
filterListSort.addEventListener('click', onRenderFilter)

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
console.log(containerSort);
const listOpenSort = document.querySelector('.filter-list__sort');

function onOpenListSorts(evt) {
    evt.preventDefault()
    if (evt.target.nodeName !== 'INPUT') {
        listOpenSort.classList.remove('open')
    } else {
        // removeClassOpen()
        listOpenSort.classList.toggle('open')
    }
}
// filterGlobal("popularity.asc", 1, 2010, 28)

// genre

let genre = ''

const filterList = document.querySelector('.filter__movie-genres');
filterList.addEventListener('input', onRenderGenre);

function onRenderGenre(evt) {
    evt.preventDefault()
    console.log(evt.target);
    if (evt.target.nodeName !== 'LI') {
        return;
    }
    genre = evt.target.id
    console.log(genre);
    renderGallery('filter', '', genre);
}
function filterGenre() {
    filterGlobal('', '', '', genre)
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
    if (evt.target.nodeName !== 'INPUT') {
        listGenres.classList.remove('open');
    } else {
        // removeClassOpen()
        listGenres.classList.toggle('open');
    }

}
// year

let year = '';
const containerYear = document.querySelector('.filter__movie-year');
const listYear = document.querySelector('.filter-list__year');
const itemYear = document.querySelectorAll('.filter-item__year');
containerYear.addEventListener('input', onOpenListYear);
itemYear.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        releaseDate = e.target.textContent
        renderGallery(releaseDate)
    })
})

function onOpenListYear(evt) {
    evt.preventDefault();
    console.log(evt.target);
    if (evt.target.nodeName !== 'INPUT') {
        listYear.classList.remove('open')
    } else {
        // removeClassOpen()
        listYear.classList.toggle('open')
    }
}

function onRenderYear() {
    filterGlobal(year, '')
        .then(data => {
            console.log(data.results);
            renderMovies(data.results)
        })
}
// onRenderYear()
function removeClassOpen() {
    const listOpenSort = document.querySelector('.filter-list__sort');
    const listGenres = document.querySelector('.filter-list__genres');
    const listYear = document.querySelector('.filter-list__year');
    listYear.classList.remove('open');
    listGenres.classList.remove('open');
    listOpenSort.classList.remove('open');
}
