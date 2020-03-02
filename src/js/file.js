const file = () => {
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
};

export default file;
