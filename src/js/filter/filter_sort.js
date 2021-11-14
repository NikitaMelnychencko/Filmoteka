
import { filterGlobal } from './fetch_filter_sort';
import { renderGallery, renderMovies } from '../layout/gallery';
import filter from '../../views/components/filter/filter_sort.hbs';
const main = document.querySelector('.hero');


let releaseDateDesc = 'primary_release_date.desc';
let releaseDateAsk = 'primary_release_date.asc';
let popularityDesc = 'popularity.desc';
let popularityAsc = 'popularity.asc';
let releaseTitleDesc = "original_title.desc"
let releaseTitleAsc = "original_title.asc"
//раскрытие списка сортировки

function filterPopularityDesc() {
    filterGlobal(popularityDesc)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}
function filterPopularityAsc() {
    filterGlobal('', popularityAsc)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}

function filterReleaseDateDesc() {
    filterGlobal('', '', releaseDateDesc)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}

function filterReleaseDateAsk() {
    filterGlobal('', '', '', releaseDateAsk)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}
function filterTitleDesc() {
    filterGlobal('', '', '', '', releaseTitleDesc)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}
function filterTitleAsc() {
    filterGlobal('', '', '', '', '', releaseTitleAsc)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}

function filterMain(data) {
    const marcup = filter(data)
    main.insertAdjacentHTML("beforeend", marcup);
}
filterMain()

const filterList = document.querySelector('.filter-list__sort');
filterList.addEventListener('click', onRenderFiletr)

function onRenderFiletr(evt) {
    evt.preventDefault()
    const linck = evt.target.dataset.atribute
    if (linck === "release-date-desc") {
        filterReleaseDateDesc()

    } else if (linck === "release-date-ask") {
        filterReleaseDateAsk()

    } else if (linck === "popularity-desc") {
        filterPopularityDesc()

    } else if (linck === "popularity-asc") {
        filterPopularityAsc()

    } else if (linck === "original-title-desc") {
        filterTitleDesc()

    } else if (linck === "original-title-asc") {
        filterTitleAsc()
    }
};









