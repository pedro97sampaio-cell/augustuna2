# MatrixSpace - Design System

Este documento detalha o sistema de design (design tokens) extraído do website da MatrixSpace, incluindo paletas de cor, tipografia e estilos dos elementos interativos.


## 🎨 Paleta de Cores (Base Colors)

| Nome | Variável (CSS) | Hex/RGB |
| :--- | :--- | :--- |
| **Branco** | `--base-color--white` | `#ffffff` |
| **Charcoal** | `--base-color--charcoal` | `#232121` |
| **Brand Blue** | `--brand-color--brand-blue` | `#1e5af9` |
| **Cinza 100** | `--base-color--gray-100` | `#f8f8f8` |
| **Cinza 200** | `--base-color--gray-200` | `#f1f1f1` |
| **Cinza 300** | `--base-color--gray-300` | `#cbcbcb` |
| **Cinza 400** | `--base-color--gray-400` | `#939393` |
| **Cinza 500** | `--base-color--gray-500` | `#484848` |
| **Cinzento Transparente**| `--base-color--gray-50` | `rgba(241, 241, 241, 0.2)` |
| **Vermelho Erro** | `--system-color--error-red`| `#c4362c` |

---

## 🎨 Utilização de Cores (Tokens CSS)

### Backgrounds
* **Primário:** Branco (`--bg-primary`)
* **Secundário:** Cinza 200 (`--bg-secondary`)
* **Terciário:** Cinza 300 (`--bg-tertiary`)
* **Alternativo/Dark:** Charcoal (`--bg-alternate`)
* **Background Light:** Cinza 100 (`--bg-light`)
* **Alerta/Erro:** Vermelho Erro (`--bg-error`)

### Textos
* **Primário:** Charcoal (`--text-primary`)
* **Secundário:** Cinza 400 (`--text-secondary`)
* **Brand (Destaque):** Brand Blue (`--text-brand`)
* **Alternativo (Ex. Fundos escuros):** Branco (`--text-alternate`)
* **Erro:** Vermelho Erro (`--text-error`)

### Bordões / Linhas
* **Primário:** Cinza 300 (`--border-primary`)
* **Secundário:** Cinza 400 (`--border-secondary`)
* **Alternativo:** Cinza 500 (`--border-alternate`)

---

## 🔤 Tipografia

A MatrixSpace adota um design multi-tipográfico, separando *headers* (títulos) do corpo de texto interativo.

### Font-Families
1. **Primária (Títulos e Destaques):** `"Nb International", sans-serif`
2. **Secundária (Corpo de texto):** `"Inter", Arial, sans-serif`
3. **Monoespaçada (Etiquetas e Tech):** `"Nb International Mono", Arial, sans-serif`

### Escala Tipográfica (Headers)
*Valores Desktop → Tablet → Mobile | Altura da Linha (Line-height)*

* **H1:** `5.5rem` → `4.75rem` → `3.25rem` | `lh: 0.9`
* **H2:** `4rem` → `3.75rem` → `2.5rem` | `lh: 0.95`
* **H3:** `3.25rem` → `3rem` → `2rem` | `lh: 1`
* **H4:** `2.75rem` → `2.25rem` → `1.75rem` | `lh: 1.1`
* **H5:** `2rem` → `1.75rem` → `1.5rem` | `lh: 1.2`
* **H6:** `1.75rem` → `1.5rem` → `1.375rem` | `lh: 1.2`

### Textos Correntes (Body) & Subtítulos
* **Body Large:** `1.25rem` → `1.125rem` → `1.125rem` | `lh: 1.4`
* **Body Medium:** `1rem` | `lh: 1.5`
* **Body Small:** `0.875rem` | `lh: 1.6`
* **Body XSmall:** `0.75rem` | `lh: 1.75`
* **Subtitle Large:** `1.5rem` → `1.25rem` → `1.125rem` | `lh: 1.3`
* **Subtitle Regular:** `1.125rem` → `1.125rem` → `1rem` | `lh: 1.3`
* **Label (Mono/Mini):** `0.875rem` | `lh: 1`

---

## 🖱️ Botões e Links

