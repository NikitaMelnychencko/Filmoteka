import { refs } from '../refs/refs.js'
import pagination from '../../views/components/pagination_list.hbs'
import svg from '../../images/svg/sprite.svg';

const MAX_SHOWN_PAGES = 9;
const PAGES_GAP = 2;

refs.main.insertAdjacentHTML("beforeend", pagination({ svg }));

let totalPages = 20;

const pagesContainer = refs.main.querySelector('.pagination');
pagesContainer.addEventListener('click', onClick);

renderPagination(1, totalPages);

function onClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'BUTTON') {
        return;
    };

    console.log('target', e.target.className)

    console.log(e.target.textContent, Number.isNaN(e.target.textContent))
    let page = Number(e.target.textContent);
    console.log(page)

    if (e.target.className.includes('end')) {
        page = Number(refs.main.querySelector('.active').textContent) + 5
    }

    if (e.target.className.includes('begin')) {
        page = Number(refs.main.querySelector('.active').textContent) - 5;
    }

    if (e.target.className.includes('previous')) {
        page = refs.main.querySelector('.active').textContent - 1;
    }
    if (e.target.className.includes('next')) {
        page = Number(refs.main.querySelector('.active').textContent) + 1;
    }
    renderPagination(page, totalPages);
}

function renderPagination(currentPage, totalPages) {
    document.querySelector('.numbers').innerHTML = createPagination(currentPage, totalPages);
    hideArrows(currentPage, totalPages);
    return currentPage;
}

function hideArrows(currentPage, totalPages) {
    if (currentPage == 1) {
        pagesContainer.querySelector('.previous').classList.add('hidden')
    } else {
        pagesContainer.querySelector('.previous').classList.remove('hidden')
    }

    if (currentPage == totalPages) {
        pagesContainer.querySelector('.next').classList.add('hidden')
    } else {
        pagesContainer.querySelector('.next').classList.remove('hidden')
    }
}

function createPagination(currentPage, totalPages) {
    const center = Math.ceil(MAX_SHOWN_PAGES / 2);
    let str = '';
    if (totalPages <= MAX_SHOWN_PAGES) {
        for (let p = 1; p <= pages; p += 1) {
            str += isActive(p, currentPage, totalPages)
        }
    } else {
        str += isActive(1, currentPage, totalPages)
        if (currentPage <= center) {
            for (let p = 2; p <= center + PAGES_GAP; p += 1) {
                str += isActive(p, currentPage, totalPages);
            }
            str += `<li class="page-item"><button class="page-button end mobile-hidden">...</button></li>`
        } else {
            if (currentPage <= totalPages - center) {
                str += `<li class="page-item"><button class="page-button begin mobile-hidden">...</button></li>`
                for (let p = currentPage - PAGES_GAP; p <= Number(currentPage) + PAGES_GAP; p += 1) {
                    str += isActive(p, currentPage, totalPages);
                }
                str += `<li class="page-item"><button class="page-button end mobile-hidden">...</button></li>`
            } else {
                str += `<li class="page-item"><button class="page-button begin mobile-hidden">...</button></li>`
                for (let p = totalPages - center - 1; p < totalPages; p += 1) {
                    str += isActive(p, currentPage, totalPages);
                }
            }
        }
        str += isActive(totalPages, currentPage, totalPages)
    }
    return str;
}

function isActive(page, currentPage, totalPages) {
    if (page == currentPage) {
        return createActivePage(page)
    } else {
        return hideForMobile(page, currentPage, totalPages)
    }
}

function hideForMobile(page, currentPage, totalPages) {
    if (totalPages <= MAX_SHOWN_PAGES - 4) {
        return createPage(page)
    }
    if (currentPage <= 1 + PAGES_GAP) {
        if (page <= 5) {
            return createPage(page);
        } else {
            return createMobileHiddenPage(page)
        }
    }
    if (currentPage < totalPages - PAGES_GAP) {
        if (page >= (Number(currentPage) - PAGES_GAP) && page <= (Number(currentPage) + PAGES_GAP)) {
            return createPage(page)
        } else {
            return createMobileHiddenPage(page)
        }
    }
    if (page >= totalPages - 4) {
        return createPage(page)
    } else {
        return createMobileHiddenPage(page)
    }
}

function createPage(page) {
    return `<li class="page-item"><button class="page-button">${page}</button></li>`
}

function createMobileHiddenPage(page) {
    return `<li class="page-item"><button class="page-button mobile-hidden">${page}</button></li>`
}

function createActivePage(page) {
    return `<li class="page-item"><button class="page-button active">${page}</button></li>`
}