const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const slideshow = document.getElementById("slideshow");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots-container");

let slideIndex = 0;
let slideInterval;
let visibleSlides = Array.from(slides);

function generateDots() {
  dotsContainer.innerHTML = "";
  visibleSlides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => currentSlide(i + 1);
    dotsContainer.appendChild(dot);
  });
}

function showSlide(n) {
  if (n >= visibleSlides.length) slideIndex = 0;
  if (n < 0) slideIndex = visibleSlides.length - 1;

  slides.forEach(slide => slide.classList.remove("active"));
  visibleSlides.forEach((slide, i) => {
    if (i === slideIndex) {
      slide.classList.add("active");
    }
  });

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.className = dot.className.replace(" active", "");
    if (i === slideIndex) dot.className += " active";
  });
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function changeSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
  resetInterval();
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlide(slideIndex);
  resetInterval();
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 3000);
}

// Pause on hover
slideshow.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

slideshow.addEventListener("mouseleave", () => {
  resetInterval();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    if (filter === "all") {
      visibleSlides = Array.from(slides);
    } else {
      visibleSlides = Array.from(slides).filter(slide => slide.getAttribute("data-filter") === filter);
    }

    slideIndex = 0;
    generateDots();
    showSlide(slideIndex);
    resetInterval();
  });
});

// Lightbox Popup
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".lightbox .close");

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = item.querySelector("img").src;
    lightboxCaption.textContent = item.querySelector(".caption").textContent;
  });
});

slides.forEach(slide => {
  slide.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = slide.querySelector("img").src;
    lightboxCaption.textContent = slide.querySelector(".slide-caption").textContent;
  });
});

closeBtn.onclick = function() {
  lightbox.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === lightbox) {
    lightbox.style.display = "none";
  }
};

// Keyboard navigation for slideshow
document.addEventListener("keydown", (e) => {
  if (slideshow.style.display !== "none") {
    if (e.key === "ArrowLeft") {
      changeSlide(-1);
    } else if (e.key === "ArrowRight") {
      changeSlide(1);
    }
  }
});

// Initialize slideshow on load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".gallery").style.display = "none";
  generateDots();
  showSlide(slideIndex);
  resetInterval();
});
