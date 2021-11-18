import { renderGallery, renderMovies } from '../layout/gallery';
import filter from '../../views/components/filter/filter_sort.hbs';
import { filterGlobal } from './fetch_filter_sort'
import svg from '../../images/svg/svg.svg'
// import { renderMovieGlobal } from '../components/fetch';
const main = document.querySelector('.hero')
const body = document.querySelector('body')
const hero = document.querySelector('.gallery')
console.log(hero);

let valueSort = '';
let valueGenre = '';
let valueYear = '';
let test = ""

function filterMain() {
    const markup = filter({ svg })
    hero.insertAdjacentHTML("beforebegin", markup);
}
filterMain();

const refs = {
    InputSort: document.querySelector('.filter-input__sort'),
    listOpenSort: document.querySelector('.filter-list__sort'),
    inputGenres: document.querySelector('.filter-input__genres'),
    filterList: document.querySelector('.filter-list__genres'),
    listGenres: document.querySelector('.filter-list__genres'),
    inputYear: document.querySelector('.filter-link__year'),
    listYear: document.querySelector('.filter-list__year'),
    itemYear: document.querySelectorAll('.filter-item__year'),
    body: document.querySelector('body'),
    buttom: document.querySelector('.button__filter-clear'),
}
let sort = '';

refs.InputSort.addEventListener('click', onOpenListSorts);
refs.listOpenSort.addEventListener('click', onRenderFilter);

function onOpenListSorts(evt) {
    evt.preventDefault()
    refs.InputSort.value = '';
    removeClassOpenYearGenres()
    refs.listOpenSort.classList.toggle('open')
}

function onRenderFilter(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'LI') {
        return;
    } else {
        refs.listOpenSort.classList.remove('open')
        refs.InputSort.value = evt.target.textContent
    }
    sort = evt.target.dataset.atribute;
    console.log(year, sort, genre)
    renderGallery('sort', year, sort, genre);
};

// genre
let genre = ''
refs.inputGenres.addEventListener('click', onOpenListGenres);
refs.filterList.addEventListener('click', onRenderGenre);

function onOpenListGenres(evt) {
    evt.preventDefault();
    refs.inputGenres.value = '';
    refs.listGenres.classList.toggle('open');
    removeClassOpenYearSort()
}

function onRenderGenre(evt) {
    evt.preventDefault()
    if (evt.target.nodeName !== 'LI') {
        return;
    } else {
        refs.listGenres.classList.remove('open');
        refs.inputGenres.value = evt.target.textContent
        genre = evt.target.id
    }
    renderGallery('sort', year, sort, genre);
}


// year
let year = '';
refs.inputYear.addEventListener('click', onOpenListYear);
refs.listYear.addEventListener('click', onTest);

function onOpenListYear(evt) {
    evt.preventDefault();
    refs.inputYear.value = '';
    refs.listYear.classList.toggle('open')
    removeClassOpenGenresSort()
}

function onTest(evt) {
    evt.preventDefault()
    console.log(evt.target);
    if (evt.target.nodeName !== 'LI') {
        return

    } else {
        refs.listYear.classList.remove('open');
        refs.inputYear.value = evt.target.textContent;
        year = evt.target.textContent;
    }
    renderGallery('sort', year, sort, genre);
}


// remove Open
function removeClassOpenYearGenres() {
    refs.listYear.classList.remove('open');
    refs.listGenres.classList.remove('open');

}

function removeClassOpenYearSort() {
    refs.listYear.classList.remove('open');
    refs.listOpenSort.classList.remove('open');
}

function removeClassOpenGenresSort() {
    refs.listGenres.classList.remove('open');
    refs.listOpenSort.classList.remove('open');
}




// Clear Filter
refs.buttom.addEventListener('click', el => {
    el.preventDefault()
    renderGallery('home');
    refs.InputSort.value = '';
    refs.inputGenres.value = '';
    refs.inputYear.value = '';
})
