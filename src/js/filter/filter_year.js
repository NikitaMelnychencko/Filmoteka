import { filterGlobalYear } from './fetch_filter_year';
import { renderGallery, renderMovies } from '../layout/gallery';

let year = '';

function onRenderYear(params) {
    filterGlobalYear(data => {
        console.log(data);
    })

}
onRenderYear()