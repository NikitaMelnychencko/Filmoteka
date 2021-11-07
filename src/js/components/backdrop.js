import { refs } from '../refs/refs';
import backdrop_markup from '../../views/components/backdrop.hbs';
refs.modal.insertAdjacentHTML('beforeend', backdrop_markup());

const backdrop = document.querySelector('.backdrop');
export function renderBackdrop() {
  backdrop.classList.add('backdrop_is-open');
}

export function closeBackdrop() {
  backdrop.classList.remove('backdrop_is-open');
}
