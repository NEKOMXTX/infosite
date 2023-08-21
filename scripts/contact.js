window.onload = function () {
    const body = document.body;
    body.style.visibility = 'visible'; // Показываем контент после полной загрузки

    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    function checkAllImagesLoaded() {
        loadedImages++;
        if (loadedImages === images.length) {
            body.style.visibility = 'visible'; // Показываем контент после загрузки всех изображений
        }
    }

    images.forEach((image) => {
        if (image.complete) {
            checkAllImagesLoaded();
        } else {
            image.addEventListener('load', checkAllImagesLoaded);
        }
    });
    const cards = document.querySelectorAll('.card');

    cards.forEach((element, index) => {
        anime({
            targets: element,
            opacity: 1,
            duration: 1500,
            easing: 'easeInOutQuad',
            delay: index * 200,
        });
    });
};
const copyButtons = document.querySelectorAll('.copyButton');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.getAttribute('data-text');
        copyTextToClipboard(textToCopy);
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 3000);
    });
});

function copyTextToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}