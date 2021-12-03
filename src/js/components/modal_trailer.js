
import { getTrailer } from './fetch';
import { modalRemoveListener, modalAddListener } from '../components/modal';
import trailerPlayer from '../../views/partials/trailer_player.hbs';
import svg from '../../images/svg/svg.svg';

const main = document.querySelector('main');
let id = '';

export function watchTrailer(film) {
    id = film;
    const yotubeBtn = document.querySelector('.youtube-btn');
    yotubeBtn.addEventListener('click', onYoutubeBtnClick);
};

async function onYoutubeBtnClick(e) {
    const data = await getTrailer(id);

    if (data.results.length > 0) {
        const url = selectTrailer(data);

        modalRemoveListener();
        main.insertAdjacentHTML('beforeend', trailerPlayer({ svg, url }));

        const trailerBackdrop = document.querySelector('.trailer_backdrop');
        const trailerModal = document.querySelector('.trailer_modal');
        trailerBackdrop.classList.add('trailer_backdrop_is-open');
        trailerModal.classList.add('trailer_modal_is-open');

        addTrailerListners();
    } else console.log('error')

};

function addTrailerListners() {
    const closeBtn = main.querySelector('.close-trailer-btn');

    closeBtn.addEventListener('click', closeTrailer)
    window.addEventListener('keydown', closeTrailerEsc);
};

function closeTrailer(e) {
    main.removeChild(main.querySelector('.trailer_backdrop'));
    window.removeEventListener('keydown', closeTrailerEsc);
    modalAddListener();
};

function closeTrailerEsc(e) {
    if (e.code === 'Escape') {
        closeTrailer();
    }
};

function selectTrailer(data) {
    let url = '';

    const videos = data.results;
    const trailers = videos.filter(item => item.type === 'Trailer');
    const officialTrailers = trailers.filter(item => item.official);

    if (officialTrailers.length > 0) {
        url = officialTrailers[officialTrailers.length - 1].key;
    } else {
        if (trailers.length > 0) {
            url = trailers[trailers.length - 1].key
        } else {
            url = videos[videos.length - 1].key
        }
    };

    return url;
};