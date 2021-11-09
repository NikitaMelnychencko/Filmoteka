import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import testcard from '../testcard.json'; //test object with movie detail. delete after start function
import { renderModal } from '../components/modal';
const url = 'блаблабла';
const modalContent = modal_one_movie_markup(testcard, url); //need insert object with movie detail

// renderModal(modalContent); //function open modal with string html. test
