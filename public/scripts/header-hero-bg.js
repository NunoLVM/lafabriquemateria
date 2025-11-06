(() => {
  const bootHeaderTail = () => {
    const headerEl = document.querySelector("header.overlay");
    const heroImg = document.querySelector(".hero .hero-image");
    const heroSec = document.getElementById("accueil");
    if (!headerEl || !heroImg || !heroSec) return;

    const heroSrc = heroImg.getAttribute("src") || "";
    const HEADER_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80;
    const OFFSET = 0; // troca no limite exato do header

    const enableBg = () => {
      // mesma imagem, mesma “lógica” visual: cover + base
      headerEl.style.removeProperty("background");
      headerEl.style.removeProperty("backgroundColor");

      headerEl.style.backgroundImage = `url("${heroSrc}")`;
      headerEl.style.backgroundRepeat = "no-repeat";
      headerEl.style.backgroundPosition = "center bottom";
      headerEl.style.backgroundSize = "cover"; // cobre o header sem deformar
      headerEl.style.backgroundAttachment = "fixed"; // efeito fixo fluido

      headerEl.classList.add("with-hero-bg");
    };

    const disableBg = () => {
      headerEl.style.backgroundImage = "none";
      headerEl.classList.remove("with-hero-bg");
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = heroSec.getBoundingClientRect();
        const outside = r.bottom <= HEADER_H + OFFSET;
        if (outside) enableBg();
        else disableBg();
        ticking = false;
      });
    };

    const onResize = () => {
      // mantém consistência após resize/orientation
      if (headerEl.classList.contains("with-hero-bg")) enableBg();
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootHeaderTail);
  } else {
    bootHeaderTail();
  }
})();
