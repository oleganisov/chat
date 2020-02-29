import '../assets/css/styles.scss';

const authForm = document.querySelector('#form-auth');
const btnSubmit = document.querySelector('.form__submit');
const userName = authForm.user;
const userNick = authForm.nick;

btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    console.log(userName.value, userNick.value);
});
