import teamTemplate from '/views/partials/modal_team_list.hbs';
import team from '../data/team-list.json';
//import { modalMarkup } from '../components/modal_login'
const modalContent = teamTemplate();



import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/src/styles/main.scss';

// Refs

const modalContainer = document.querySelector('[data-action="open-modal-teamlist"]');

modalContainer.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();

  try {
    getTeamInfo(team);
  } catch (error) {
    console.error('Something wrong with team modal window' + error);
  }

  
}
// Function for getting data from Json
function getTeamInfo(teamId) {
  const teamMarkup = teamTemplate(teamId);
  const modalContent = basicLightbox.create(teamMarkup);

  modalContent.show();

  window.addEventListener('keydown', closeModalByEsc);

  function closeModalByEsc(e) {
    if (e.code === 'Escape') {
      modalContent.close();

      window.removeEventListener('keydown', closeModalByEsc);
    }
  }
  const btnCloseRef = document.querySelector('.close__button');
  btnCloseRef.addEventListener('click', closeModalbyBtn);
  function closeModalbyBtn() {
    modalContent.close();

    btnCloseRef.removeEventListener('click', closeModalbyBtn);
  }
}