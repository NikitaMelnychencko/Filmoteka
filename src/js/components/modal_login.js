import { regUser, signInUser,AuthState,updateInUser,user} from './films_library';
import { refs } from '../refs/refs.js';
import { addSpinner,removeSpinner } from './spinner';


refs.formLog.addEventListener('submit', e => {
  e.preventDefault();
  addSpinner()
  const formData = new FormData(e.currentTarget)
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  signInUser(emailValue, passValue)
  clearInput(refs.formLog, 2)
  removeSpinner()
})

refs.formReg.addEventListener('submit', e => {
  e.preventDefault();
  addSpinner()
  const formData = new FormData(e.currentTarget)
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  const nameValue = formData.get('name');
  regUser(emailValue, passValue)
  updateInUser(nameValue)
  AuthState(user)
  clearInput(refs.formReg, 3)
  removeSpinner()
})


function clearInput(ref,number) {
  for (let i = 0; i < number; i++) { 
    ref.children[i].children[1].value=''
  }
}