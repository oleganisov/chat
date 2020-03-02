const auth = () => {
    const wrapper = document.querySelector('.wrapper');
    const auth = document.querySelector('.auth');
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
};

export default auth;
