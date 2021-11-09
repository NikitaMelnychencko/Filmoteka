import { refs } from '../refs/refs.js'
import pagination from '../../views/components/pagination_list.hbs'
import { renderGallery } from '../layout/gallery.js';

refs.main.insertAdjacentHTML("beforeend", pagination());

let pages = 20;
let currentPage = 1;
let maxPages = 9;
let pagesGap = 2;

function renderPagination(currentPage) {
    document.getElementById('pag').innerHTML = createPagination(pages, currentPage);
    const pagesContainer = refs.main.querySelector('.pagination');
    //console.log(pagesContainer.addEventListener);
    pagesContainer.addEventListener('click', onClick);
    console.log(currentPage)
    if (currentPage == 1) {
        console.log(pagesContainer.querySelector('.previous'));
        pagesContainer.querySelector('.previous').classList.add('hidden')
    }
    console.log('Pages', pages)
    if (currentPage == pages) {
        console.log(pagesContainer.querySelector('.next'));
        pagesContainer.querySelector('.next').classList.add('hidden')
    }
}


renderPagination(1);

const button = refs.main.querySelectorAll('.page-button');

function onClick(e) {

    console.log('target', e.target.className)
    let page = e.target.textContent;
    if (e.target.className.includes('end')) {
        console.log('Ypa!');
        page = Number(refs.main.querySelector('.active').textContent) + 5;

    }

    if (e.target.className.includes('begin')) {
        console.log('Ypa!');
        page = Number(refs.main.querySelector('.active').textContent) - 5;

    }
    console.log(page);
    if (e.target.className.includes('previous')) {
        console.log(refs.main.querySelector('.active').textContent);
        page = refs.main.querySelector('.active').textContent - 1;
        console.log(page);
    }
    if (e.target.className.includes('next')) {
        console.log(refs.main.querySelector('.active').textContent);
        page = Number(refs.main.querySelector('.active').textContent) + 1;
        console.log(page);
    }
    renderPagination(page);
}

function createPagination(pages, currentPage) {
    //console.log(currentPage);
    //console.log('creatPaginatio', pagesContainer)
    const center = Math.ceil(maxPages / 2);
    console.log(center)
    let str = '<ul class="pagination"><li class="page-item" ><button class="page-button arrow previous">P</button></li >';
    if (pages <= maxPages) {
        for (let p = 1; p <= pages; p += 1) {
            str += isActive(p, currentPage)
        }
    } else {
        str += isActive(1, currentPage)
        if (currentPage <= center) {
            for (let p = 2; p <= center + pagesGap; p += 1) {
                str += isActive(p, currentPage);
            }
            str += `<li class="page-item"><button class="page-button end">...</button></li>`
        } else {
            if (currentPage <= pages - center) {
                str += `<li class="page-item"><button class="page-button begin">...</button></li>`
                for (let p = currentPage - pagesGap; p <= Number(currentPage) + pagesGap; p += 1) {
                    str += isActive(p, currentPage);
                }
                str += `<li class="page-item"><button class="page-button end">...</button></li>`
            } else {
                str += `<li class="page-item"><button class="page-button begin">...</button></li>`
                for (let p = pages - center - 1; p < pages; p += 1) {
                    str += isActive(p, currentPage);
                }
            }
            //str += `<li class="page-item"><button class="page-button end">...</button></li>`
        }
        str += isActive(pages, currentPage)
    }
    str += '<li class="page-item"><button class="page-button arrow next">N</button></li></ul>';

    console.log(str);
    return str;
}

function isActive(page, currentPage) {
    if (page == currentPage) {
        return `<li class="page-item"><button class="page-button active">${page}</button></li>`
    } else {
        return `<li class="page-item"><button class="page-button">${page}</button></li>`
    }
}