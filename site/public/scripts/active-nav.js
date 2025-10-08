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

  // ❶ Ativar já no clique (antes do scroll suave)
  nav.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach((a) => {
    const m = a.getAttribute("href")?.match(/#(.+)$/);
    if (!m) return;
    const id = m[1];
    a.addEventListener("click", () => setActive(id), { passive: true });
  });

  // ❷ Ativar ao mudar o hash (fallback)
  if (location.hash) setActive(location.hash.slice(1));
  window.addEventListener("hashchange", () => setActive(location.hash.slice(1)));

  // ❸ Ativar ao rolar (IntersectionObserver)
  const headerVar = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const HEADER = parseInt(headerVar) || 64;

  const sections = IDS.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !links.size) return;

  const io = new IntersectionObserver(
    (entries) => {
      // escolhe a secção com maior área visível
      const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (best) setActive(best.target.id);
    },
    {
      root: null,
      rootMargin: `-${HEADER + 8}px 0px -55% 0px`, // acelera a troca quando a nova entra
      threshold: [0.15, 0.4, 0.6],
    }
  );

  sections.forEach((s) => io.observe(s));
})();
