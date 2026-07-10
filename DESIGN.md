---
name: Lumina Grid
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393841'
  surface-container-lowest: '#0d0d15'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#303038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered for high-performance educational collaboration. It targets enterprise administrators, educators, and students who require a focused, low-strain environment for long-form content consumption and data management. 

The aesthetic is **Enterprise Minimalist** with a **Technical Edge**. It leverages a deep, monochromatic foundation to reduce visual noise, punctuated by high-vibrancy accents to guide user intent. The emotional response is one of precision, stability, and "flow-state" productivity. Visual interest is generated through subtle depth—using glassmorphism and soft glows—rather than decorative elements, ensuring the interface remains a tool, never a distraction.

## Colors
This design system utilizes a "Deep Slate" palette to establish a sophisticated dark mode environment. 

- **Primary (Indigo-500):** Reserved for primary calls to action, progress indicators, and active states. It should feel "electric" against the dark backdrop.
- **Secondary (Violet-500):** Used for supplementary highlights, data visualization categories, and secondary interactive elements.
- **Surface Tiers:** 
  - **Level 0 (Background):** Slate-950 (#020617) for the main application canvas.
  - **Level 1 (Card/Surface):** Slate-900 (#0f172a) for content containers.
  - **Level 2 (Active/Hover):** Slate-800 (#1e293b) for interactive surfaces.
- **Accents:** Active elements should occasionally feature a soft `0 0 15px -3px rgba(99, 102, 241, 0.3)` glow to signify focus.

## Typography
The system uses **Geist** exclusively to leverage its technical, monolinear construction and exceptional legibility in dark environments. 

- **Headlines:** Use SemiBold (600) or Bold (700) weights with slightly tightened letter spacing for a compact, professional look.
- **Body:** Use Regular (400) weight for maximum readability. In high-density data tables, use `body-sm`.
- **Labels:** Use Medium (500) weight and Uppercase for small metadata labels to ensure they remain distinct from body text.
- **Line Height:** Generous line heights are maintained for body text to prevent "text-clumping" on dark backgrounds.

## Layout & Spacing
The design system follows a strict **8px linear scale**. All spacing between elements, padding within containers, and margin increments must be multiples of 8.

- **Grid:** A 12-column fluid grid for desktop with 24px gutters.
- **Adaptive Strategy:** 
  - **Desktop:** Wide margins (32px) and centered containers for long-form reading.
  - **Tablet:** 8-column grid with 24px gutters.
  - **Mobile:** 4-column grid with 16px gutters; side-by-side elements should reflow into vertical stacks.
- **Density:** Educational dashboards should favor `stack-md` (16px) to maintain a sense of organized "breathing room" between complex modules.

## Elevation & Depth
Depth is created through luminosity and blur rather than heavy shadows.

- **Base Layer:** The canvas is Slate-950.
- **Tonal Elevation:** Instead of shadows, use subtle border-top highlights (1px, Slate-800) to separate stacked containers.
- **Glassmorphism:** Overlays, modals, and dropdown menus must use a backdrop blur (`blur-xl`) with a semi-transparent Slate-900 fill (opacity 80%). Add a 1px border with 10% white opacity to define the edges.
- **Glows:** Active cards or primary buttons in a "focused" state should feature a soft Indigo-500 outer glow with a 15% opacity to simulate light emission.

## Shapes
The shape language is modern and approachable while maintaining professional rigor. 

- **Containers:** Main cards and content areas use `rounded-2xl` (1rem / 16px) to soften the "enterprise" feel.
- **Interactive Elements:** Buttons and input fields follow the `rounded-lg` (0.5rem / 8px) standard for a crisper, more actionable appearance.
- **Status Indicators:** Chips and badges use full "pill" rounding to distinguish them from structural elements.

## Components
- **Buttons:**
  - *Primary:* Solid Indigo-500 with white text. On hover, apply a subtle Indigo glow.
  - *Secondary:* Ghost style with a Slate-800 border and Indigo-400 text.
- **Cards:** Use Slate-900 background with a 1px border in Slate-800. Padding should be a consistent 24px (`stack-lg`).
- **Input Fields:** Slate-950 background with a Slate-800 border. On focus, the border transitions to Indigo-500 with a 2px outer glow.
- **Glass Overlays:** For tooltips and modals, use `backdrop-blur-md` with a Slate-900/80 background.
- **Data Tables:** Stripeless design. Use 1px Slate-800 bottom borders for rows. The header row should be Slate-950 with Medium weight labels.
- **Chips:** Small, pill-shaped indicators with a subtle Indigo-500/10 background and Indigo-400 text.
