import '../assets/css/_styles.scss';
import io from 'socket.io-client';
import { expand, maximize, close } from './js/controls';
import auth from './js/auth';

const fileReader = new FileReader();
const chatPhoto = document.querySelector('#chatPhoto');
const myAvatar = document.querySelector('#myAvatar');

chatPhoto.addEventListener('change', e => {
    const file = e.target.files[0];

    if (file) {
        if (file.size > 300 * 1024) {
            alert('Слишком большой файл');
        } else {
            fileReader.readAsDataURL(file);
        }
    }
});
fileReader.addEventListener('load', () => {
    myAvatar.src = fileReader.result;
});

// socket.io

const chatForm = document.querySelector('#chatForm');
const btnSend = document.querySelector('.chat__send');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('connect');
});

btnSend.addEventListener('click', e => {
    e.preventDefault();
    socket.emit('chat message', chatForm.message.value);

    chatForm.message.value = '';
});
socket.on('chat message', function(msg) {
    const chatList = document.querySelector('.chat__list');
    const chatItem = document.createElement('li');

    chatItem.classList.add('chat__item');
    chatItem.textContent = msg;
    chatList.appendChild(chatItem);

    window.scrollTo(0, document.body.scrollHeight);
});

auth();
expand();
maximize();
close();
