import io from 'socket.io-client';
import renderMessage from '../template/msg.hbs';
import { userNick } from './auth';
import { userAvatar } from './file';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    // console.log('connect');
});

let whoLast = '';

const chat = () => {
    const chatForm = document.querySelector('#chatForm');
    const btnSend = document.querySelector('.chat__send');
    const chatBox = document.querySelector('.chat__box');

    const addMessage = msgObj => {
        const chatList = document.querySelector('.chat__list');
        let listHTML = chatList.innerHTML;
        let isAvatar = false;
        let isRight = false;

        if (msgObj.user == userNick.value) {
            isRight = true;
        }
        if (whoLast !== msgObj.user) {
            isAvatar = true;
        } else {
            isAvatar = false;
        }
        whoLast = msgObj.user;

        listHTML =
            listHTML +
            renderMessage({
                message: msgObj.message,
                time: msgObj.time,
                isRight: isRight,
                avatar: msgObj.avatar,
                isAvatar: isAvatar
            });

        chatList.innerHTML = listHTML;
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    btnSend.addEventListener('click', e => {
        e.preventDefault();
        let msgObj = {};
        let time = new Date().toLocaleString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (chatForm.message.value && userNick.value) {
            msgObj = {
                message: chatForm.message.value,
                user: userNick.value,
                time: time,
                avatar: userAvatar
            };
            socket.emit('chat message', msgObj);
        } else {
            alert('Введите сообщение!');
        }
        chatForm.message.value = '';
    });

    socket.on('chat message', msg => addMessage(msg));
};

export default chat;
