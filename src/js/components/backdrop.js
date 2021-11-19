import { stopScroll, restoreScroll } from './scroll';
export const backdrop = function () {
  return document.querySelector('.backdrop');
};

export function renderBackdrop() {
  stopScroll();
  backdrop().classList.add('backdrop_is-open');
}

export function closeBackdrop() {
  backdrop().classList.remove('backdrop_is-open');
  restoreScroll();
}
