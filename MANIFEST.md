# La Fabrique Materia — Manifest

## Fonte de verdade
- Branch: `dev`
- Último commit conhecido: _preencher com `git rev-parse --short HEAD`_

## Estrutura
src/
components/
AboutTeam.astro
ContactForm.astro
CookieBanner.astro
EditableText.astro
Footer.astro
Header.astro
ScrollCue.astro
SectionContact.astro
SectionHero.astro
layouts/
Base.astro
pages/
a-propos.astro
contact.astro
index.astro
mentions-legales.astro
admin/
login.astro
api/
ping.ts
auth/
debug.js
login.js
logout.js
me.js
content/
get.js
set.js
media/
list.js
upload.js
server/
auth.js
content.js
db.js
env.js
guard.js
migrate.js
seed-admin.js
seed-content.js
styles/
global.css
components/
editable.css
scroll-cue.css
layout/
accessibility.css
base.css
footer.css
header.css
pages/
about-team.css
cookie-banner.css
home-contact.css
home-hero.css
home.css
legal.css
theme/
fonts.css
tokens.css
public/
fonts/...
images/...
images/charte/...
images/SVG/...
images/team/...
scripts/
active-nav.js
header-hero-bg.js
hero-carousel.js
hero-fade-scroll.js
scroll-cue.js
uploads/ (runtime)


## Layout e navegação
- `src/layouts/Base.astro`: shell global. Importa `global.css`, `<Header/>`, `<Footer/>`, `<slot/>`. Scripts comuns: `active-nav.js`, `header-hero-bg.js`.
- Páginas:
  - `pages/index.astro`: Accueil. Usa `SectionHero`, `SectionContact`.
  - `pages/contact.astro`: Contacto. Usa `ContactForm`.
  - `pages/a-propos.astro`: Sobre.
  - `pages/mentions-legales.astro`: Legais.
  - `pages/admin/login.astro`: Login admin.

## Componentes
- `Header.astro`: header fixo. Controlos de nav ativa via `active-nav.js`.
- `Footer.astro`: rodapé com identidade e links.
- `SectionHero.astro`: herói com imagens (`hero.jpg`, `paravent.jpg`, `IMG_1541.jpg`) e possíveis controlos de carrossel (`hero-carousel.js`, `hero-fade-scroll.js`).
- `SectionContact.astro`: secção “Contact”, banda full-bleed conforme tokens.
- `ContactForm.astro`: formulário com campos FR, honeypot opcional.
- `EditableText.astro`: wrapper de edição inline quando autenticado.
- `CookieBanner.astro`: banner cookies.
- `ScrollCue.astro`: indicador de scroll.

## Estilos
- `styles/global.css`: agregador. Respeita `--header-height`, container e padrões.
- `styles/theme/tokens.css`: paleta oficial e tokens: `--footer-bg`, `--footer-text`, `--bg-color-rgb`.
- `styles/layout/*`: base, header, footer, acessibilidade.
- `styles/pages/*`: herói, contacto, legais, equipa.
- `styles/components/*`: editable, scroll-cue.

## Assets e scripts
- `public/images`: logotipos, herói, ícones sociais, “charte”.
- `public/scripts`:
  - `active-nav.js`: destaca link ativo.
  - `header-hero-bg.js`: sincroniza fundo header/hero.
  - `hero-carousel.js`: navegação do carrossel.
  - `hero-fade-scroll.js`: efeitos de opacidade no scroll.
  - `scroll-cue.js`: animação do cue.

## Backend interno (Astro endpoints + server/)
- `src/pages/api/ping.ts`: healthcheck.
- Auth (`src/pages/api/auth/*` + `src/server/auth.js`, `guard.js`):
  - `login.js`: autentica e emite cookie JWT.
  - `logout.js`: limpa sessão.
  - `me.js`: devolve perfil autenticado.
  - `debug.js`: util dev.
- Content (`src/pages/api/content/*` + `src/server/content.js`):
  - `get.js`: lê blocos por chave. Integra `EditableText`.
  - `set.js`: grava blocos. Protegido por `guard.js`.
- Media (`src/pages/api/media/*`):
  - `list.js`, `upload.js`: gestão básica de uploads para `public/uploads/`.
- Infra (`src/server/*`):
  - `db.js`: storage simples (JSON/FS ou adapter). 
  - `env.js`: variáveis. 
  - `migrate.js`, `seed-admin.js`, `seed-content.js`: bootstrap de dados/admin.
  - `guard.js`: middleware de proteção por JWT.

## Fluxos
- **Login admin** → cookie JWT → `EditableText` desbloqueia edição inline → `content/set` persiste.
- **Hero carousel** → imagens em `public/images` → controlos em `hero-carousel.js`.
- **Contact form** → validação client-side mínima → endpoint próprio se existir.

## Convenções
- Branch workflow: `feature/*` → `dev` → `main` para release.
- Routes internas: `/#accueil`, `/#savoir-faire`, `/#a-propos`, `/#contact`.
- A11Y/SEO: landmarks semânticos, alt-text, meta description por página.
