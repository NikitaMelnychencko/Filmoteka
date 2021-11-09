import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import testcard from '../testcard.json'; //test object with movie detail
import { renderModal } from '../components/modal';
const modalContent = modal_one_movie_markup(testcard); //need insert object with movie detail

renderModal(modalContent); //function open modal with string html.
