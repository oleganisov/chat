import io from 'socket.io-client';
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
        const chatItem = document.createElement('li');
        const chatItemMsg = document.createElement('span');
        const chatItemTime = document.createElement('span');

        chatItemTime.classList.add('chat__item_time');
        chatItemTime.textContent = msgObj.time;
        chatItemMsg.classList.add('chat__item_msg');
        chatItemMsg.textContent = msgObj.message;

        chatItem.appendChild(chatItemMsg);
        chatItem.appendChild(chatItemTime);
        chatItem.classList.add('chat__item');
        if (msgObj.user == userNick.value) {
            chatItem.classList.add('chat__item_right');
        } else {
            chatItem.classList.add('chat__item_left');
        }

        chatList.appendChild(chatItem);
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
