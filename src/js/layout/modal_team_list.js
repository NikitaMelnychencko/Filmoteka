import teamTemplate from '/views/partials/modal_team_list.hbs';
import team from '../data/team-list.json';
import { renderModal } from '../components/modal';
const modalTheme = teamTemplate(team);

export function openTeamModal() {
  renderModal(modalTheme);
}
