import { renderGallery } from '../layout/gallery';

let sort = '';
let genre = '';
let year = '';

function refsFilter() {
    const refs = {
        inputSort: document.querySelector('.filter-input__sort'),
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
        blockInput: document.querySelector('.filter-inputs'),
        filterContainer: document.querySelector('.filter'),
        arrowInput: document.querySelector('.filter__movie-sort'),
        openBtn: document.querySelector('.button__filter-clear--open-btn'),

    }
    return refs
}

export function initFilter() {
    refsFilter().inputSort.addEventListener('click', onOpenListSorts);
    refsFilter().listSort.addEventListener('click', onRenderSort);
    refsFilter().inputGenres.addEventListener('click', onOpenListGenres);
    refsFilter().listGenres.addEventListener('click', onRenderGenre);
    refsFilter().inputYear.addEventListener('click', onOpenListYear);
    refsFilter().listYear.addEventListener('click', onRenderYear);
    refsFilter().button.addEventListener('click', el => {
        el.preventDefault()
        renderGallery(1, 'home');
        refsFilter().inputSort.value = '';
        refsFilter().inputGenres.value = '';
        refsFilter().inputYear.value = '';
        removeClass(refsFilter().listYear);
        removeOpen();
        refsFilter().button.setMode;
        refsFilter().button.classList.add('button__filter-clear--open-btn');
    })
    refsFilter().searchHome.addEventListener('click', el => {
        removeOpen()
    })
}

// clear EventListener
function onClearEventListener(el) {
    refsFilter().body.addEventListener('click', onClearEventListener);
    if (el.target.nodeName !== 'INPUT') {
        removeOpen();
        refsFilter().body.removeEventListener('click', onClearEventListener);
        removeTransform()

    }
}

// sort
function onOpenListSorts(evt) {
    evt.preventDefault();
    toggleTransform(evt);
    onClearEventListener(evt);
    refsFilter().inputSort.value = '';
    removeClass(refsFilter().listYear, refsFilter().listGenres);
    refsFilter().listSort.classList.toggle('open');
    removeTransformNextElement(refsFilter().inputGenres, refsFilter().inputYear)
}

function onRenderSort(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'LI') {
        return;
    } else {
        removeClass(refsFilter().listSort)
        refsFilter().inputSort.value = evt.target.textContent;
    }
    sort = evt.target.dataset.atribute;
    renderGallery(1, 'sort', year, sort, genre);
    if (evt.target.dataset.atribute !== sort) {
        return
    } else if (refsFilter().openBtn) {
        refsFilter().openBtn.classList.remove('button__filter-clear--open-btn')
    }
};

// genre
function onOpenListGenres(evt) {
    evt.preventDefault();
    toggleTransform(evt);
    onClearEventListener(evt);
    refsFilter().inputGenres.value = '';
    refsFilter().listGenres.classList.toggle('open');
    removeClass(refsFilter().listYear, refsFilter().listSort);
    removeTransformNextElement(refsFilter().inputYear, refsFilter().inputSort)
}

function onRenderGenre(evt) {
    evt.preventDefault()
    if (evt.target.nodeName !== 'LI') {
        return;
    } else {
        removeClass(refsFilter().listGenres)
        refsFilter().inputGenres.value = evt.target.textContent
        genre = evt.target.id
    }
    if (evt.target.id !== genre) {
        return
    } else if (refsFilter().openBtn) {
        refsFilter().openBtn.classList.remove('button__filter-clear--open-btn')
    }
    renderGallery(1, 'sort', year, sort, genre);
}

// year
function onOpenListYear(evt) {
    evt.preventDefault();
    toggleTransform(evt);
    onClearEventListener(evt);
    refsFilter().inputYear.value = '';
    refsFilter().listYear.classList.toggle('open');
    removeClass(refsFilter().listGenres, refsFilter().listSort);
    removeTransformNextElement(refsFilter().inputGenres, refsFilter().inputSort)

}

function onRenderYear(evt) {
    evt.preventDefault()
    onClearEventListener(evt)
    if (evt.target.nodeName !== 'LI') {
        return
    } else {
        removeClass(refsFilter().listYear);
        refsFilter().inputYear.value = evt.target.textContent;
        year = evt.target.textContent;
    }
    if (!year) {
        return
    } else if (refsFilter().openBtn) {
        refsFilter().openBtn.classList.remove('button__filter-clear--open-btn')
    }
    renderGallery(1, 'sort', year, sort, genre);
}

// remove Open
function removeClass(refsFirst, refsSecond, refsThird) {
    refsFirst.classList.remove('open');
    if (refsSecond !== undefined) {
        refsSecond.classList.remove('open');
    }
    if (refsThird !== undefined) {
        refsThird.classList.remove('open');
    }
}

// Clear Filter
function removeOpen() {
    removeClass(
        refsFilter().listYear,
        refsFilter().listGenres,
        refsFilter().listSort,
    );
}

export function hideFilter(condition) {
    if (condition) {
        refsFilter().filterContainer.classList.add('hide-filter');
    } else {
        refsFilter().filterContainer.classList.remove('hide-filter');
    }
}

// rotate Arrow Functions
function toggleTransform(evt) {
    evt.target.nextElementSibling.classList.toggle('transform');
}

function removeTransformNextElement(inputSort, inputGenres, inputYear) {
    inputSort.nextElementSibling.classList.remove('transform');


    if (inputGenres !== undefined) {
        inputGenres.nextElementSibling.classList.remove('transform');
    }
    if (inputYear !== undefined) {
        inputYear.nextElementSibling.classList.remove('transform');
    }

}
function removeTransform() {
    removeTransformNextElement(
        refsFilter().inputSort,
        refsFilter().inputGenres,
        refsFilter().inputYear,
    )
}


