import heroHome from '../../views/partials/hero_home.hbs';
import searchSvg from '../../images/svg/sprite.svg';
import { renderGallery } from './gallery.js';
import { addSpinner, removeSpinner } from '../components/spinner.js';
export const homeMarkUp = heroHome({ searchSvg });
export let searchQuery = undefined;
export function openInput() {
  const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery-list'),
    warning: document.querySelector('.warning'),
  };
  refs.searchForm.addEventListener('submit', onSearch);
  function onSearch(e) {
    e.preventDefault();
    addSpinner();
    searchQuery = e.currentTarget.elements.query.value;
    const page = 1;
    if (searchQuery.length <= 1) {
      refs.warning.classList.remove('is-hidden');
      removeSpinner();
      return (refs.warning.textContent =
        'Search result not successful. Enter the correct movie name and try again!');
    } else {
      refs.warning.classList.add('is-hidden');
      renderGallery(searchQuery);
      removeSpinner();
    }
  }
}
export function clearInput() {
  const inputRef = document.querySelector('.search-form__input');
  inputRef.value = '';
  searchQuery = undefined;
}
