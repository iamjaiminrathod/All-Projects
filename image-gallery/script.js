const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('show');
});

lightbox.addEventListener('click', e => {
  if(e.target !== lightboxImg) lightbox.classList.remove('show');
});
