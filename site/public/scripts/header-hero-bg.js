(() => {
  const bootHeaderTail = () => {
    const headerEl = document.querySelector("header.overlay");
    const heroImg = document.querySelector(".hero .hero-image");
    const heroSec = document.getElementById("accueil");
    if (!headerEl || !heroImg || !heroSec) return;

    const heroSrc = heroImg.getAttribute("src") || "";
    const HEADER_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80;
    const OFFSET = 4;

    const enableBg = () => {
      if (!heroSrc) return;
      headerEl.style.removeProperty("background");
      headerEl.style.removeProperty("backgroundColor");
      headerEl.style.backgroundImage = `url("${heroSrc}")`;
      headerEl.style.backgroundRepeat = "no-repeat";
      headerEl.style.backgroundSize = "cover";
      headerEl.style.backgroundPosition = "center bottom";
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

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("orientationchange", onScroll, { passive: true });

    console.debug("[header tail] heroSrc =", heroSrc);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootHeaderTail);
  } else {
    bootHeaderTail();
  }
})();
