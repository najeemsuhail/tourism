document.addEventListener("DOMContentLoaded", function () {
  // Submenu toggle on caret click
  document.querySelectorAll(".submenu-toggle").forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();

      // Find the parent menu-item
      const menuItem = this.closest(".menu-item");
      const submenu = menuItem.querySelector(".submenu");

      // Toggle submenu visibility
      submenu.classList.toggle("open");

      // Toggle icon if using text
      if (this.textContent === "▼") {
        this.textContent = "▲";
      } else if (this.textContent === "▲") {
        this.textContent = "▼";
      }
    });
  });

  // Carousel auto-slide
  let index = 0;
  const carousel = document.getElementById('carousel');
  if (carousel) {
    setInterval(() => {
      index = (index + 1) % 3;
      carousel.style.transform = `translateX(-${index * 100}vw)`;
    }, 4000);
  }


/* listing carousle */
  const track = document.querySelector(".listing-carousel-track");
    const items = document.querySelectorAll(".listing-carousel-item");
    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");

    const itemCount = items.length;
    const visibleCount = window.innerWidth <= 768 ? 1 : 3;
    let currentSlide = 0;

    const updateCarousel = () => {
      const itemWidth = items[0].offsetWidth;
      const moveX = currentSlide * itemWidth;
      track.style.transform = `translateX(-${moveX}px)`;
    };

    nextBtn.addEventListener("click", () => {
      if (currentSlide < itemCount - visibleCount) {
        currentSlide++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });

    // Recalculate on resize
    window.addEventListener("resize", () => {
      currentSlide = 0;
      updateCarousel();
    });




/*carousel image lightbox*/ 
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  // When any carousel image is clicked
  document.querySelectorAll(".listing-carousel-item img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  // Close the lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });


});
