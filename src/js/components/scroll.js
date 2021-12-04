export function getBrowserId() {
  let aKeys = ['MSIE', 'Firefox', 'Safari', 'Chrome', 'Opera'],
    sUsrAg = navigator.userAgent,
    nIdx = aKeys.length - 1;
  for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);
  return nIdx;
}

function style() {
  return document.documentElement.getAttribute('style');
}

export function stopScroll() {
  document.documentElement.style.cssText = `${style()}overflow: hidden;`;
}

export function restoreScroll() {
  const styleArray = style().split(';');
  styleArray.splice(indexOfNeedStyle(styleArray), 1);
  const styleString = styleArray.join(';');
  document.documentElement.style.cssText = `${styleString}${browserScroll()}`;
}

const browserScroll = function () {
  if (getBrowserId() === 1) {
    return 'overflow: auto;';
  }
  return 'overflow: overlay;';
};

function searchOverflowStyle(array, param) {
  return array.indexOf(param);
}

function indexOfNeedStyle(array) {
  const hidden = searchOverflowStyle(array, ' overflow: hidden');
  const auto = searchOverflowStyle(array, ' overflow: auto');
  const overlay = searchOverflowStyle(array, ' overflow: overlay');
  if (hidden) {
    return hidden;
  } else if (auto) {
    return auto;
  } else if (overlay) {
    return overlay;
  }
  return '';
}
