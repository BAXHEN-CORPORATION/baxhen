---
name: Void Conversationalist
colors:
  surface: '#10141a'
  surface-dim: '#10141a'
  surface-bright: '#353940'
  surface-container-lowest: '#0a0e14'
  surface-container-low: '#181c22'
  surface-container: '#1c2026'
  surface-container-high: '#262a31'
  surface-container-highest: '#31353c'
  on-surface: '#dfe2eb'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dfe2eb'
  inverse-on-surface: '#2d3137'
  outline: '#859398'
  outline-variant: '#3c494e'
  surface-tint: '#3cd7ff'
  primary: '#a8e8ff'
  on-primary: '#003642'
  primary-container: '#00d4ff'
  on-primary-container: '#00586b'
  inverse-primary: '#00677e'
  secondary: '#75d4e9'
  on-secondary: '#00363f'
  secondary-container: '#369db1'
  on-secondary-container: '#002f37'
  tertiary: '#ecddbc'
  on-tertiary: '#383019'
  tertiary-container: '#d0c1a1'
  on-tertiary-container: '#594f35'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b4ebff'
  primary-fixed-dim: '#3cd7ff'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#a6eeff'
  secondary-fixed-dim: '#75d4e9'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5b'
  tertiary-fixed: '#f1e1c0'
  tertiary-fixed-dim: '#d4c5a5'
  on-tertiary-fixed: '#221b06'
  on-tertiary-fixed-variant: '#50462d'
  background: '#10141a'
  on-background: '#dfe2eb'
  surface-variant: '#31353c'
typography:
  display-xl:
    fontFamily: Literata
    fontSize: 64px
    fontWeight: '300'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Literata
    fontSize: 48px
    fontWeight: '300'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '300'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system embodies a sophisticated, tech-forward identity built for high-performance sales automation. It targets an audience that values innovation, precision, and the power of human-centric communication. The emotional response is one of calm confidence—moving away from the "loud" marketing of the past toward a focused, editorial experience.

The visual style is a hybrid of **Modern Minimalism** and **Tech-Centric Precision**. It utilizes a deep, immersive background to allow "Electric" accents to provide a sense of energy and interactivity. The aesthetic avoids unnecessary decoration, focusing instead on sharp typography, clear hierarchy, and conversational metaphors that make complex SaaS products feel as intuitive as a chat thread.

## Colors

The palette is anchored by "Void" and "Deep Navy," creating a high-contrast environment where information is prioritized through luminescence. 

- **Primary (Electric):** Reserved for critical actions, key conversational highlights, and interactive triggers.
- **Secondary (Teal Mid):** Used for supporting UI elements, secondary buttons, and decorative accents like icons.
- **Tertiary (Warm Cream):** Applied sparingly to humanize the interface, often found in subtle background highlights or specific text emphases.
- **Neutrals:** "Void" serves as the primary canvas, while "Deep Navy" provides subtle depth for containers and input fields. "Frost" is the standard for high-legibility body text.

## Typography

The typography strategy relies on a deliberate contrast between editorial elegance and technical precision. 

- **Headlines:** Use a refined serif (Literata as a proxy for Eastman Alt Light) to evoke a sense of storytelling and authority. Large display sizes should use light weights to maintain sophistication.
- **Body:** A clean, contemporary sans-serif (Hanken Grotesk) ensures legibility across dense product descriptions and interactive threads.
- **Data & Labels:** A monospaced font (JetBrains Mono) is utilized for small badges, technical labels, and system status indicators to reinforce the "tech-forward" aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for marketing and high-level dashboard views, transitioning to a flexible container model for the conversational interface. 

- **Grid:** A 12-column system is used for desktop, with a focus on wide gutters to maintain "breathing room."
- **Rhythm:** An 8px base unit governs all padding and margins. 
- **Conversational Reflow:** Chat-based elements are centered or right-aligned to simulate mobile messaging patterns even on larger screens. On mobile devices, margins shrink to 16px to maximize the "thread" width.
- **Hierarchy:** Use generous vertical spacing (80px+) between major sections to emphasize the "Void" aesthetic and prevent visual clutter.

## Elevation & Depth

Depth is achieved through **Tonal Layers** rather than traditional shadows. Because the background is "Void," elevation is communicated by shifting colors from the deep background to lighter "Deep Navy" surfaces.

- **Level 0 (Background):** The "Void" base.
- **Level 1 (Containers/Cards):** "Deep Navy" surfaces with 1px semi-transparent borders in "Teal Mid" (10% opacity).
- **Interactive Depth:** Conversational bubbles use subtle gradients to suggest volume. 
- **Glassmorphism:** Navigation bars and modal overlays utilize a backdrop blur (20px) with a 5% "Frost" tint to maintain context of the underlying content.

## Shapes

The shape language is primarily **Rounded**, balanced between organic conversation and structured technology. 

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Conversational Bubbles:** Use a larger `rounded-xl` (1.5rem) to mimic the friendly nature of chat apps.
- **Badges:** Use a full pill shape to distinguish them from interactive buttons.
- **Borders:** When used, borders should be hairline (1px) to maintain a sharp, technical feel.

## Components

- **Buttons:** Primary buttons are solid "Electric" with dark text. Secondary buttons are ghost-style with "Frost" outlines.
- **Conversational Bubbles:** User messages should be "Deep Navy" or "Teal Mid" (darkened), while system/AI messages use "Void" with a thin border.
- **Chips/Badges:** Small, pill-shaped containers using "Deep Navy" background and "Electric" text for status or category indicators.
- **Input Fields:** Minimalist design with only a bottom border or a very subtle "Deep Navy" fill. Focus states are indicated by an "Electric" glow.
- **Lists:** Horizontal separators should use a 5% "Frost" opacity to remain nearly invisible, creating a "floating" content effect.
- **Cards:** Use "Deep Navy" with no shadow; rely on the color contrast against the "Void" background to define the container.