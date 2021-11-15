import { filterGlobalYear } from './fetch_filter_year';
import { renderGallery, renderMovies } from '../layout/gallery';

let year = '';
const linkOpenYear = document.querySelector('.filter-link__year');
const listYear = document.querySelector('.filter-list__year');

function onRenderYear() {
    filterGlobalYear(data => {
        console.log(data.results.release_date);
    })
}
onRenderYear()


