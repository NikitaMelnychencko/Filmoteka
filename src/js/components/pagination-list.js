import { refs } from '../refs/refs.js'
import { renderGallery } from '../layout/gallery'
import pagination from '../../views/components/pagination_list.hbs'
import svg from '../../images/svg/svg.svg';
import scrollTo from './scroll_too.js';



const MAX_SHOWN_PAGES = 9;
const PAGES_GAP = 2;
const STEPS = new Map([
    ['previous', -1],
    ['next', 1],
    ['begin', -5],
    ['end', +5],
])

let pagesContainer = refs.main.querySelector('.pagination-container');

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

    renderGallery('', '', '', getNextPage(pressedButton))
    scrollTo()
}

function getNextPage(button) {
    const currentPage = Number(refs.main.querySelector('.page-button--active').textContent);
    let nextPage = Number(button.textContent);

    if (STEPS.get(button.dataset.move)) {
        nextPage = currentPage + STEPS.get(button.dataset.move)
    }
    return nextPage;
}

export function renderPagination(currentPage, totalPages) {
    if (totalPages === 0) {
        clearPagination();
        return
    }

    pagesContainer.classList.remove('pagination-container--hidden')
    pagesContainer.innerHTML = pagination(createPagination(currentPage, totalPages))

    disableArrows(currentPage, totalPages);

    return currentPage;
}

function disableArrows(currentPage, totalPages) {
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

function createPagination(currentPage, totalPages) {
    const icon = `<svg class='page-button-svg'><use href=${svg}#icon-arrow-left ></use>`
    const buttonsArray = [createButton(icon, 'arrow-button arrow-button--previous', 'previous')];

    const center = Math.ceil(MAX_SHOWN_PAGES / 2);

    if (totalPages <= MAX_SHOWN_PAGES) {
        for (let p = 1; p <= totalPages; p += 1) {
            buttonsArray.push(isActive(p, currentPage, totalPages))
        }
    } else {
        buttonsArray.push(isActive(1, currentPage, totalPages));
        if (currentPage <= center) {
            for (let p = 2; p <= center + PAGES_GAP; p += 1) {
                buttonsArray.push(isActive(p, currentPage, totalPages));
            }
            buttonsArray.push(createButton('...', 'end page-button--mobile-hidden', 'end'));
        } else {
            if (currentPage <= totalPages - center) {
                buttonsArray.push(createButton('...', 'begin page-button--mobile-hidden', 'begin'));
                for (let p = currentPage - PAGES_GAP; p <= currentPage + PAGES_GAP; p += 1) {
                    buttonsArray.push(isActive(p, currentPage, totalPages));
                }
                buttonsArray.push(createButton('...', 'end page-button--mobile-hidden', 'end'));
            } else {
                buttonsArray.push(createButton('...', 'begin page-button--mobile-hidden', 'begin'));
                for (let p = totalPages - center - 1; p < totalPages; p += 1) {
                    buttonsArray.push(isActive(p, currentPage, totalPages));
                }
            }
        }
        buttonsArray.push(isActive(totalPages, currentPage, totalPages));
    }
    buttonsArray.push(createButton(icon, 'arrow-button arrow-button--next', 'next'));
    return buttonsArray;
}

function isActive(page, currentPage, totalPages) {
    if (page == currentPage) {
        return createButton(page, 'page-button--active')
    } else {
        return hideForMobile(page, currentPage, totalPages)
    }
}

function hideForMobile(page, currentPage, totalPages) {
    if (totalPages <= MAX_SHOWN_PAGES - 4) {
        return createButton(page, '')
    }
    if (currentPage <= 1 + PAGES_GAP) {
        if (page <= 5) {
            return createButton(page, '')
        } else {
            return createButton(page, 'page-button--mobile-hidden');
        }
    }
    if (currentPage < totalPages - PAGES_GAP) {
        if (page >= currentPage - PAGES_GAP && page <= currentPage + PAGES_GAP) {
            return createButton(page, '')
        } else {
            return createButton(page, 'page-button--mobile-hidden');
        }
    }
    if (page >= totalPages - 4) {
        return createButton(page, '')
    } else {
        return createButton(page, 'page-button--mobile-hidden');
    }
}

function createButton(page, className, dataMove) {
    const button = {
        page,
        classes: 'page-button ' + className,
        step: dataMove,
    }
    return button;
}

function clearPagination() {
    pagesContainer.classList.add('pagination-container--hidden');
    pagesContainer.innerHTML = '';
}