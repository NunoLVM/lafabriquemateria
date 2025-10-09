// Atualiza o href da seta fixa para a próxima secção visível
(() => {
  const ORDER = ["accueil", "savoir-faire", "a-propos", "contact"];
  const cue = document.querySelector(".scroll-cue.fixed");
  if (!cue) return;

  const sections = ORDER.map((id) => document.getElementById(id)).filter(Boolean);

  if (sections.length < 2) {
    cue.style.display = "none";
    return;
  }

  const linkTo = (i) => (i < sections.length - 1 ? `/#${ORDER[i + 1]}` : null);

  const setForIndex = (i) => {
    const href = linkTo(i);
    if (href) {
      cue.href = href;
      cue.style.opacity = "1";
    } else {
      cue.style.opacity = "0";
      cue.style.pointerEvents = "none";
    }
  };

  // IO: qual secção está mais visível?
  const headerVar = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const HEADER = parseInt(headerVar) || 64;

  const io = new IntersectionObserver(
    (entries) => {
      const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!best) return;
      const idx = sections.indexOf(best.target);
      setForIndex(idx);
    },
    { rootMargin: `-${HEADER + 8}px 0px -45% 0px`, threshold: [0.2, 0.5, 0.75] }
  );

  sections.forEach((s) => io.observe(s));

  // estado inicial
  if (location.hash) {
    const id = location.hash.slice(1);
    const idx = ORDER.indexOf(id);
    if (idx >= 0) setForIndex(idx);
  } else {
    setForIndex(0);
  }
})();
