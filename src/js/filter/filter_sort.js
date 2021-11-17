import { renderGallery, renderMovies } from '../layout/gallery';
import { filterGlobal } from './fetch_filter_sort'
const body = document.querySelector('body')

body.addEventListener('click', el => {
    if (el.target.nodeName !== "INPUT") {
        testOnOpen()
    }
})

let sort = '';
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
let genre = ''


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


// year
let year = '';





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

function removeClassOpenGenresSort() {
    refsFilter().listGenres.classList.remove('open');
    refsFilter().listSort.classList.remove('open');
}




// Clear Filter


function testOnOpen() {
    refsFilter().listYear.classList.remove('open');
    refsFilter().listGenres.classList.remove('open');
    refsFilter().listSort.classList.remove('open');
}

