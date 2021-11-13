import { refs } from '../refs/refs.js'
import { renderGallery } from '../layout/gallery'
import { searchQuery } from '../layout/hero_home';
import pagination from '../../views/components/pagination_list.hbs'
import svg from '../../images/svg/sprite.svg';


const MAX_SHOWN_PAGES = 9;
const PAGES_GAP = 2;
const STEPS = new Map([
    ['previous', -1],
    ['next', 1],
    ['begin', -5],
    ['end', +5],
])

export function primaryPagination() {
    const pagesContainer = refs.main.querySelector('.pagination-container');
    console.log(pagesContainer)
    console.log(svg)
    //pagesContainer.insertAdjacentHTML("beforeend", pagination);
    pagesContainer.addEventListener('click', onPageClick);
}

function onPageClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'BUTTON') {
        return;
    };

    const pressedButton = e.target;
    renderGallery(searchQuery, getNextPage(pressedButton))
}

function getNextPage(button) {
    const currentPage = Number(refs.main.querySelector('.page-button--active').textContent);
    const buttonClasses = button.classList;
    //console.log(buttonClasses)
    let nextPage = Number(button.textContent);
    console.log(currentPage)
    console.log(button.dataset.move);
    console.log(STEPS.get(button.dataset.move))


    // if (button.className.includes('end')) {
    //     nextPage = Number(refs.main.querySelector('.page-button--active').textContent) + 5
    // }

    // if (button.className.includes('begin')) {
    //     nextPage = Number(refs.main.querySelector('.page-button--active').textContent) - 5;
    // }

    // if (button.className.includes('arrow-button--previous')) {
    //     nextPage = refs.main.querySelector('.page-button--active').textContent - 1;
    // }
    // if (button.className.includes('arrow-button--next')) {
    //     nextPage = Number(refs.main.querySelector('.page-button--active').textContent) + 1;
    // }
    console.log(nextPage)
    return nextPage;
}

export function renderPagination(currentPage, totalPages) {
    //hidePagination(false);
    document.querySelector('.pagination-container').innerHTML = pagination(createPagination(currentPage, totalPages));
    //hideArrows(currentPage, totalPages);
    console.log(STEPS)
    console.log(STEPS.get('begin'))
    return currentPage;
}

function hideArrows(currentPage, totalPages) {
    const pagesContainer = refs.main.querySelector('.pagination-container');
    if (totalPages === 0) {
        pagesContainer.querySelector('.previous').classList.add('hidden-arrow');
        pagesContainer.querySelector('.next').classList.add('hidden-arrow');
    }

    if (currentPage == 1) {
        pagesContainer.querySelector('.arrow-button--previous').disabled = true
    } else {
        pagesContainer.querySelector('.arrow-button--previous').disabled = false
    }

    if (currentPage == totalPages) {
        pagesContainer.querySelector('.arrow-button--next').disabled = true
    } else {
        pagesContainer.querySelector('.arrow-button--next').disabled = false
    }
}

export function createPagination(currentPage, totalPages) {
    const icon = `<svg class='page-button-svg'><use href=${svg}#icon-arrow-left ></use></button >`
    const buttonsArray = [create(icon, 'arrow-button arrow-button--previous', 'previous')];

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
            buttonsArray.push(create('...', 'end page-button--mobile-hidden', 'end'));
        } else {
            if (currentPage <= totalPages - center) {
                buttonsArray.push(create('...', 'begin page-button--mobile-hidden', 'begin'));
                for (let p = currentPage - PAGES_GAP; p <= currentPage + PAGES_GAP; p += 1) {
                    buttonsArray.push(isActive(p, currentPage, totalPages));
                }
                buttonsArray.push(create('...', 'end page-button--mobile-hidden', 'end'));
            } else {
                buttonsArray.push(create('...', 'begin page-button--mobile-hidden', 'begin'));
                for (let p = totalPages - center - 1; p < totalPages; p += 1) {
                    buttonsArray.push(isActive(p, currentPage, totalPages));
                }
            }
        }
        buttonsArray.push(isActive(totalPages, currentPage, totalPages));
    }
    buttonsArray.push(create(icon, 'arrow-button arrow-button--next', 'next'));
    console.log(buttonsArray);
    return buttonsArray;
}

function isActive(page, currentPage, totalPages) {
    if (page == currentPage) {
        return create(page, 'page-button--active')
    } else {
        return hideForMobile(page, currentPage, totalPages)
    }
}

function hideForMobile(page, currentPage, totalPages) {
    if (totalPages <= MAX_SHOWN_PAGES - 4) {
        return create(page, '')
    }
    if (currentPage <= 1 + PAGES_GAP) {
        if (page <= 5) {
            return create(page, '')
        } else {
            return create(page, 'page-button--mobile-hidden');
        }
    }
    if (currentPage < totalPages - PAGES_GAP) {
        if (page >= currentPage - PAGES_GAP && page <= currentPage + PAGES_GAP) {
            return create(page, '')
        } else {
            return create(page, 'page-button--mobile-hidden');
        }
    }
    if (page >= totalPages - 4) {
        return create(page, '')
    } else {
        return create(page, 'page-button--mobile-hidden');
    }
}

function create(page, className, dataMove) {
    console.log(dataMove)
    const button = {
        page,
        classes: 'page-button ' + className,
        step: dataMove,
    }
    return button;
}

// export function hidePagination(state) {
//     const pagesContainer = refs.main.querySelector('.pagination-container');
//     if (state) {
//         pagesContainer.classList.add('pagination-container--hidden')
//     } else { pagesContainer.classList.remove('pagination-container--hidden') }
// }