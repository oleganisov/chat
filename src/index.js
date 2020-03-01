import '../assets/css/_styles.scss';
import { expand, maximize, close } from './js/controls';

const auth = document.querySelector('.auth');
const wrapper = document.querySelector('.wrapper');
const btnSubmit = document.querySelector('.form__submit');

const authForm = document.querySelector('#form-auth');
const userName = authForm.user;
const userNick = authForm.nick;

btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    if (userName.value && userNick.value) {
        auth.style.display = 'none';
        wrapper.style.display = 'block';
    } else {
        alert('Не заполнены поля');
    }
});

const btnSend = document.querySelector('.chat__send');

btnSend.addEventListener('click', e => {
    e.preventDefault();
});

expand();
maximize();
close();
