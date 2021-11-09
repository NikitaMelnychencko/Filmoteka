import teamTemplate from '/views/partials/modal_team_list.hbs';
import team from '../data/team-list.json';
import { renderModal } from '../components/modal';
const modalTheme = teamTemplate(team); //need insert object with movie detail

 //test
// Refs
const modalContent = teamTemplate();

const modalContainer =document.querySelector('[data-action="open-modal-teamlist"]')
modalContainer.addEventListener('click', openModal);

function openModal() {
 renderModal(modalTheme);  
}
