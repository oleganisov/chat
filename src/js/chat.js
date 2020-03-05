import renderMessage from '../template/msg.hbs';
import renderUser from '../template/users.hbs';
import { userNick, userId, socket } from './auth';
import { userAvatar } from './file';

let whoLast = '';

const chat = () => {
    const chatForm = document.querySelector('#chatForm');
    const btnSend = document.querySelector('.chat__send');
    const chatBox = document.querySelector('.chat__box');

    const addMessage = msgObj => {
        const chatList = document.querySelector('.chat__list');
        const usersList = document.querySelectorAll('div[data-userid]');

        usersList.forEach(elem => {
            if (elem.dataset.userid == msgObj.userId) {
                elem.innerText = msgObj.message;
            }
        });

        let listHTML = chatList.innerHTML;
        let isAvatar = false;
        let isRight = false;

        if (msgObj.userId == userId) {
            isRight = true;
        }
        if (whoLast !== msgObj.userId) {
            isAvatar = true;
        } else {
            isAvatar = false;
        }
        whoLast = msgObj.userId;

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

    const addUser = data => {
        const chatInfo = document.querySelector('.chat__info');
        const usersList = document.querySelector('#usersList');
        let listHTML = usersList.innerHTML;
        const users = data.filter(item => {
            return item.userId != userId;
        });

        chatInfo.innerText = `${data.length} участника(ов)`;
        if (users.length) {
            listHTML = renderUser({ users });
            usersList.innerHTML = listHTML;
        }
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
                userId: userId,
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

    socket.on('connectUser', data => addUser(data));

    socket.on('changeAvatar', data => addUser(data));
    socket.on('userDisconnect', data => addUser(data));
};

export default chat;
