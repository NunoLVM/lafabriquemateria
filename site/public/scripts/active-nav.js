// Highlight navbar link while scrolling & on hash navigation
(() => {
  const IDS = ["accueil", "savoir-faire", "a-propos", "contact"];

  const linkFor = (id) => document.querySelector(`header nav a[href="/#${id}"], header nav a[href="#${id}"]`);
  const links = new Map(IDS.map((id) => [id, linkFor(id)]).filter(([, a]) => a));

  const setActive = (id) => {
    links.forEach((a) => a.classList.remove("is-active"));
    const a = links.get(id);
    if (a) a.classList.add("is-active");
  };

  const sections = IDS.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !links.size) return;

  // Compensa header fixo
  const headerVar = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const HEADER = parseInt(headerVar) || 64;

  const io = new IntersectionObserver(
    (entries) => {
      const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (best) setActive(best.target.id);
    },
    {
      root: null,
      // ativa quando a secção está bem dentro do viewport
      rootMargin: `-${HEADER + 8}px 0px -40% 0px`,
      threshold: [0.1, 0.5, 0.75],
    }
  );

  sections.forEach((s) => io.observe(s));

  // Também marca ao navegar por hash
  if (location.hash) setActive(location.hash.slice(1));
  window.addEventListener("hashchange", () => setActive(location.hash.slice(1)));
})();
