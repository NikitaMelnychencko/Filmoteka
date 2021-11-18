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

function style() {
  return document.documentElement.getAttribute('style');
}

export function renderBackdrop() {
  document.documentElement.style.cssText = `${style()} overflow: hidden;`;
  backdrop().classList.add('backdrop_is-open');

  backdrop().addEventListener('click', closeMd);
}

export function closeBackdrop() {
  backdrop().classList.remove('backdrop_is-open');
  restoreScroll();
  backdrop().removeEventListener('click', closeMd);
}

function restoreScroll() {
  console.log(style());

  const indexHidden = style().split(';');
  const ss = indexHidden.indexOf(' overflow: hidden');
  console.log(indexHidden);
  console.log(ss);
  const styleWithoutHidden = indexHidden.splice(ss - 1);
  console.log(styleWithoutHidden);
  const meow = styleWithoutHidden.join(';');
  console.log(meow);
  if (getBrowserId() === 1) {
    document.documentElement.style.cssText = `${meow} overflow: auto;`;
    console.log(style());
    return;
  }
  document.documentElement.style.cssText = `${meow} overflow: overlay;`;
  console.log(style());
  return;
}

function closeMd(evt) {
  if (evt.target.id === 'backdrop') {
    closeModal();
  }
}
