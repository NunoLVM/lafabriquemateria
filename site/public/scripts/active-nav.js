// Active navbar link on click + while scrolling
(() => {
  const IDS = ["accueil", "savoir-faire", "a-propos", "contact"];

  const header = document.querySelector("header");
  const nav = header?.querySelector("nav");
  if (!header || !nav) return;

  const linkFor = (id) => nav.querySelector(`a[href="/#${id}"], a[href="#${id}"]`);
  const links = new Map(IDS.map((id) => [id, linkFor(id)]).filter(([, a]) => a));

  const setActive = (id) => {
    links.forEach((a) => a.classList.remove("is-active"));
    const a = links.get(id);
    if (a) a.classList.add("is-active");
  };

  // ❶ Ativa no clique
  nav.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach((a) => {
    const m = a.getAttribute("href")?.match(/#(.+)$/);
    if (!m) return;
    const id = m[1];
    a.addEventListener("click", () => setActive(id), { passive: true });
  });

  // ❷ Ativa no hash
  if (location.hash) setActive(location.hash.slice(1));
  window.addEventListener("hashchange", () => setActive(location.hash.slice(1)));

  // ❸ Ativa ao rolar (IntersectionObserver)
  const headerVar = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const HEADER = parseInt(headerVar) || 64;

  const sections = IDS.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !links.size) return;

  const io = new IntersectionObserver(
    (entries) => {
      const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (best) setActive(best.target.id);
    },
    { root: null, rootMargin: `-${HEADER + 8}px 0px -55% 0px`, threshold: [0.15, 0.4, 0.6] }
  );
  sections.forEach((s) => io.observe(s));


  // ❹ Header herda a “cauda” da hero (sem mexer no logo)
  const bootHeaderTail = () => {
    const headerEl = document.querySelector("header.overlay");
    const heroImg = document.querySelector(".hero .hero-image");
    const heroSec = document.getElementById("accueil");
    if (!headerEl || !heroImg || !heroSec) return;

    const heroSrc = heroImg.getAttribute("src") || "";
    const HEADER_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80;
    const OFFSET = 4;

    // aplica/limpa TUDO explícito (evita “imagem opaca estranha”)
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

    // debug rápido: confirma que é MESMO a hero
    console.debug("[header tail] heroSrc =", heroSrc);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootHeaderTail);
  } else {
    bootHeaderTail();
  }
})();
