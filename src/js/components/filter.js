import { filterGlobal } from '../components/fetch-filter';
import { renderGallery, renderMovies } from '../layout/gallery';
import filter from '../../views/components/filter.hbs';

const main = document.querySelector('.hero')


let releaseDateDesc = 'primary_release_date.desc';
let releaseDateAsk = 'primary_release_date.asc';
let popularity = 'popularity.asc';


//раскрытие списка сортировки

const sort = document.querySelector('.filter-muvie__list');

function onOpenSort(evt) {
    evt.preventDefault()
    console.log('object');

}


function filterReleaseDesc() {
    filterGlobal(releaseDateDesc, '')
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}

function filterReleaseAsk() {
    filterGlobal('', releaseDateAsk)
        .then(data => {
            renderMovies(data.results)
        }).catch(() => {
            alert("error");
        });
}

function filterMain(data) {
    const marcup = filter(data)
    main.insertAdjacentHTML("beforeend", marcup);
    const filterList = document.querySelectorAll('.filter-list__item')
    filterList.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            const linck = e.target.dataset.atribute
            if (linck === "release-date-desc") {
                filterReleaseDesc()
            } else if (linck === "release-date-ask") {
                filterReleaseAsk()
            }
        })
    })
}

// filterMain()









