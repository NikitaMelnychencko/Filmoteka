import { renderGallery, renderMovies } from '../layout/gallery';
import { filterGlobal } from './fetch_filter_sort'
<<<<<<< HEAD
const body = document.querySelector('body')
=======
import svg from '../../images/svg/svg.svg'
// import { renderMovieGlobal } from '../components/fetch';
const main = document.querySelector('.hero')
const body = document.querySelector('body')
const hero = document.querySelector('.gallery')
console.log(hero);
>>>>>>> bug-fix_change-Render-Gallery


<<<<<<< HEAD
=======
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
>>>>>>> bug-fix_change-Render-Gallery
let sort = '';
let genre = '';
let year = '';

body.addEventListener('click', el => {
    if (el.target.nodeName !== "INPUT") {
        testOnOpen()
    }
})

function refsFilter() {
    const refs = {
        InputSort: document.querySelector('.filter-input__sort'),
        listSort: document.querySelector('.filter-list__sort'),
        inputGenres: document.querySelector('.filter-input__genres'),
        filterList: document.querySelector('.filter-list__genres'),
        listGenres: document.querySelector('.filter-list__genres'),
        inputYear: document.querySelector('.filter-input__year'),
        listYear: document.querySelector('.filter-list__year'),
        itemYear: document.querySelectorAll('.filter-item__year'),
        body: document.querySelector('body'),
        button: document.querySelector('.button__filter-clear'),
        searchHome: document.querySelector('.search-form__input'),
    }
    return refs
}


export function initFilter() {
    refsFilter().InputSort.addEventListener('click', onOpenListSorts);
    refsFilter().listSort.addEventListener('click', onRenderSort);
    refsFilter().inputGenres.addEventListener('click', onOpenListGenres);
    refsFilter().filterList.addEventListener('click', onRenderGenre);
    refsFilter().inputYear.addEventListener('click', onOpenListYear);
    refsFilter().listYear.addEventListener('click', onRenderYear);
    refsFilter().button.addEventListener('click', el => {
        el.preventDefault()
        renderGallery('home');
        refsFilter().InputSort.value = '';
        refsFilter().inputGenres.value = '';
        refsFilter().inputYear.value = '';
        refsFilter().listYear.classList.remove('open');
        testOnOpen()
    })
    refsFilter().searchHome.addEventListener('click', el => {
        testOnOpen()
    })
}

function onOpenListSorts(evt) {
    evt.preventDefault()
    refsFilter().InputSort.value = '';
    removeClassOpenYearGenres()
    refsFilter().listSort.classList.toggle('open')
}

function onRenderSort(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'LI') {
        return;
    } else {
        refsFilter().listSort.classList.remove('open')
        refsFilter().InputSort.value = evt.target.textContent
    }
    sort = evt.target.dataset.atribute;
    console.log(year, sort, genre)
    renderGallery('sort', year, sort, genre);
};

// genre
function onOpenListGenres(evt) {
    evt.preventDefault();
    refsFilter().inputGenres.value = '';
    refsFilter().listGenres.classList.toggle('open');
    removeClassOpenYearSort()
}

function onRenderGenre(evt) {
    evt.preventDefault()
    if (evt.target.nodeName !== 'LI') {
        return;
    } else {
        refsFilter().listGenres.classList.remove('open');
        refsFilter().inputGenres.value = evt.target.textContent
        genre = evt.target.id
    }
    renderGallery('sort', year, sort, genre);
}

function onOpenListYear(evt) {
    evt.preventDefault();
    refsFilter().inputYear.value = '';
    refsFilter().listYear.classList.toggle('open')
    removeClassOpenGenresSort()
}

function onRenderYear(evt) {
    evt.preventDefault()
    console.log(evt.target);
    if (evt.target.nodeName !== 'LI') {
        return
    } else {
        refsFilter().listYear.classList.remove('open');
        refsFilter().inputYear.value = evt.target.textContent;
        year = evt.target.textContent;
    }
    renderGallery('sort', year, sort, genre);
}

// remove Open
function removeClassOpenYearGenres() {
    refsFilter().listYear.classList.remove('open');
    refsFilter().listGenres.classList.remove('open');
}

function removeClassOpenYearSort() {
    refsFilter().listYear.classList.remove('open');
    refsFilter().listSort.classList.remove('open');
}

function removeClassOpenGenresSort(open, open, open) {
    refsFilter().listGenres.classList.remove('open');
    refsFilter().listSort.classList.remove('open');
}




// Clear Filter
function testOnOpen() {
    refsFilter().listYear.classList.remove('open');
    refsFilter().listGenres.classList.remove('open');
    refsFilter().listSort.classList.remove('open');
}

