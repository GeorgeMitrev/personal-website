document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.querySelector('.gallery');
  const track = document.querySelector('.gallery-track');
  let cards = [];
  const easing = 0.05;
  let startY = 0;
  let endY = 0;
  let raf;
  let galleryHeightSet = false;

  // Debounce function to reduce scroll/resize event frequency
  function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Preload image function
  function preloadImage(url) {
    const img = new Image();
    img.src = url;
  }

  // Fetch the list of images from the server
  fetch('/images')
    .then(response => response.json())
    .then(images => {
      images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('card-image-wrapper');
        
        const img = document.createElement('img');
        img.src = `/pictures/${image}`;

        img.onload = () => {
          if (!galleryHeightSet) {
            gallery.style.height = `${track.clientHeight}px`;
            galleryHeightSet = true;
          }
          activateParallax();
        };

        cardImageWrapper.appendChild(img);
        card.appendChild(cardImageWrapper);
        track.appendChild(card);

        // Preload the image
        preloadImage(`/pictures/${image}`);
      });

      // Update cards after images are loaded
      cards = document.querySelectorAll('.card');
      activateParallax();
      updateScroll();
    })
    .catch(err => console.error('Error fetching images:', err));

  const lerp = (start, end, t) => start * (1 - t) + end * t;

  function updateScroll() {
    startY = lerp(startY, endY, easing);
    gallery.style.height = `${track.clientHeight}px`;
    track.style.transform = `translateY(-${startY}px)`;
    activateParallax();
    raf = requestAnimationFrame(updateScroll);
    if (Math.abs(startY - window.scrollY) < 0.1) {
      cancelAnimationFrame(raf);
    }
  }

  function startScroll() {
    endY = window.scrollY;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateScroll);
  }

  function parallax(card) {
    const wrapper = card.querySelector('.card-image-wrapper');
    const diff = card.offsetHeight - wrapper.offsetHeight;
    const { top } = card.getBoundingClientRect();
    const progress = top / window.innerHeight;
    const yPos = diff * progress;
    wrapper.style.transform = `translateY(${yPos}px)`;
  }

  

  function init() {
    activateParallax();
    startScroll();
  }

  window.addEventListener('load', updateScroll, false);
  window.addEventListener('scroll', debounce(init), false);
  window.addEventListener('resize', debounce(updateScroll), false);

  // Circle mouse-follow effect
  const circleElement = document.querySelector('.circle');
  const mouse = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 };
  const circle = { x: 0, y: 0 };

  let currentScale = 0;
  let currentAngle = 0;
  const speed = 0.17;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  const tick = () => {
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;
    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
    const scaleValue = (mouseVelocity / 150) * 0.5;
    currentScale += (scaleValue - currentScale) * speed;
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
    if (mouseVelocity > 20) {
      currentAngle = angle;
    }
    const rotateTransform = `rotate(${currentAngle}deg)`;

    circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

    window.requestAnimationFrame(tick);
  };

  tick();
});