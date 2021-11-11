import modal_one_movie_markup from '../../views/partials/modal_one_movie.hbs';
import testcard from '../testcard.json'; //test object with movie detail. delete after start function
import { renderModal } from '../components/modal';
import { renderParamsCard } from '../components/fetch';
import { refs } from '../refs/refs'
; //need insert object with movie detail

refs.main.addEventListener('click', clickOnMovieHandler);

// Click Handler Function
async function clickOnMovieHandler(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H3') {
    return;
  }

    let movieId = e.target.dataset.id;
  await fetchById(movieId);
}

async function fetchById(id) {

    try {
        const movieId = await renderParamsCard(id);
        let modalContent = modal_one_movie_markup(testcard)
        renderModal(modalContent);
        console.log(movieId)

        
    } catch (error) {
        console.error('Smth wrong with outer fetch by ID' + error);
    }
}

