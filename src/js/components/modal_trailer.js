
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
        shoeTrailer(data);
    } else {
        disableTrailer();
    };
};

function shoeTrailer(data) {
    const url = selectTrailer(data);

    modalRemoveListener();
    main.insertAdjacentHTML('beforeend', trailerPlayer({ svg, url }));

    addTrailerListners();
}

function disableTrailer() {
    const youtubeMessage = main.querySelector('.no-trailer');
    const youtubeBtn = main.querySelector('.youtube-btn');
    youtubeMessage.classList.remove('no-trailer-hidden');
    youtubeBtn.setAttribute('disabled', true);
}


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

function addTrailerListners() {
    const trailerBackdrop = document.querySelector('.trailer_backdrop');
    const closeBtn = main.querySelector('.close-trailer-btn');

    window.addEventListener('keydown', closeTrailerEsc);
    trailerBackdrop.addEventListener('click', closeTrailer);
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