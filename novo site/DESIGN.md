```markdown
# Design System Strategy: The Kinetic Void

## 1. Overview & Creative North Star
**Creative North Star: The Kinetic Void**
This design system is built upon the tension between infinite depth and high-velocity precision. It moves away from the "flat web" by treating the interface as a digital cockpit—dark, immersive, and hyper-functional. We achieve a high-end editorial feel through intentional asymmetry, massive typographic scales, and the rejection of traditional structural lines. 

The goal is to create a signature experience where elements don't just sit on a screen; they exist within a layered environment. By utilizing "The Kinetic Void," we prioritize breathing room (negative space) and tonal shifts over borders, ensuring the UI feels like a premium, bespoke piece of technology rather than a generic template.

---

## 2. Colors & Surface Architecture
The color palette is anchored in deep blacks and "Cyber Blue" accents. The logic here is atmospheric: we use light to define form.

### Tonal Hierarchy
- **Primary (`#b3c5ff` / `#1e68f5`):** Reserved for high-intent actions and critical status indicators. Use `primary_container` for large interaction zones to anchor the user's eye.
- **Surface & Background (`#131313`):** The "Void." This is the base layer.
- **Surface Containers:** Use the `surface_container` tiers (lowest to highest) to create "nested" depth.
    - *Example:* A main feed on `surface` might contain cards using `surface_container_low`, which themselves contain a nested metadata tag in `surface_container_high`.

### The "No-Line" Rule
**Borders are forbidden for sectioning.** 1px solid lines create visual "noise" that cheapens the tech-forward aesthetic. Boundaries must be defined solely through background color shifts. If two sections meet, one must transition from `surface` to `surface_container_low` to define the break.

### The "Glass & Gradient" Rule
To elevate the experience, floating elements (modals, dropdowns, navigation bars) must utilize **Glassmorphism**.
- **Execution:** Use semi-transparent `surface_variant` colors with a `backdrop-blur` (12px–20px). 
- **Signature Textures:** For Hero CTAs, apply a subtle linear gradient from `primary` to `primary_container` (top-left to bottom-right). This adds "soul" and a sense of physical luminosity that flat hex codes lack.

---

## 3. Typography
Our typography strategy relies on the interplay between the ubiquitous clarity of **Inter** and the technical precision of **Space Grotesk** (serving as our high-tech mono-equivalent).

- **Display Scale (`display-lg` to `display-sm`):** Set in Inter with tight letter spacing (-0.02em). These are editorial moments. Use them with intentional asymmetry—offsetting headings to the left while keeping body text in a narrower central column.
- **Body Scale (`body-lg` to `body-sm`):** Inter. High line-height (1.6) is required to maintain readability against the high-contrast dark background.
- **Label Scale (`label-md` to `label-sm`):** Space Grotesk. Used for technical metadata, small caps, or "all-caps" utility text. This conveys the "Matrix" tech-forward identity.

---

## 4. Elevation & Depth
In this system, depth is a product of light and layering, not drop shadows.

- **The Layering Principle:** Stacking `surface_container` tiers creates a natural lift. A `surface_container_lowest` card placed on a `surface_container_low` section creates a recessed, "etched" look. Conversely, a `surface_container_highest` card on a `surface` background creates an elevated look.
- **Ambient Shadows:** Shadows should only be used for "True Floating" elements (e.g., Modals). 
    - **Specs:** Blur: 32px–64px. Opacity: 4%–8%. 
    - **Color:** Use a tinted version of `on_surface` (a very faint blue-grey) rather than pure black to mimic real-world light refraction.
- **The "Ghost Border" Fallback:** If a layout requires a border for accessibility, use the "Ghost Border." Use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
- **Depth through Blur:** Use `backdrop-blur` on any element that sits "above" the main content plane to maintain a sense of environmental continuity.

---

## 5. Components

### Buttons
- **Primary:** Rounded (`xl`: 0.75rem). Background: `primary_container`. Text: `on_primary_container`. Use a subtle inner-glow (top border 1px, 10% white) to give it a "hardware" feel.
- **Secondary:** Rounded (`xl`). Ghost style. Background: Transparent. Border: "Ghost Border" (`outline_variant` at 20%).
- **Tertiary:** Text-only with Space Grotesk (`label-md`) and a trailing arrow icon.

### Cards & Lists
- **No Dividers:** Lists must never use horizontal lines. Separate list items using 8px–16px of vertical white space or by alternating background tints (`surface_container_low` vs `surface_container_lowest`).
- **Card Styling:** Use `md` (0.375rem) or `lg` (0.5rem) corner radius. Cards should rely on Tonal Layering for definition.

### Input Fields
- **State:** Resting state uses `surface_container_highest`. 
- **Focus State:** Transitions to a `ghost_border` with a 2px "Cyber Blue" (`primary`) glow. 
- **Typography:** Labels must use `label-sm` (Space Grotesk) in all-caps for a technical, data-entry aesthetic.

### Chips
- **Selection Chips:** Use `full` (9999px) roundness. 
- **Visuals:** High-contrast `on_surface` text on `surface_container_high`. Upon selection, flip to `primary_container` with `on_primary_container` text.

---

## 6. Do’s and Don’ts

### Do
- **Do** use intentional asymmetry. Align a heading to the far left and the body text to a 60% width column on the right.
- **Do** use "Macro-Typography." Make your `display-lg` sizes massive to create an editorial impact.
- **Do** treat "Negative Space" as a functional element. Air is luxury.

### Don’t
- **Don’t** use pure #000000 for backgrounds unless it's a deep-hero section. Use the `surface` tokens to maintain tonal range.
- **Don’t** use 1px solid borders for separation. This is the quickest way to break the "High-End" feel.
- **Don’t** use standard easing. Use "Power4.out" or custom cubic-beziers (0.16, 1, 0.3, 1) for transitions to mimic high-performance machinery.
- **Don’t** crowd the interface. If a screen feels "busy," remove a container and use white space instead. 

---
*End of Document*```