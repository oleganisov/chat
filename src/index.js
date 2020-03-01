import '../assets/css/_styles.scss';

const auth = document.querySelector('.auth');
const wrapper = document.querySelector('.wrapper');
const btnSubmit = document.querySelector('.form__submit');
const authForm = document.querySelector('#form-auth');
const userName = authForm.user;
const userNick = authForm.nick;

btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    auth.style.display = 'none';
    wrapper.style.display = 'block';
    console.log(userName.value, userNick.value);
});
