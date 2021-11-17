import { filterGlobal } from '../components/fetch-filter';
import { renderGallery, renderMovies } from '../layout/gallery';
import filter from '../../views/components/filter.hbs';

const main = document.querySelector('.hero')


let releaseDateDesc = 'primary_release_date.desc';
let releaseDateAsk = 'primary_release_date.asc';
let popularityDesc = 'popularity.desc';
let popularityAsc = 'popularity.asc';

let voteAverageAsc = 'vote_average.asc';
let voteAverageDesc = 'vote_average.desc'
//раскрытие списка сортировки

const sort = document.querySelector('.filter-muvie__list');

function onOpenSort(evt) {
    evt.preventDefault()
    console.log('object');
}


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


function filterReleaseDesc() {
    filterGlobal('', '', releaseDateDesc)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}

function filterReleaseAsk() {
    filterGlobal('', '', '', releaseDateAsk)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}
function filterReleaseAsk() {
    filterGlobal('', '', '', '', releaseTitleDesc)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}



function filterMain(data) {
    const marcup = filter(data)
    main.insertAdjacentHTML("beforeend", marcup);
    const filterList = document.querySelector('.filter-list')
    console.log(filterList);
    // filterList.forEach(el => {
    filterList.addEventListener('click', e => {
        e.preventDefault()
        console.log(e.target);
        const linck = e.target.dataset.atribute
        if (linck === "release-date-desc") {
            filterReleaseDesc()
        } else if (linck === "release-date-ask") {
            filterReleaseAsk()
        } else if (linck === "popularity-desc") {
            filterPopularityDesc()
        } else if (linck === "popularity-asc") {
            filterPopularityAsc()
        }
    })
    // })
}

filterMain()









