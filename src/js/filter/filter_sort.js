import { renderGallery } from '../layout/gallery';
import filter from '../../views/components/filter/filter_sort.hbs';

const main = document.querySelector('.hero');

function filterMain(data) {
    const markup = filter(data)
    main.insertAdjacentHTML("beforeend", markup);
}

filterMain();

const filterList = document.querySelector('.filter-list__sort');
filterList.addEventListener('click', onRenderFilter)

function onRenderFilter(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'LI') {
        return;
    }

    const link = evt.target.dataset.atribute;
    renderGallery('sort', '', link);
};