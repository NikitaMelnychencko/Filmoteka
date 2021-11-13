import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import { renderModal } from '../components/modal';
import { renderParamsCard } from '../components/fetch'

let id = "id";

function renderParamCard(data) {
    const modalContent = document.querySelector('.modal__content')
    const marcup = modal_one_movie_markup(data);
    modalContent.innerHTML = marcup;
}

function renderMovieSeorchParam(id) {
    renderParamsCard(id)
        .then((data) => {
            renderModal()
            renderParamCard(data)
        })
        .catch(() => {
        });
}

export function seorchId() {
    const imagesRef = document.querySelector('.gallery-list');
    imagesRef.addEventListener('click', e => {
        e.preventDefault()
        if (e.target.nodeName === 'UL') {
            return;
        }
        id = e.target.closest('.gallery-list__item').dataset.id;
        renderMovieSeorchParam(id)
    })
}



