import { refs } from '../refs/refs.js';

window.onload = function () {
  setTimeout(preloaderIsHided,1500)

};
  
function preloaderIsHided() {
  refs.preloader.classList.add('loading--hiden')
}