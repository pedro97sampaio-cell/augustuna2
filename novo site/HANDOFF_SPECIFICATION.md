# Augustuna Web Platform — Rebuild Specification (AI Handoff)

> [!IMPORTANT]  
> **CONTEXT FOR THE AI:** You are receiving a comprehensive technical blueprint to build or rebuild the **Augustuna** website from scratch. This is a Vanilla **Single Page Application (SPA)** utilizing HTML5, CSS3, and JavaScript, driven by a dynamic JSON data architecture. 

---

## 1. Project Overview & Architecture
* **Stack**: Pure HTML, CSS (Vanilla), JS (Vanilla). No frameworks (no React/Vue).
* **Architecture**: The site acts as an SPA using CSS-based tab/section switching. A main `script.js` handles routing, DOM generation, and data fetching, while `index.html` holds the component skeleton.
* **External APIs**: Uses **EmailJS** for checkout and contact form submissions.

## 2. Design System: "The Digital Atelier"
The website uses an Editorial "Parchment and Ink" aesthetic.

### 2.1 CSS Variables / Color Tokens
```css
:root {
  /* Core Brand Colors */
  --primary: #00336c;           /* Editorial Blue (Main Call-to-actions) */
  --primary-container: #1b4a8b; /* Secondary Blue gradient */
  --on-primary: #ffffff;        /* Text over primary */
  
  /* Layout Colors */
  --surface: #fcf9f6;           /* Main "Paper" background (60% of layout) */
  --on-surface: #1c1c1a;        /* Deep Charcoal text */
  --surface-low: #f6f3f0;       /* Slight grey-white contrast */
  
  /* Support Colors */
  --dourado: #C9A84C;           /* Accent Gold (subtle use) */
  
  /* Shadows & Layout constraints */
  --shadow-ambient: 0 40px 40px -20px rgba(28, 28, 26, 0.06); /* No heavy drop shadows */
  --border-radius-base: 1rem;   /* "Round Four" rule for cards and buttons */
}
```

### 2.2 Typography
Follow strict Google Fonts implementations:
* **`Newsreader`** (Serif): Used for all Headings (`h1` to `h6`), general display text, and lengthy article bodies.
* **`Inter`** (Sans-Serif): Used exclusively for micro-copy, UI Labels, `button` text, and form inputs.

### 2.3 Visual Behavior
* **Glassmorphism Nav**: Top navigation should be fixed, `var(--surface)` with `80% opacity` and `backdrop-filter: blur(20px)`. Text must be dark charcoal.
* **Buttons**: `.btn` must have `border-radius: 1rem`. Primary buttons use a linear-gradient (`var(--primary)` to `var(--primary-container)`) with a subtle top inner-glow offset.
* **Ghost Borders**: Structural dividers use `#c3c6d2` at 15% opacity, instead of solid 1px lines.

---

## 3. Structural Skeleton (Sitemap)
The single `index.html` file contains all sections, hidden or shown dynamically via JS classes (e.g., adding `.active` to `.page-section`).

1. **`loader-wrapper`**: A pre-loading screen element.
2. **`header`**: Contains the Glassmorphic Top Nav and the Mobile Bottom Navbar.
3. **`#inicio` (Hero)**: Needs to be visually distinct. Usually dark `var(--azul-profundo: #0A1628)` fading into an image (`url('Untitled_design17.png')`).
4. **`#newsContent`**: Dynamic CSS grid mapping the latest news cards.
5. **`#historia`**: Static timeline of the tuna.
6. **`#eventos` & `#atuacoes`**: Event calendars using specific dropdown filters.
7. **`#membros`**: "A Parede". Contains a dropdown UI to filter members by generations.
8. **`#loja`**: Merchandising catalog with a dynamic Javascript Shopping Cart.
9. **`#contactos`**: Location, Social Links, and a Contact form.
10. **`#checkout-modal`**: A modal window overlapping the screen when users attempt to finalize a cart purchase.

---

## 4. Javascript Functionality & Data Flow (`script.js`)

### 4.1 Global Arrays
The site fetches all content dynamically via local JSON files. An `async` init function must fetch and populate global arrays:
- `NOTICIAS_DATA`, `ATUACOES_DATA`, `MEMBERS_DATA`, `EVENTOS_DATA`, `LOJA_DATA`.
- *(Example: Fetching `data/noticias.json` parsing it, and rendering HTML strings into the `#newsContent` div)*.

### 4.2 Filtering and Dropdowns
The system uses custom dropdowns (no `<select>` tags due to styling). JS intercepts click events on `.dropdown-item`, updates a hidden input, and re-triggers the `renderMembros()` or `renderAtuacoes()` methods to filter the array map visually.

### 4.3 Shopping Cart Logic
* **State**: An array `let cart = []` handles the active session.
* **Adding**: Clicking "Adicionar" extracts the dataset (`data-id`, `data-nome`, `data-preco`) and pushes it to `cart`.
* **Updating UI**: A counter updates on the Top Nav Cart icon.

### 4.4 EmailJS Integration
The checkout and contact forms serialize data and send it directly via EmailJS. **This requires precise ID mapping**.
- Include: `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>`
- Init script: `emailjs.init("4GmdocNDaZch7KCV");`
- JS Form Submit Call: `emailjs.send("service_4cidzzm", "template_wemhxna", formObject)`

---

## 5. "DOs and DON'Ts" for Generation

> [!WARNING]  
> **Critical instructions to avoid breaking the layout when regenerating the code.**

- **DO NOT** hardcode elements like news or members inside the HTML. Always generate placeholder `<div>` containers (e.g., `<div id="membrosContent"></div>`) and rely on javascript `map()` functions to inject the innerHTML cards.
- **DO NOT** use `#xxxxxx` hex codes directly inside JavaScript rendering functions if they belong to the design system. Use CSS `var(--primary)` so themes can be switched globally without editing JS logic.
- **DO** map specific IDs exact matching the EmailJS requirements (for example: `checkoutNome`, `checkoutEmail`, `checkoutTotal`).
- **DO** verify CSS specificity! A lot of Javascript relies on `.active` classes overriding `display: none` for page changes. Keep `display: flex !important` logic for active states safe.
