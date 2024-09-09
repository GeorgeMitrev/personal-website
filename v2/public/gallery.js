document.addEventListener('DOMContentLoaded', function () {
  const galleryWrapper = document.getElementById('gallery');
  const arrow = document.getElementById('arrow');
  const imageIcon = document.getElementById('image');
  
  // Disable click events
  arrow.style.pointerEvents = 'none';
  imageIcon.style.pointerEvents = 'none';

  // Fetch images from the server
  fetch('/images')
    .then(response => response.json())
    .then(images => {
      images.forEach(image => {
        const galleryLink = document.createElement('a');
        galleryLink.href = `/pictures/${image}`;
        galleryLink.classList.add('gallery-link');
        
        const figure = document.createElement('figure');
        figure.classList.add('gallery-image');
        
        const img = document.createElement('img');
        img.src = `/pictures/${image}`;
        
        const caption = document.createElement('figcaption');
        caption.textContent = "";
        caption.classList.add('gallery-image-caption');
        
        figure.appendChild(img);
        figure.appendChild(caption);
        galleryLink.appendChild(figure);
        galleryWrapper.appendChild(galleryLink);
      });

      // Once content is loaded, re-enable click events
      arrow.style.pointerEvents = 'auto';
      imageIcon.style.pointerEvents = 'auto';

      // Reinitialize magnific popup after images are added
      setTimeout(function() {
        $('.gallery-link').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          closeBtnInside: false,
          mainClass: 'mfp-with-zoom mfp-img-mobile',
          image: {
            verticalFit: true,
            titleSrc: (item) => item.el.find('figcaption').text() || item.el.attr('title')
          },
          zoom: {
            enabled: true
          },
          gallery: {
            enabled: true,
            navigateByImgClick: false,
            tCounter: ''
          },
          disableOn: () => $(window).width() > 640
        });
      }, 100);  // Delay to ensure images are fully loaded
    })
    .catch(err => console.error('Error fetching images:', err));
});

// Grabbing DOM Elements
const checkbox = document.getElementById('toggle-icon');
const body = document.body;
const header = document.getElementById('theheader');
const logo = document.getElementById('logo');
const lighton = document.getElementById('light-on');
const lightoff = document.getElementById('light-off');
const image = document.getElementById('image');
const arrow = document.getElementById('arrow');
const footer = document.getElementById('site-footer');

// Toggle background and text colors, including the body class for SVG handling for light & dark mode
checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    body.classList.add('dark-mode'); 
    body.style.backgroundColor = '#050908';
    header.style.backgroundColor = '#050908';
    logo.style.color = '#ffffff';
    lighton.style.fill = '#ffffff'
    lightoff.style.fill = '#ffffff'
    image.style.fill = '#ffffff';
    arrow.style.fill = '#ffffff';
    footer.style.backgroundColor = '#050908';
    footer.style.color = '#ffffff';
  } else {
    body.classList.remove('dark-mode'); 
    body.style.backgroundColor = '#ffffff';
    header.style.backgroundColor = '#ffffff';
    logo.style.color = '#050908';
    lighton.style.fill = '#050908';
    lightoff.style.fill = '#050908';
    image.style.fill = '#050908';
    arrow.style.fill = '#050908';
    footer.style.backgroundColor = '#ffffff';
    footer.style.color = '#050908';
  }
});

// Matching width of navbar to text
window.addEventListener("load", () => {
  const header = document.getElementById("theheader");
  const galleryTitle = document.querySelector(".gallery-title");

  if (header && galleryTitle) {
    // Match the width of the header to the width of the gallery-title
    const galleryTitleWidth = galleryTitle.getBoundingClientRect().width;
    header.style.width = galleryTitleWidth + "px";
  }
});
window.addEventListener("resize", () => {
  const header = document.getElementById("theheader");
  const galleryTitle = document.querySelector(".gallery-title");

  if (header && galleryTitle) {
    const galleryTitleWidth = galleryTitle.getBoundingClientRect().width;
    header.style.width = galleryTitleWidth + "px";
  }
});
