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
      const col = document.querySelectorAll('.col');

      col.forEach((element, index) => {
        anime({
          targets: element,
          opacity: 1,
          duration: 1500,
          easing: 'easeInOutQuad',
          delay: index * 200,
        });
      });
};


