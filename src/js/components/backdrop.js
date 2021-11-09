const backdrop = document.querySelector('.backdrop');
export function renderBackdrop() {
  backdrop.classList.add('backdrop_is-open');
}

export function closeBackdrop() {
  backdrop.classList.remove('backdrop_is-open');
}
