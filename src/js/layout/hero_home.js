import heroHome from '../../views/partials/hero_home.hbs';
import searchSvg from '../../images/svg/sprite.svg';
import { renderGallery } from './gallery.js';
export const homeMarkUp = heroHome({ searchSvg });

export function openInput() {
  const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery-list'),
    warning: document.querySelector('.warning'),
  };

  refs.searchForm.addEventListener('submit', onSearch);
  function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;
    const page = 1;
    if (searchQuery.length <= 1) {
      return (refs.warning.textContent =
        'Search result not successful. Enter the correct movie name and try again!');
    } else {
      refs.warning.classList.add('is-hidden');
      renderGallery(searchQuery);
    }
    renderMovieGlobal(page, searchQuery);
  }
}
