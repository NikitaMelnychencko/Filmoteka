import heroHome from '../../views/partials/hero_home.hbs';
import searchSvg from '../../images/svg/svg.svg';
import { renderGallery } from './gallery.js';
export const homeMarkUp = heroHome({ searchSvg });
export let searchQuery = undefined;
export function openInput() {
  refs().searchForm.addEventListener('submit', onSearch);
  function onSearch(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.query.value;
    const page = 1;
    if (searchQuery.length < 1) {
      refs().warning.classList.remove('is-hidden');
      return (refs().warning.textContent =
        'Search result not successful. Enter the correct movie name and try again!');
    } else {
      refs().warning.classList.add('is-hidden');
      renderGallery(1, 'search', searchQuery);
    }
  }
}
export function clearInput() {
  const inputRef = document.querySelector('.search-form__input');
  inputRef.value = '';
  searchQuery = undefined;
}

function refs() {
  const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery-list'),
    warning: document.querySelector('.warning'),
  };
  return refs;
}
