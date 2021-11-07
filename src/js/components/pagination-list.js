import { refs } from '../refs/refs.js'

import pagination from '../../views/components/pagination_list.hbs'

refs.main.innerHTML = pagination();
const lastPage = 10;
const pages = [];

for (let i = 1; i <= lastPage; i += 1) {
    pages.push(i);
}

//console.log(pages);

const container = refs.main.querySelector('.pagination');


console.dir(container);

container.addEventListener('click', console.log(2));

function onClick(evt) {
    // if (evt.target.nodeName !== 'BUTTON') {
    //     return;
    // }

    console.log(evt.target.textContent);
}

//allPages.addEventListener('click', evt => { console.log(evt) });
function onButton(evt) {
    evt.preventDefault();
    console.log(2);
    // if (evt.target.nodeName !== 'IMG') {
    //     return;
    // };

    openModalWindow(evt.target);

}

refs.main.innerHTML = pagination(pages);

const currentPage = 3;
const showPages = 5;
const button = refs.main.querySelectorAll('.page-button');

// console.log(button);
// console.dir(button);
// console.log(button[5]);
button.forEach(data => {
    if (data.textContent == currentPage) {
        data.classList.add("active");
        //console.log("active");
    }
    //console.log(data.textContent)
})

