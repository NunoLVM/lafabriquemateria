// /public/scripts/hero-carousel.js
const carousels = document.querySelectorAll("[data-carousel]");

const focusIndicator = (indicator, isActive) => {
  indicator.setAttribute("aria-selected", String(isActive));
  indicator.classList.toggle("is-active", isActive);
  indicator.tabIndex = isActive ? 0 : -1;
};

const updateSlideState = (slides, activeIndex) => {
  slides.forEach((slide, index) => {
    const isActive = index === activeIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });
};

carousels.forEach((carousel) => {
  const viewport = carousel.querySelector(".hero-carousel__viewport");
  const slides = Array.from(carousel.querySelectorAll(".hero-carousel__slide"));
  const indicators = Array.from(carousel.querySelectorAll(".hero-carousel__indicator"));
  const controls = carousel.querySelectorAll("[data-action]");
  if (!viewport || slides.length === 0) return;

  let current = 0;
  carousel.classList.add("hero-carousel--enhanced");

  const sync = () => {
    updateSlideState(slides, current);
    indicators.forEach((btn, i) => focusIndicator(btn, i === current));
  };

  indicators.forEach((indicator, index) => {
    focusIndicator(indicator, index === current);
    indicator.addEventListener("click", () => {
      current = index;
      sync();
    });
    indicator.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const delta = event.key === "ArrowRight" ? 1 : -1;
        current = (current + delta + slides.length) % slides.length;
        sync();
        indicators[current].focus();
      }
    });
  });

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      const action = control.dataset.action;
      const delta = action === "next" ? 1 : -1;
      current = (current + delta + slides.length) % slides.length;
      sync();
    });
  });
});
