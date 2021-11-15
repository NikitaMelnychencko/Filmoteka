import { closeModal } from './modal';
function backdrop() {
  const backdrop = document.querySelector('.backdrop');
  return backdrop;
}

//from MDN
function getBrowserId() {
  let aKeys = ['MSIE', 'Firefox', 'Safari', 'Chrome', 'Opera'],
    sUsrAg = navigator.userAgent,
    nIdx = aKeys.length - 1;
  for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);
  return nIdx;
}
//from MDN

export function renderBackdrop() {
  backdrop().classList.add('backdrop_is-open');
  document.documentElement.style.overflow = 'hidden';
  backdrop().addEventListener('click', closeMd);
}

export function closeBackdrop() {
  backdrop().classList.remove('backdrop_is-open');
  restoreScroll();
  backdrop().removeEventListener('click', closeMd);
}

function restoreScroll() {
  if (getBrowserId() === 1) {
    document.documentElement.style.overflow = 'auto';
    return;
  }
  document.documentElement.style.overflow = 'overlay';
  return;
}

function closeMd(evt) {
  if (evt.target.id === 'backdrop') {
    closeModal();
  }
}
