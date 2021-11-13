import { closeModal } from './modal';
function backdrop() {
  const backdrop = document.querySelector('.backdrop');
  return backdrop;
}

export function renderBackdrop() {
  backdrop().classList.add('backdrop_is-open');
  document.body.style.overflow = 'hidden';
  backdrop().addEventListener('click', closeMd);
}

export function closeBackdrop() {
  backdrop().classList.remove('backdrop_is-open');
  document.body.style.overflow = 'scroll';
  backdrop().removeEventListener('click', closeMd);
}

function closeMd(evt) {
  if (evt.target.id === 'backdrop') {
    closeModal();
  }
}
