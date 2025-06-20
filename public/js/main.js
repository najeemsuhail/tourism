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
});
