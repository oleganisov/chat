const wrapper = document.querySelector('.wrapper');
const authContainer = document.querySelector('.auth');
const btnSubmit = document.querySelector('.form__submit');
const authForm = document.querySelector('#form-auth');
const currentUser = document.querySelector('#currentUser');

const userName = authForm.user;
const userNick = authForm.nick;

const auth = () => {
    btnSubmit.addEventListener('click', e => {
        e.preventDefault();
        if (userName.value && userNick.value) {
            authContainer.style.display = 'none';
            wrapper.style.display = 'block';
            currentUser.innerText = userName.value;
        } else {
            alert('Не заполнены поля');
        }
    });
};

export default auth;
export { userNick, userName };