### Componente de Botões
* **Botão Primário:**
  * Base: Background `Brand Blue` (#1e5af9) / Texto `Branco` (#fff)
  * Hover: Background `Charcoal` (#232121) / Texto `Branco` (#fff)
* **Botão Secundário:**
  * Base: Background `Transparente` / Texto `Charcoal` (#232121)
  * Hover: Background `Charcoal` (#232121) / Texto `Branco` (#fff)

### Hiperligações (Links)
* **Link Primário:** `Charcoal` (#232121) → *Hover:* `Brand Blue` (#1e5af9)
* **Link Secundário:** `Cinza 400` (#939393)


# Design System Specification: High-End Editorial

## 1. Overview & Creative North Star: "The Digital Atelier"
This design system is a departure from the generic, grid-locked patterns of modern SaaS. It is built on the philosophy of **The Digital Atelier**—a space that feels curated, bespoke, and intellectually rigorous. We reject the "flatness" of standard web design in favor of a layered, editorial experience that mimics the tactile quality of a high-end broadsheet or a prestige fashion journal.

By utilizing intentional asymmetry, expansive negative space, and a high-contrast typographic hierarchy, we create an environment that commands attention through quiet authority rather than loud visual noise.

---

## 2. Color Architecture
The palette is anchored by a deep, authoritative Blue (inspired by Pantone 287/288) and balanced by a warm, ivory-tinged off-white. This creates a "Parchment and Ink" aesthetic that feels timeless yet technologically sharp.

### Primary Palette (Editorial Blue)
- **Primary (`#00336c`):** Our signature ink. Used for high-level actions and brand markers.
- **Primary Container (`#1b4a8b`):** Used for emphasized content blocks that require tonal depth.
- **On-Primary (`#ffffff`):** Pure contrast for legibility.

### Surface & Neutral Tones
- **Surface/Background (`#fcf9f6`):** Our "Paper." A warm, off-white that reduces eye strain and feels more premium than pure white.
- **On-Surface (`#1c1c1a`):** Deep charcoal, never pure black, to maintain a sophisticated softness.
- **Surface-Container Tiers:** Used to create depth.
    - `Surface-Container-Low`: `#f6f3f0`
    - `Surface-Container`: `#f0edea`
    - `Surface-Container-Highest`: `#e5e2df`

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be achieved through **Tonal Shifts**. To separate content, place a `Surface-Container-Low` element against a `Surface` background. Physicality is defined by the weight of color, not the stroke of a pen.

### Glass & Gradient Rule
To prevent a static feel, use subtle gradients transitioning from `Primary` to `Primary-Container` (Linear, 135°) for hero CTA buttons. For floating navigation or overlays, apply **Glassmorphism**: use `Surface` at 80% opacity with a `20px` backdrop blur to allow the editorial content to bleed through softly.

---

## 3. Typography: The Newsreader Scale
The typography is the backbone of this system. We use **Newsreader**, a sophisticated serif, to convey an editorial voice that is both academic and avant-garde.

- **Display (L/M/S):** Set with tight letter-spacing (-0.02em). Use for high-impact editorial statements.
- **Headlines:** Use for section starts. Bold, authoritative, and always set in `On-Surface`.
- **Body (L/M/S):** Newsreader provides a rhythmic reading experience. Ensure line heights are generous (1.6x) to allow the "page" to breathe.
- **Labels (Inter):** We introduce a clean Sans-Serif (Inter) for functional micro-copy (Labels/Captions) to differentiate "Utility" from "Content."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-like" for an editorial experience. Instead, we use **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by stacking. A `Surface-Container-Lowest` card placed on a `Surface-Container` background creates a natural lift.
- **Ambient Shadows:** If a floating element (like a modal) requires a shadow, it must be an "Ambient Shadow": 
    - `Blur: 40px`, `Spread: 0`, `Opacity: 6%`, `Color: #1c1c1a`. 
    - This mimics natural light diffracted through heavy paper.
- **The "Ghost Border":** For essential accessibility in inputs, use the `Outline-Variant` (`#c3c6d2`) at **15% opacity**. High-contrast outlines are strictly forbidden.

---

## 5. Component Guidelines

### Buttons: The Signature Action
- **Primary:** Background `Primary`, Rounded `1rem` (Round Four). No border. Use a subtle inner-glow (top-down white gradient at 5% opacity) to provide a "pressed" feel.
- **Secondary:** Transparent background with a `Ghost Border`. Text in `Primary`.
- **States:** On hover, the primary button should shift to `Primary-Container`, increasing the "ink density" feel.

### Cards & Content Blocks
- **The Rule of Whitespace:** Forbid divider lines. Use `Spacing-XL` (3rem) to separate card content. 
- **Nesting:** Place content inside a `Surface-Container-Low` box with a `Round Four` corner radius to create a soft container without structural rigidity.

### Input Fields
- **Styling:** Minimalist. No bottom line or full box. Use a `Surface-Container` fill with a `Ghost Border`. 
- **Typography:** Labels must use `Label-MD` (Inter) for a functional, utilitarian contrast against serif body text.

### Selection Controls (Chips & Radios)
- **Chips:** Use `Surface-Container-Highest` for unselected and `Primary` for selected. This creates a "stamped" look.

---

## 6. Do’s and Don’ts

### Do:
- **Use Intentional Asymmetry:** Align text to a grid, but allow images to "break" the container or overlap slightly into the margins.
- **Embrace the "Paper":** Let the warm off-white (`#fcf9f6`) dominate the layout. 60% of the screen should be this color.
- **Tonal Transitions:** Use background color shifts to guide the user’s eye from one section to the next.

### Don’t:
- **No Heavy Shadows:** Avoid Material Design "Z-index" shadows. They feel like plastic; we want paper.
- **No Grid-Stiffness:** Avoid perfectly symmetrical 4-column grids for content. Try a 2/3 vs 1/3 split to maintain an editorial rhythm.
- **No 100% Opaque Borders:** Never use a solid dark line to box in content. It "suffocates" the typography.

---

## 7. Roundedness Scale (ROUND_FOUR)
This system utilizes a soft, approachable radius to contrast the sharp serif typography.
- **Default:** `1rem` (Used for buttons and standard cards)
- **Large:** `2rem` (Used for hero containers)
- **Full:** `9999px` (Used for chips and tags)
- **Small:** `0.5rem` (Used for tooltips and nested inputs)