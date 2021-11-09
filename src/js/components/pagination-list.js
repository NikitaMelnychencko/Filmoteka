import { refs } from '../refs/refs.js'
import pagination from '../../views/components/pagination_list.hbs'
import { renderGallery } from '../layout/gallery.js';

// const lastPage = 10;
// const showPages = 5;
// const pages = [];

// for (let i = 1; i <= lastPage; i += 1) {
//     pages.push(i);
// }

// let currentPage = 2;
// //console.log("pages", renderGallery().total_pages);

refs.main.insertAdjacentHTML("beforeend", pagination());

// const pagesContainer = refs.main.querySelector('.pagination');


// pagesContainer.addEventListener('click', onClick);
// const button = refs.main.querySelectorAll('.page-button');

// button.forEach(data => {
//     if (data.textContent == currentPage) {
//         data.classList.add("active");
//         //console.log("active");
//     }
//     //console.log(data.textContent)
// })

// function onClick(evt) {
//     button.forEach(data => {
//         if (data.textContent == currentPage) {
//             data.classList.add("active");
//             //console.log("active");
//         }
//         //console.log(data.textContent)
//     })

//     currentPage = evt.target.textContent;
//     console.log(evt.target.textContent);
//     renderGallery('', currentPage);

// };

let pages = 5;
let currentPage = 1;

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
    let page = e.target.textContent;
    console.log(page);
    if (page === 'P') {
        console.log(refs.main.querySelector('.active').textContent);
        page = refs.main.querySelector('.active').textContent - 1;
        console.log(page);
    }
    if (page === 'N') {
        console.log(refs.main.querySelector('.active').textContent);
        page = Number(refs.main.querySelector('.active').textContent) + 1;
        console.log(page);
    }
    renderPagination(page);
}

function createPagination(pages, currentPage) {
    //console.log(currentPage);
    //console.log('creatPaginatio', pagesContainer)
    let str = '<ul class="pagination"><li class="page-item" ><button class="page-button arrow previous">P</button></li >';

    for (let p = 1; p <= pages; p += 1) {
        if (p == currentPage) {
            str += `<li class="page-item"><button class="page-button active">${p}</button></li>`
        } else {
            str += `<li class="page-item"><button class="page-button">${p}</button></li>`
        }
    }
    str += '<li class="page-item"><button class="page-button arrow next">N</button></li></ul>';

    console.log(str);
    return str;
}

// createPagination(pages, currentPage);
// export function catchMe() {
//     console.log(8);
// }

// function createPagination(pages, page) {
//     let str = '<ul>';
//     let active;
//     let pageCutLow = page - 1;
//     let pageCutHigh = page + 1;
//     // Show the Previous button only if you are on a page other than the first
//     if (page > 1) {
//         str += '<li class="page-item previous no"><a onclick="createPagination(pages, ' + (page - 1) + ')">Previous</a></li>';
//     }
//     // Show all the pagination elements if there are less than 6 pages total
//     if (pages < 6) {
//         for (let p = 1; p <= pages; p++) {
//             active = page == p ? "active" : "no";
//             str += '<li class="' + active + '"><a onclick="createPagination(pages, ' + p + ')">' + p + '</a></li>';
//         }
//     }
//     // Use "..." to collapse pages outside of a certain range
//     else {
//         // Show the very first page followed by a "..." at the beginning of the
//         // pagination section (after the Previous button)
//         if (page > 2) {
//             str += '<li class="no page-item"><a onclick="createPagination(pages, 1)">1</a></li>';
//             if (page > 3) {
//                 str += '<li class="out-of-range"><a onclick="createPagination(pages,' + (page - 2) + ')">...</a></li>';
//             }
//         }
//         // Determine how many pages to show after the current page index
//         if (page === 1) {
//             pageCutHigh += 2;
//         } else if (page === 2) {
//             pageCutHigh += 1;
//         }
//         // Determine how many pages to show before the current page index
//         if (page === pages) {
//             pageCutLow -= 2;
//         } else if (page === pages - 1) {
//             pageCutLow -= 1;
//         }
//         // Output the indexes for pages that fall inside the range of pageCutLow
//         // and pageCutHigh
//         for (let p = pageCutLow; p <= pageCutHigh; p++) {
//             if (p === 0) {
//                 p += 1;
//             }
//             if (p > pages) {
//                 continue
//             }
//             active = page == p ? "active" : "no";
//             str += '<li class="page-item ' + active + '"><a onclick="createPagination(pages, ' + p + ')">' + p + '</a></li>';
//         }
//         // Show the very last page preceded by a "..." at the end of the pagination
//         // section (before the Next button)
//         if (page < pages - 1) {
//             if (page < pages - 2) {
//                 str += '<li class="out-of-range"><a onclick="createPagination(pages,' + (page + 2) + ')">...</a></li>';
//             }
//             str += '<li class="page-item no"><a onclick="createPagination(pages, pages)">' + pages + '</a></li>';
//         }
//     }
//     // Show the Next button only if you are on a page other than the last
//     if (page < pages) {
//         str += '<li class="page-item next no"><a onclick="createPagination(pages, ' + (page + 1) + ')">Next</a></li>';
//     }
//     str += '</ul>';
//     // Return the pagination string to be outputted in the pug templates
//     document.getElementById('pagination').innerHTML = str;
//     return str;
// }
