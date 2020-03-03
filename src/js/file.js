const file = () => {
    const fileReader = new FileReader();
    const avatarPhoto = document.querySelector('#avatarPhoto');
    const myAvatar = document.querySelector('#myAvatar');
    const photoImg = document.querySelector('.photo__img');

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
};

export default file;
