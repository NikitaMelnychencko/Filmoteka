refs = {
  inputSerch: document.querySelector('.header-form__text'),
  serchButton: document.querySelector('.serch'),
};

refs.inputSerch.addEventListener('input', inputText);
refs.serchButton.addEventListener('click', submitFun);

function inputText() {
  if (refs.inputSerch.value === '') {
    console.log('Yes');
  }
}

function submitFun() {
  if (refs.inputSerch.value === '') {
    alert('Error');
  } else {
    inputText();
  }
}
