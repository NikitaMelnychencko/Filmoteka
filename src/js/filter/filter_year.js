import { filterGlobalYear } from './fetch_filter_year';
import { renderGallery, renderMovies } from '../layout/gallery';
import yearRend from '../../views/components/filter/filter_sort.hbs';
let year = '';
const linkOpenYear = document.querySelector('.filter-link__year');
const listYear = document.querySelector('.filter-list__year');
const itenmYear = document.querySelector('.filter-item__year')
linkOpenYear.addEventListener('click', e)

function renderYear(year) {
    const markup = yearRend(year)
    yearRend.insertAdjacentHTML("beforeend", markup)
}

function onRenderYear() {
    filterGlobalYear(data => {
        console.log(data.release_date);
    })
}
onRenderYear()

