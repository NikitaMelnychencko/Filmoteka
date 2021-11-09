import { filterGlobal } from './apiService';
import { renderFotoCard, onBtnOpenImg, renderParamCard } from './app'
import filter from '../tamplate/render-filter.hbs';
import refs from './refs';
const { main } = refs;


let releaseDateDesc = 'primary_release_date.desc';
let releaseDateAsk = 'primary_release_date.asc';
let popularity = 'popularity.asc';


export function filterReleaseDesc() {
    filterGlobal(releaseDateDesc, '')
        .then(data => {
            renderFotoCard(data);

        }).catch(() => {
            alert("error");
        });
}

export function filterReleaseAsk() {
    filterGlobal('', releaseDateAsk)
        .then(data => {
            renderFotoCard(data);
        }).catch(() => {
            alert("error");
        });
}
// onBtnOpenImg()

// filterRelease()



function filterMain(data) {
    const marcup = filter(data)
    main.insertAdjacentHTML("afterbegin", marcup);
    const filterList = document.querySelectorAll('.filter-list__item')
    filterList.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            const linck = e.target.dataset.atribute
            if (linck === "release-date-desc") {
                filterReleaseDesc()
            } else if (linck === "release-date-ask") {
                filterReleaseAsk()
            }
            // else if (linck === ) {
            // }
        })
    })
    // console.log(marcup);
}

// filterMain()
// 









