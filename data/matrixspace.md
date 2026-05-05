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
