// Fixed scroll cue: always jump to the next section below the viewport
(() => {
  const ORDER = ["accueil", "savoir-faire", "a-propos", "contact"];
  const cue = document.querySelector(".scroll-cue.fixed");
  if (!cue) return;

  const cssVar = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const HEADER = parseInt(cssVar) || 64;
  const sections = ORDER.map((id) => document.getElementById(id)).filter(Boolean);
  if (sections.length < 2) {
    cue.style.display = "none";
    return;
  }

  const nextTargetId = () => {
    const cutoff = window.scrollY + HEADER + 8; // início útil da janela
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].getBoundingClientRect().top + window.scrollY;
      if (top > cutoff + 1) return sections[i].id; // primeira secção abaixo
    }
    return null;
  };

  const updateCue = () => {
    const id = nextTargetId();
    if (id) {
      cue.href = `/#${id}`;
      cue.style.opacity = "1";
      cue.style.pointerEvents = "auto";
    } else {
      cue.href = "#";
      cue.style.opacity = "0";
      cue.style.pointerEvents = "none";
    }
  };

  cue.addEventListener(
    "click",
    (e) => {
      const id = (cue.getAttribute("href") || "").split("#")[1] || nextTargetId();
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - (HEADER + 8);
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", `/#${id}`);
      setTimeout(updateCue, 300);
    },
    { passive: false }
  );

  ["scroll", "resize", "hashchange"].forEach((ev) => window.addEventListener(ev, updateCue, { passive: true }));

  updateCue();
})();
