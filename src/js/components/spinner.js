// function addSpinner - добавляет спинер
// function removeSpinner - убирает спинер

function getRefs() {
  const refs = {
    spinner: document.querySelector('.spinner-container'),
  };
  return refs;
}

export function addSpinner() {
  const refs = getRefs();
  refs.spinner.classList.add('is-active');
}
export function removeSpinner() {
  const refs = getRefs();
  setTimeout(function () {
    refs.spinner.classList.remove('is-active');
  }, 500);
}
