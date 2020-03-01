const wrapper = document.querySelector('.wrapper');

const expand = () => {
    const btnExpand = document.querySelector('.nav__link');
    const panelLeft = document.querySelector('.panel__left');
    const search = document.querySelector('.nav__search');
    const users = document.querySelector('.users');

    btnExpand.addEventListener('click', e => {
        e.preventDefault();
        panelLeft.classList.toggle('panel__left_active');
        search.classList.toggle('active_display');
        users.classList.toggle('active_display');
    });
};
const maximize = () => {
    const btnMax = document.querySelector('#link_maximize');
    const main = document.querySelector('.main');

    btnMax.addEventListener('click', e => {
        e.preventDefault();
        wrapper.classList.toggle('wrapper__max');
        main.classList.toggle('main__max');
    });
};

const close = () => {
    const btnClose = document.querySelector('#link_close');
    const auth = document.querySelector('.auth');

    btnClose.addEventListener('click', e => {
        e.preventDefault();
        auth.style.display = 'block';
        wrapper.style.display = 'none';
    });
};

export { expand, maximize, close };
