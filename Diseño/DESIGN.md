# Design System: Architectural Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Urban Monolith**

This design system is not a template; it is a digital translation of high-end Peruvian architectural prowess. Inspired by the textured bronze and sweeping limestone-beige facades of contemporary Lima developments, the "Urban Monolith" aesthetic focuses on structural permanence and breathable luxury. 

We break the "standard grid" through **Intentional Asymmetry**. Just as a building features cantilevered balconies and recessed glass, our UI uses overlapping elements and generous negative space to create a sense of three-dimensional depth. This system prioritizes the "Editorial Lens"—treating every property listing like a feature in a high-fashion architecture magazine rather than a generic database entry.

---

## 2. Colors & Surface Philosophy
The palette is derived directly from the earth and structure of premium construction: warm beige, textured bronze, and deep charcoal.

### The Color Logic
*   **Primary (`#704627`):** The "Textured Bronze." Use this for high-impact CTAs and signature accents. It represents the structural framework of the brand.
*   **Surface Hierarchy:** We move away from flat white backgrounds.
    *   **Surface (`#f9f9f9`):** The primary canvas (Limestone).
    *   **Surface-Container-Low (`#f3f3f3`):** Sub-sections and architectural recesses.
    *   **Surface-Container-Highest (`#e2e2e2`):** Interactive card backgrounds or high-contrast utility zones.

### Core Visual Rules
*   **The "No-Line" Rule:** Explicitly prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background creates a cleaner, more premium architectural "shadow" than a line ever could.
*   **The Glass & Gradient Rule:** For floating navigation or "Sticky" CTAs, use Glassmorphism. Apply `surface` at 80% opacity with a `backdrop-filter: blur(20px)`.
*   **Signature Textures:** For primary buttons, use a subtle linear gradient from `primary` (`#704627`) to `primary_container` (`#8c5e3c`) at a 135-degree angle to mimic the way light hits a metallic bronze facade.

---

## 3. Typography
The typography is the voice of the brand: authoritative, clean, and meticulously spaced.

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its modern, geometric clarity. 
    *   *Usage:* `display-lg` (3.5rem) should be used for hero property titles with tight letter-spacing (-0.02em) to create a "monumental" feel.
*   **Body & Labels (Inter):** A functional, high-legibility sans-serif that balances the expressive headers.
    *   *Usage:* Use `body-lg` (1rem) for descriptions, ensuring a line-height of at least 1.6 to maintain the "Editorial" feel.
*   **Hierarchy:** Always use a high-contrast ratio between headlines and body text. If a headline is `headline-lg`, the sub-text should jump down to `body-md` to create visual breathing room and emphasize the headline's scale.

---

## 4. Elevation & Depth
In this system, depth is "baked" into the layers rather than applied as an afterthought.

*   **The Layering Principle:** Stacking is our primary tool. Place a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a soft, natural lift that mimics architectural layering.
*   **Ambient Shadows:** Shadows must be felt, not seen. 
    *   *Specs:* Blur: 40px, Spread: -10px, Opacity: 6% of `on_surface` (`#1a1c1c`).
    *   *Color:* Tint the shadow with a hint of the `primary` color to keep the warmth of the natural light.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` at 15% opacity. Never use 100% opaque borders.
*   **Asymmetric Overlaps:** Images should frequently "break" their containers, overlapping into the next background section by `spacing-8` (2.75rem) to create a sense of movement.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. Roundedness: `md` (0.375rem). Text: `label-md` in uppercase with 0.05em tracking.
*   **Sticky CTA:** Use a floating "Glass" bar at the bottom of mobile viewports using the Glassmorphism rule.

### Cards & Property Previews
*   **Forbid Dividers:** Do not use lines to separate price, location, and bed/bath info. Use `spacing-3` (1rem) and typographic weight shifts (e.g., price in `title-lg`, location in `label-md` muted).
*   **Image Containers:** High-quality imagery must use `rounded-lg` (0.5rem). The image should occupy 60% of the card's vertical real estate.

### Input Fields
*   **Style:** Minimalist. No border-bottom or full box. Use a `surface-container-highest` background with a `sm` (0.125rem) bottom-radius highlight in `primary` when focused.
*   **Floating Labels:** Labels should sit in `label-sm` above the field, never inside as placeholder text.

### Gallery Viewports
*   **Asymmetric Grid:** Instead of a 3x3 grid, use a 70/30 split. One large "Hero" image on the left, two smaller "Detail" images stacked on the right.

---

## 6. Do's and Don'ts

### Do
*   **Do** use the `spacing-20` (7rem) and `spacing-24` (8.5rem) values for top/bottom section padding to ensure the "Premium" feel.
*   **Do** use "Plus Jakarta Sans" for numbers and prices to emphasize their modern geometric profile.
*   **Do** allow images of the building facade to bleed to the edge of the screen in Hero sections.

### Don't
*   **Don't** use standard "Drop Shadows" (e.g., 0px 4px 4px). They feel cheap and "out-of-the-box."
*   **Don't** use pure black (`#000000`) for body text; use `on_surface` (`#1a1c1c`) to maintain a softer, more expensive tonal range.
*   **Don't** crowd the interface. If you feel like you need a divider line, you actually need more whitespace (`spacing-6` or higher).
*   **Don't** use sharp 90-degree corners for interactive elements; stick to the `md` (0.375rem) roundedness scale to keep the tech-modern balance.