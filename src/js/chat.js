import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('connect');
});

const chat = () => {
    const chatForm = document.querySelector('#chatForm');
    const btnSend = document.querySelector('.chat__send');
    const addMessage = message => {
        const chatList = document.querySelector('.chat__list');
        const chatItem = document.createElement('li');

        chatItem.classList.add('chat__item');
        chatItem.classList.add('chat__item_right');
        chatItem.textContent = message;
        chatList.appendChild(chatItem);
        chatList.scrollTop = chatList.scrollHeight;
    };

    btnSend.addEventListener('click', e => {
        e.preventDefault();
        if (chatForm.message.value) {
            socket.emit('chat message', chatForm.message.value);
        } else {
            alert('Введите сообщение!');
        }
        chatForm.message.value = '';
    });

    socket.on('chat message', msg => addMessage(msg));
};

export default chat;
