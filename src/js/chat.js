import io from 'socket.io-client';
import renderMessage from '../template/msg.hbs';
import { userNick } from './auth';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    // console.log('connect');
});

const chat = () => {
    const chatForm = document.querySelector('#chatForm');
    const btnSend = document.querySelector('.chat__send');
    const chatBox = document.querySelector('.chat__box');

    const addMessage = msgObj => {
        const chatList = document.querySelector('.chat__list');
        let listHTML = chatList.innerHTML;

        if (msgObj.user == userNick.value) {
            listHTML =
                listHTML +
                renderMessage({
                    message: msgObj.message,
                    time: msgObj.time,
                    class: 'chat__item_right'
                });
        } else {
            listHTML =
                listHTML +
                renderMessage({
                    message: msgObj.message,
                    time: msgObj.time,
                    class: 'chat__item_left'
                });
        }

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
                time: time
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
