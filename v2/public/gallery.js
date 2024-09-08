document.addEventListener('DOMContentLoaded', function () {
  const galleryWrapper = document.getElementById('gallery-wrapper');

  // Fetch the list of images from the server
  fetch('/images')
    .then(response => response.json())
    .then(images => {
      images.forEach(image => {
        // Create elements for each image
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

      // Reinitialize Magnific Popup after images are added
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
      }, 100);  // Slight delay to ensure images are fully loaded
    })
    .catch(err => console.error('Error fetching images:', err));
});

const checkbox = document.getElementById('toggle-icon');
const body = document.body;
const header = document.getElementById('theheader');
const logo = document.getElementById('logo');
const lighton = document.getElementById('light-on');
const lightoff = document.getElementById('light-off');
const image = document.getElementById('image');
const arrow = document.getElementById('arrow')

// Toggle background and text colors, including the body class for SVG handling
checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    body.classList.add('dark-mode'); // Add class for white background mode
    body.style.backgroundColor = '#050908';
    header.style.backgroundColor = '#050908';
    logo.style.color = '#ffffff';
    lighton.style.fill = '#ffffff'
    lightoff.style.fill = '#ffffff'
    image.style.fill = '#ffffff';
    arrow.style.fill = '#ffffff';
  } else {
    body.classList.remove('dark-mode'); // Remove class for dark background mode
    body.style.backgroundColor = '#ffffff';
    header.style.backgroundColor = '#ffffff';
    logo.style.color = '#050908';
    lighton.style.fill = '#050908';
    lightoff.style.fill = '#050908';
    image.style.fill = '#050908';
    arrow.style.fill = '#050908';
  }
});

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
