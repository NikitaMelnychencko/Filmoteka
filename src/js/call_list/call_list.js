import main from '../../views/layout/main.hbs'
import card from '../../views/components/card_galery.hbs'
import { refs } from '../refs/refs.js'
//test
refs.main.innerHTML = main();
//refs.card.innerHTML = card();

const gallery = document.querySelector('.gallery-list')
console.log(card)
gallery.insertAdjacentHTML('afterbegin', card());
//console.log(card());