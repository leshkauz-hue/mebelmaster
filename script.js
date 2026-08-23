function sendForm(event){
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('input[type="text"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();
  const message = `Здравствуйте! Хочу заказать ремонт корпусной мебели.%0AИмя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}`;
  window.open('https://t.me/mebelmasteruz?text=' + message, '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
  const gallery = Array.from(document.querySelectorAll('.works-grid img'));
  const box = document.getElementById('work-lightbox');
  const boxImg = document.getElementById('work-lightbox-img');
  if (!gallery.length || !box || !boxImg) return;

  const closeBtn = box.querySelector('.work-lightbox__close');
  const prevBtn = box.querySelector('.work-lightbox__prev');
  const nextBtn = box.querySelector('.work-lightbox__next');
  let index = 0;

  function show(i) {
    index = (i + gallery.length) % gallery.length;
    boxImg.src = gallery[index].dataset.full || gallery[index].src;
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  gallery.forEach(function (img, i) {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Открыть фото работы крупнее');
    img.addEventListener('click', function () { show(i); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        show(i);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(index - 1); });
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  let startX = 0;
  box.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });
  box.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
  }, { passive: true });
});
