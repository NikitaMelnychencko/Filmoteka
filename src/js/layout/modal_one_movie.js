import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import { watchTrailer } from '../components/modal_trailer';
import { renderModal, closeModal, modalRemoveListener, modalAddListener, addModalListener } from '../components/modal';
import { renderParamsCard, getTrailer } from '../components/fetch';
import { postUserData, userId, deleteData, getIdUser } from '../components/appFirebase.js';
import img from '../../images/img/png/gallery/no-image.png';
import svg from '../../images/svg/svg.svg';
import { refs } from '../refs/refs.js';
import { mouseUp } from '../components/modal_login.js';
let id = 'id';
let objService = '';
let arrObj = '';
const mainCont = document.querySelector('main');
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function refButton() {
  const buttonList = document.querySelector('.modal-one-movie__button-box');
  return buttonList
}

function renderMovieSeorchParam(id) {
  renderParamsCard(id)
    .then(data => {
      const dataFixed = imgFix(data);
      renderModal(modal_one_movie_markup({ svg, dataFixed }));
      objService = data;
      arrObj = JSON.stringify({ objService });
      localStorage.setItem('idFilm', id);
      localStorage.setItem('marcupFilm', arrObj);
      addToDataBase(imgFix(data));
      updateButton(id);
      watchTrailer(id);
      const test = document.querySelector('.trailer_backdrop');
    })
}

function imgFix(m) {
  return {
    ...m,
    ...{ popularity: m.popularity.toFixed(1) },
    ...{ poster_path: !m.poster_path ? img : `${IMG_URL}${m.poster_path}` },
  };
}
export function updateButton(id) {
  const watched = getIdUser(userId, 'watched', id)
  const queue = getIdUser(userId, 'queue', id)
  Promise.all([watched, queue]).then(values => {
    values.forEach((item, index) => {
      if (item === null) {
        return
      } else {
        refButton().children[index].disabled = true
        refButton().children[index].style.background = 'grey'
        refButton().children[index].style.color = 'white'
      }
    })
  });
}

export function seorchId() {
  const imagesRef = document.querySelector('.gallery-list');
  imagesRef.addEventListener('click', e => {
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
  const idFilm = localStorage.getItem('idFilm');
  const markupFilm = localStorage.getItem('marcupFilm');
  refButton().addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') return;
    if (userId == null) {
      refs.singinModal.classList.remove('modal-auth--hidden');
      mouseUp()
    } else {
      postUserData(userId, e.target.ariaLabel, idFilm, markupFilm);
      deleteData(userId, e.target.dataset.set, idFilm);
      closeModal();
    }
  });
}