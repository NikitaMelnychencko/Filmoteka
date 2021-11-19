import { refs } from '../refs/refs'
import { renderGallery } from '../layout/gallery'
import scrollTo from './scroll_too';
import pagination from '../../views/components/pagination_list.hbs'
import svg from '../../images/svg/svg.svg';

const MAX_SHOWN_PAGES = 9;
const PAGES_GAP = 2;
const STEPS = new Map([
    ['previous', -1],
    ['next', 1],
    ['begin', -5],
    ['end', +5],
])

let pagesContainer = refs.main.querySelector('.pagination-container');

let currentPage = 1;
let totalPages = 0;

export function primaryPagination() {
    pagesContainer = refs.main.querySelector('.pagination-container');
    pagesContainer.addEventListener('click', onPageClick);
}

function onPageClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'BUTTON') {
        return;
    };

    const pressedButton = e.target;

    renderGallery('', '', '', '', getNextPage(pressedButton))
    scrollTo()
}

function getNextPage(button) {
    const currentPage = Number(refs.main.querySelector('.page-button--active').textContent);
    let nextPage = Number(button.textContent);

    if (STEPS.get(button.dataset.move)) {
        nextPage = currentPage + STEPS.get(button.dataset.move);
    }
    return nextPage;
}

export function renderPagination(current, total) {
    currentPage = current;
    totalPages = total;

    if (totalPages === 0) {
        clearPagination();
        return
    }

    pagesContainer.classList.remove('pagination-container--hidden');
    pagesContainer.innerHTML = pagination(createPagination());

    disableArrows();

    return currentPage;
}

function disableArrows() {
    switchDisable('arrow-button--previous', currentPage === 1);
    switchDisable('arrow-button--next', currentPage === totalPages);
    switchDisable('page-button--active', currentPage);
}

function switchDisable(button, condition) {
    searchButtonByName(button).disabled = condition;
}

function searchButtonByName(className) {
    const button = pagesContainer.querySelector(`.${className}`);
    return button;
}

function createPagination() {
    const icon = `<svg class='page-button-svg'><use href=${svg}#icon-arrow-left ></use>`;
    const buttonsArray = [createButton(icon, 'to previous page', 'arrow-button arrow-button--previous', 'previous')];

    const center = Math.ceil(MAX_SHOWN_PAGES / 2);

    if (totalPages <= MAX_SHOWN_PAGES) {
        buttonsArray.push(...createNumericButton(1, totalPages));
    } else {
        buttonsArray.push(isActive(1));
        if (currentPage <= center) {
            buttonsArray.push(...createNumericButton(2, center + PAGES_GAP));
            buttonsArray.push(createButton('...', 'to 5 next pages', 'end page-button--mobile-hidden', 'end'));
        } else {
            if (currentPage <= totalPages - center) {
                buttonsArray.push(createButton('...', 'to 5 previous pages', 'begin page-button--mobile-hidden', 'begin'));
                buttonsArray.push(...createNumericButton(currentPage - PAGES_GAP, currentPage + PAGES_GAP));
                buttonsArray.push(createButton('...', 'to 5 next pages', 'end page-button--mobile-hidden', 'end'));
            } else {
                buttonsArray.push(createButton('...', 'to 5 previous pages', 'begin page-button--mobile-hidden', 'begin'));
                buttonsArray.push(...createNumericButton(totalPages - center - 1, totalPages - 1));
            }
        }
        buttonsArray.push(isActive(totalPages));
    }
    buttonsArray.push(createButton(icon, 'to next page', 'arrow-button arrow-button--next', 'next'));
    return buttonsArray;
}

function createNumericButton(from, to) {
    let pages = [];
    for (let p = from; p <= to; p += 1) {
        pages.push(isActive(p));
    }
    return pages;
}

function isActive(page) {
    if (page == currentPage) {
        return createButton(page, page, 'page-button--active');
    } else {
        return hideForMobile(page);
    }
}

function hideForMobile(page) {
    if (totalPages <= MAX_SHOWN_PAGES - 4) {
        return createButton(page, page, '');
    }
    if (currentPage <= 1 + PAGES_GAP) {
        if (page <= 5) {
            return createButton(page, page, '');
        } else {
            return createButton(page, page, 'page-button--mobile-hidden');
        }
    }
    if (currentPage < totalPages - PAGES_GAP) {
        if (page >= currentPage - PAGES_GAP && page <= currentPage + PAGES_GAP) {
            return createButton(page, page, '');
        } else {
            return createButton(page, page, 'page-button--mobile-hidden');
        }
    }
    if (page >= totalPages - 4) {
        return createButton(page, page, '');
    } else {
        return createButton(page, page, 'page-button--mobile-hidden');
    }
}

function createButton(page, label, className, dataMove) {
    const button = {
        page,
        label,
        classes: 'page-button ' + className,
        step: dataMove,
    }
    return button;
}

function clearPagination() {
    pagesContainer.classList.add('pagination-container--hidden');
    pagesContainer.innerHTML = '';
}