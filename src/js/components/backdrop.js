const backdrop = document.querySelector('.backdrop');
console.log(backdrop);
export function renderBackdrop() {
  backdrop.classList.add('backdrop_is-open');
  document.body.style.overflow = 'hidden';
}

export function closeBackdrop() {
  backdrop.classList.remove('backdrop_is-open');
  document.body.style.overflow = 'scroll';
}
