import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import { renderModal } from '../components/modal';
import { renderParamsCard } from '../components/fetch';
import { postUserData, userId,deleteData,getIdUser} from '../components/appFirebase.js';
import img from '../../images/img/png/gallery/no-image.png';
let id = 'id';
let objService = '';
let arrObj = '';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function refButton() {
  const buttonList = document.querySelector('.modal-one-movie__button-box');
  return buttonList
}

function renderMovieSeorchParam(id) {
  renderParamsCard(id)
    .then(data => {
      renderModal(modal_one_movie_markup(imgFix(data)));
      addToDataBase(imgFix(data));
      updateButton(id);
      objService = data;
      arrObj = JSON.stringify({ objService });
      localStorage.setItem('idFilm', id);
      localStorage.setItem('marcupFilm', arrObj);
    })
    .catch(() => { });
}

function imgFix(m) {
  return {
    ...m,
    ...{ poster_path: !m.poster_path ? img : `${IMG_URL}${m.poster_path}` },
  };
}
function updateButton(id) {
  const watched = getIdUser(userId, 'watched', id)
  const queue = getIdUser(userId, 'queue', id)
  Promise.all([watched, queue]).then(values => {
    values.forEach((item,index) => {
      if (item === null) {
        return
      } else {
        refButton().children[index].disabled = true
        refButton().children[index].style.background = 'grey'
        refButton().children[index].style.color='white'
      }
    })
  });
}

export function seorchId() {
  const imagesRef = document.querySelector('.gallery-list');
  imagesRef.addEventListener('click', e => {
    localStorage.removeItem('idFilm', id);
    localStorage.removeItem('marcupFilm', arrObj);

    e.preventDefault();
    if (e.target.nodeName === 'UL') {
      return;
    }
    if (e.target.closest('.gallery-list__item') !== null) {
      id = e.target.closest('.gallery-list__item').dataset.id;
      renderMovieSeorchParam(id);
    }
  });
}
function addToDataBase(data) {
  refButton().addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    const idFilm = localStorage.getItem('idFilm');
    const markupFilm = localStorage.getItem('marcupFilm');
    postUserData(userId, e.target.ariaLabel, idFilm, markupFilm);
    deleteData(userId, e.target.dataset.set, idFilm);
  });
}
