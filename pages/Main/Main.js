

const photos = document.querySelectorAll(".PLANT-BOX img");

images.forEach(image => {
    image.addEventListener('mouseover', () => {
      // Add the "hover" class to the image's parent div
      image.parentElement.classList.add('hover');
    });

    
    myPhoto.addEventListener('mouseout' , () => {
       myPhoto.classList.remove('hover');
    });


})