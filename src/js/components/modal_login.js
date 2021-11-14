import { regUser, signInUser,AuthState,updateInUser,user} from './films_library';
import { refs } from '../refs/refs.js';


refs.formLog.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget)
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  signInUser(emailValue,passValue)
})

refs.formReg.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget)
  const emailValue = formData.get('email');
  const passValue = formData.get('pass');
  const nameValue = formData.get('name');
  regUser(emailValue, passValue)
  updateInUser(nameValue)
  AuthState(user)
})