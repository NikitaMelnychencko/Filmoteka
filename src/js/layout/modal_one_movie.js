import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import { modalMarkup } from '../components/modal';

const modalContent = modal_one_movie_markup();
modalMarkup(modalContent);

console.log(modalMarkup(modalContent));
