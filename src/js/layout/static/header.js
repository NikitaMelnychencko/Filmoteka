const refs = {
  myUlEle: document.querySelectorAll('.nav__title > li'),
};

refs.myUlEle.forEach((n, i, a) => {
  n.addEventListener('click', () =>
    a.forEach(m => m.classList.toggle('nav__current', m === n)),
  );
});

// refs.clicMyLib.forEach(list => {
//   list.addEventListener('click', function (eve) {
// //     eve.preventDefault();
//     console.log(eve);
//     if (eve.target.textContent == 'my library') {
//       refs.removeSerch.classList.add('hidden');
//       refs.headBtn.classList.remove('hidden');
//     } else if (eve.target.textContent == 'home') {
//       refs.headBtn.classList.add('hidden');
//       refs.removeSerch.classList.remove('hidden');
//     } else if (eve.target.textContent !== 'login') {
//       // Передать функцию модального окна авторизации

//       console.log('Open modal Auteri');
//     }
//   });
// });

// function appendfotoTpl(articles) {
//   refs.headBtn.insertAdjacentHTML('beforeend', buttonHeader(articles));
// }

// function removefotoTpl(event) {
//   refs.headBtn.remove(buttonHeader(event));
// }
// eve.preventDefault()

// Модальное окно
// function onOpenModal(event) {
//   window.addEventListener('keydown', closeEsc);
//   refs.bodymodal.insertAdjacentHTML('beforeend', modalWindow(event));
//   console.log('Modal');
// }
// function onCloseModal() {
//   window.removeEventListener('keydown', closeEsc);
//   document.body.classList.remove('show-modal');
// }

// function mouseCloseMOdal(event) {
//   if (event.currentTarget === event.target) {
//     onCloseModal();
//   }
// }

// function closeEsc(event) {
//   console.log(event.currentTarget);
//   if (event.code === 'Escape') {
//     onCloseModal();
//   }
// }
