import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import { renderModal } from '../components/modal';
import { renderParamsCard } from '../components/fetch'


let id = "id";
let linksID = [];

const modalContent = document.querySelector('.modal__content')

function renderParamCard(data) {
  const marcup = modal_one_movie_markup(data);
  modalContent.innerHTML = marcup;
}

function renderMovieSeorchParam() {
  renderParamsCard(id)
    .then((data) => {
      renderModal()
      renderParamCard(data)
    })
    .catch(() => {
    });
}
const imagesRef = document.querySelector('.gallery-list');

function seorchId() {
  imagesRef.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.nodeName === 'UL') {
      return;
    }
    id = e.target.dataset.id
    renderMovieSeorchParam(id)
  })
}
seorchId()
