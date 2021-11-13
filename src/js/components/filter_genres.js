import { filterGlobalGenres } from './fetch_filter_genres'
import { renderGallery, renderMovies } from '../layout/gallery';
import RenderFilterGenres from '../../views/components/filter_genres.hbs'
const main = document.querySelector('.hero')


let genres = 'Action'

function filterGenre() {
    filterGlobalGenres(genres)
        .then(data => {
            renderMovies(data)
            console.log(data.results);
        }).catch(() => {
            alert("error");
        });
}

// filterGenre()


function filterGenres(data) {
    const marcup = RenderFilterGenres(data)
    console.log(marcup);
    main.insertAdjacentHTML("beforeend", marcup);
}
filterGenres()