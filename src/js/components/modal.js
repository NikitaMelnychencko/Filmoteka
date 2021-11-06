import { refs } from '../refs/refs';
import modal_markup from '../../views/components/modal.hbs';

export function modalMarkup(modalContent) {
  refs.modal.insertAdjacentHTML('afterend', modal_markup(modalContent));
}
