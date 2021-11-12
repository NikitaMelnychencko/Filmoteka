import { refs } from '../../refs/refs.js';
import { openTeamModal } from '../modal_team_list';
refs.footerLink.addEventListener('click', openTeamListModal);

function openTeamListModal(e) {
  e.preventDefault();
  openTeamModal();
}
