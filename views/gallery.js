let currentIndex = 0;
let items = document.querySelectorAll('.gallery-item');
const itemsPerPage = 4;

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
    
  });
}, { threshold: 0.2 });

items.forEach(item => observer.observe(item));

// Load More
function loadMore() {
  let hiddenItems = Array.from(items).filter(item => item.style.display === "none");
  hiddenItems.slice(0, itemsPerPage).forEach((item, i) => {
    item.style.display = "block";
    observer.observe(item);
  });
  if (hiddenItems.length <= itemsPerPage) {
    document.getElementById('loadMoreBtn').style.display = "none";
  }
}

// Filter Gallery
function filterGallery(category, btn) {
  let buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  items.forEach(item => {
    item.classList.remove('show');
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = "block";
      observer.observe(item);
    } else {
      item.style.display = "none";
    }
  });
}

// Lightbox
function openLightbox(item) {
  items = Array.from(document.querySelectorAll('.gallery-item')).filter(el => el.style.display !== "none");
  currentIndex = items.indexOf(item);

  let img = item.querySelector('img');
  let caption = item.querySelector('.caption').innerText;

  document.getElementById('lightbox').style.display = 'block';
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-caption').innerText = caption;
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function changeSlide(step) {
  currentIndex = (currentIndex + step + items.length) % items.length;
  let img = items[currentIndex].querySelector('img');
  let caption = items[currentIndex].querySelector('.caption').innerText;

  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-caption').innerText = caption;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  let lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'block') {
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'Escape') closeLightbox();
  }
});
