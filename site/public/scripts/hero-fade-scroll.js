window.addEventListener("scroll", () => {
  const hero = document.getElementById("hero");
  const content = hero?.querySelector(".hero-content");
  if (!content) return;

  const scrollY = window.scrollY;
  const fadeStart = 0;
  const fadeEnd = 300;

  const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
  const opacity = 1 - progress;
  const translateY = progress * -30;

  content.style.opacity = opacity;
  content.style.transform = `translateY(${translateY}px)`;
});
