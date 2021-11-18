import { child } from 'firebase/database';
import { renderGallery } from '../layout/gallery';

let sort = '';
let genre = '';
let year = '';


function refsFilter() {
    const refs = {
        InputSort: document.querySelector('.filter-input__sort'),
        listSort: document.querySelector('.filter-list__sort'),
        inputGenres: document.querySelector('.filter-input__genres'),
        listGenres: document.querySelector('.filter-list__genres'),
        inputYear: document.querySelector('.filter-input__year'),
        listYear: document.querySelector('.filter-list__year'),
        itemYear: document.querySelectorAll('.filter-item__year'),
        body: document.querySelector('body'),
        button: document.querySelector('.button__filter-clear'),
        searchHome: document.querySelector('.search-form__input'),
        hero: document.querySelector('.gallery'),
        arrowInput: document.querySelector('.filter-icon'),
        blockInput: document.querySelector('.filter-inputs'),
        filterContainer: document.querySelector('.filter'),
    }
    return refs
}

export function initFilter() {
    refsFilter().InputSort.addEventListener('click', onOpenListSorts);
    refsFilter().listSort.addEventListener('click', onRenderSort);
    refsFilter().inputGenres.addEventListener('click', onOpenListGenres);
    refsFilter().listGenres.addEventListener('click', onRenderGenre);
    refsFilter().inputYear.addEventListener('click', onOpenListYear);
    refsFilter().listYear.addEventListener('click', onRenderYear);
    refsFilter().blockInput.addEventListener('click', onToggleArrowInput);
    refsFilter().button.addEventListener('click', el => {
        el.preventDefault()
        renderGallery('home');
        refsFilter().InputSort.value = '';
        refsFilter().inputGenres.value = '';
        refsFilter().inputYear.value = '';
        refsFilter().listYear.classList.remove('open');
        removeOpen()
    })
    refsFilter().searchHome.addEventListener('click', el => {
        removeOpen()
    })
}
// clear EventListener
function onClearEventListener(el) {
    refsFilter().body.addEventListener('click', onClearEventListener);
    if (el.target.nodeName !== "INPUT") {
        removeOpen();
        refsFilter().body.removeEventListener('click', onClearEventListener)
    }
}


// sort 
function onOpenListSorts(el) {
    el.preventDefault()
    onClearEventListener(el)
    refsFilter().InputSort.value = '';
    removeClassOpenYearGenres();
    refsFilter().listSort.classList.toggle('open');
}

function onRenderSort(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'LI') {
        return;
    } else {
        refsFilter().listSort.classList.remove('open');
        refsFilter().InputSort.value = evt.target.textContent;
    }
    sort = evt.target.dataset.atribute;
    renderGallery('sort', year, sort, genre);
};

// genre
function onOpenListGenres(evt) {
    evt.preventDefault();
    onClearEventListener(evt)
    refsFilter().inputGenres.value = '';
    refsFilter().listGenres.classList.toggle('open');
    removeClassOpenYearSort();
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
function onOpenListYear(evt) {
    evt.preventDefault();
    onClearEventListener(evt)
    refsFilter().inputYear.value = '';
    refsFilter().listYear.classList.toggle('open');
    removeClassOpenGenresSort();
}

function onRenderYear(evt) {
    evt.preventDefault()
    onClearEventListener(evt)
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
function removeOpen() {
    refsFilter().listYear.classList.remove('open');
    refsFilter().listGenres.classList.remove('open');
    refsFilter().listSort.classList.remove('open');
}

export function hideFilter(condition) {
    if (condition) {
        refsFilter().filterContainer.classList.add('hide-filter');
    } else {
        refsFilter().filterContainer.classList.remove('hide-filter');
    }
}

// animation Arrow input
function onToggleArrowInput(evt) {
    // console.log(refsFilter().listSort.classList('.open'));

    console.log(evt.nextElementSibling);
    // if (evt.target === child.classList === 'open') {

    //     refsFilter().arrowInput.classList.toggle('transform');
    // }
}




