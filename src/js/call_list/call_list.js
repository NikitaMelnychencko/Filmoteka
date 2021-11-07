import main from '../../views/layout/main.hbs'
import { refs } from '../refs/refs.js'
//test
refs.main.innerHTML = main();

// function homeRender() {
//   refs.main.innerHTML = main({homeMarkUp});
// }
// homeRender()