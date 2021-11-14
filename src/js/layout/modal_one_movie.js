import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import { renderModal } from '../components/modal';
import { renderParamsCard } from '../components/fetch';
import{postUserData,userId}from '../components/films_library.js'
let id = 'id';
let objService = ''
let arrObj = ''
function renderMovieSeorchParam(id) {
  renderParamsCard(id)
    .then(data => {
      renderModal();
      renderParamCard(data);
      objService = data
      arrObj = JSON.stringify({ objService })
      localStorage.setItem('idFilm', id)
      localStorage.setItem('marcupFilm', arrObj)
    })
    .catch(() => { });
  
}

function renderParamCard(data) {
  const modalContent = document.querySelector('.modal__content');
  const marcup = modal_one_movie_markup(data);
  modalContent.innerHTML = marcup;
  addToDataBase(data)
}

export function seorchId() {
  const imagesRef = document.querySelector('.gallery-list');
  imagesRef.addEventListener('click', e => {
    localStorage.removeItem('idFilm', id)
    localStorage.removeItem('marcupFilm', arrObj)

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
function addToDataBase(data){
  const buttonList = document.querySelector('.modal-one-movie__button-box')
  buttonList.addEventListener('click', e => {
    if (e.target.nodeName!=='BUTTON') {
      return
    }
    const idFilm = localStorage.getItem('idFilm')
    const markupFilm = localStorage.getItem('marcupFilm')
    postUserData(userId,e.target.dataset.set,idFilm, markupFilm)
  })
}
