import mainTittle from '../data/main.json';
import { getUser, userId } from '../components/appFirebase';
import { renderGallery } from '../layout/gallery';

let userListArrey;

function getrefs() {
  const refs = {
    galleryTitle: document.querySelector('.gallery__tittle--hide'),
  };
  return refs;
}

export function onLibButtons() {
  const buttonsList = document.querySelector('.hero-library__buttons-thumb');
  buttonsList.addEventListener('click', onButtonsLibClick);
}

function onButtonsLibClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  btnIsActive(event.target);
  userListArrey = getUser(`${userId}`, `${event.target.dataset.action}`);
  
  if (event.target.classList.contains('hero-library__button--watched')) {
    renameGalleryTitle(mainTittle.my_library_watched.gallery_title);
    renderGallery('library', `${userId}`, `watched`);
  } else {
    renameGalleryTitle(mainTittle.my_library_queue.gallery_title);
    renderGallery('library', `${userId}`, `queue`);
    console.log(121);
  }
}

function btnIsActive(element) {
  const activeElement = document.querySelector('.is-active');
  if (activeElement) {
    activeElement.classList.remove('is-active');
  }
  element.classList.add('is-active');
}

function renameGalleryTitle(value) {
  getrefs().galleryTitle.innerHTML = value;
}
