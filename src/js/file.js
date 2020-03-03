let userAvatar = '../../assets/img/photo-camera.png';
const file = () => {
    const fileReader = new FileReader();
    const avatarPhoto = document.querySelector('#avatarPhoto');
    const myAvatar = document.querySelector('#myAvatar');
    const photoImg = document.querySelector('.photo__img');
    const btnCancel = document.querySelector('.photo__cancel');
    const btnSave = document.querySelector('.photo__save');

    const overlay = document.querySelector('.photo_overlay');

    avatarPhoto.addEventListener('change', e => {
        const file = e.target.files[0];

        if (file) {
            if (file.size > 500 * 1024) {
                alert('Слишком большой файл');
            } else {
                fileReader.readAsDataURL(file);
                overlay.style.display = 'block';
            }
        }
    });
    fileReader.addEventListener('load', () => {
        photoImg.src = fileReader.result;
    });
    btnCancel.addEventListener('click', e => {
        e.preventDefault();
        avatarPhoto.value = null;
        overlay.style.display = 'none';
    });
    btnSave.addEventListener('click', e => {
        e.preventDefault();
        overlay.style.display = 'none';
        myAvatar.src = fileReader.result;
        userAvatar = fileReader.result;
    });
};

export default file;
export { userAvatar };
