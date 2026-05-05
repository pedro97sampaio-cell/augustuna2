# Augustuna Web Platform — System Rules for AI

This `rules.md` acts as the primary source of truth for any AI Assistant (like Cursor, Windsurf, or GitHub Copilot) actively working in this repository. **Read these constraints completely before making any changes to the project.**

## 1. Core Stack & Architecture Restrictions
* **No Frameworks:** Do NOT introduce React, Vue, Next.js, Node.js or bundlers like Webpack/Vite. The current execution model is a pure Vanity HTML/CSS/JS Single Page Application (SPA). Keep it that way.
* **Architecture Style:** Dynamic tabs/routing via vanilla CSS (`.active` class overriding `display: none`). 
* **Backend Approach:** The backend is static. We read data asynchronously at client runtime via `fetch()` mapping local JSON arrays inside the `/data` folder. There's no server-side SQL/NoSQL.

## 2. Style & Design System (Digital Atelier)
When writing CSS, respect these tokens blindly:
* **Typography:** `Newsreader` (Headings and main body elements) and `Inter` (micro-copy, functional labels, buttons). 
* **Primary Color:** Use `--primary` (`#00336c`). *Never hardcode random blue hex codes. Follow the `:root` variables on `styles.css`.*
* **Surfaces:** Keep backgrounds to `--surface` (`#fcf9f6`), keeping contrast high with `--on-surface` (`#1c1c1a`).
* **Components:** Ensure all `.btn` follow the **Round Four** specification (`border-radius: 1rem`) and feature "Ambient Shadows" (`0 40px 40px -20px ...`) instead of aggressive drop-shadows.

## 3. Data Integrity & Content Manipulation
Before making changes to how HTML sections render (e.g. `renderMembros()`, `renderAtuacoes()`), you must inspect `/data`.
1. Make sure to map keys EXACTLY as they appear in the JSON (e.g. `data_passagem` instead of `year`).
2. **Never** format JS objects directly. Always rely on `script.js` looping through global data arrays populated from local JSON blobs.

## 4. Feature Warning — Third-Party Integration
Modifications to `#loja` (Store Cart) or `#contactos` (Forms) must pass EmailJS integration checks:
1. ID assignments in HTML form fields (like `#checkoutEmail`, `#checkoutTotal`) are absolutely CRITICAL and mapped to variables used by `emailjs.send()`.
2. Do NOT change ID names for inputs inside the forms; otherwise, the mail webhook structure will fail on the frontend logic.

## 5. Python CMS Local Integration
A parallel system inside `/admin_hub` exists (compiled locally into an `.exe`). 
* **Rule:** If you restructure keys in a `.json` file inside the `data/` folder, you MUST cross-reference `admin_hub.py` and rewrite the Tkinter/UI data saving parameters so they align with the latest JSON schema. (If one changes, the other breaks).

## 6. HTML DOM Injection Protocol
Avoid destroying wrapper divs. 
* Many section divs like `<div id="newsContent"></div>` are meant to act exclusively as root containers for Javascript's `innerHTML` template literals.
* *Do not write static articles inside these target divs unless explicitly requested as a hardcoded bypass.*
