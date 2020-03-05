import io from 'socket.io-client';

const wrapper = document.querySelector('.wrapper');
const authContainer = document.querySelector('.auth');
const btnSubmit = document.querySelector('.form__submit');
const authForm = document.querySelector('#form-auth');
const currentUser = document.querySelector('#currentUser');

const userName = authForm.user;
const userNick = authForm.nick;
const socket = io('http://localhost:3000');
let userId = '';

const auth = () => {
    btnSubmit.addEventListener('click', e => {
        e.preventDefault();
        if (userName.value && userNick.value) {
            authContainer.style.display = 'none';
            wrapper.style.display = 'block';
            currentUser.innerText = userName.value;

            socket.emit('connectUser', {
                userNick: userNick.value,
                userName: userName.value
            });
        } else {
            alert('Не заполнены поля');
        }
    });
    socket.on('registerInfo', data => {
        userId = data.userId;
        socket.emit('registerInfo', {
            userId: userId,
            userNick: userNick.value,
            userName: userName.value
        });
    });
};

export default auth;
export { userNick, userName, userId, socket };
