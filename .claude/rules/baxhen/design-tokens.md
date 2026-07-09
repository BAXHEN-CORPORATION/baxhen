# Baxhen Design Token Standards

These standards codify the DESIGN.md "Void Conversationalist" design system.

## Color Usage

| Role          | Hex       | Tailwind Class       | Usage                                        |
|---------------|-----------|----------------------|----------------------------------------------|
| Background    | #10141a   | `bg-[#10141a]`       | Primary page background                      |
| Surface       | #10141a   | `bg-[#10141a]`       | Container backgrounds, cards                 |
| Text          | #dfe2eb   | `text-[#dfe2eb]`     | Body text, headings                          |
| Primary       | #3cd7ff   | `text-[#3cd7ff]`     | CTA text, highlights, focus rings           |
| Primary BG    | #3cd7ff   | `bg-[#3cd7ff]`       | Primary buttons, accent backgrounds          |
| On Primary    | #001f27   | `text-[#001f27]`     | Text on primary backgrounds                  |
| Outline       | #859398   | `border-[#859398]`   | Borders, dividers                            |
| Error         | #ffb4ab   | `text-[#ffb4ab]`     | Error states                                  |

## Rules

1. No hardcoded hex colors in component files — reference DESIGN.md values using Tailwind arbitrary values: `bg-[#10141a]`, `text-[#3cd7ff]`
2. Use the values listed above — do not introduce new hex colors without updating DESIGN.md
3. Background always `#10141a` (Void) for funnel pages
4. Primary accent `#3cd7ff` reserved for critical actions, CTA buttons, and highlights
5. Text `#dfe2eb` for body copy
6. WhatsApp-style screens may use light backgrounds (`bg-[#E8E2D9]`) — this is the one exception
7. Call screens may use `bg-black` for the call background

## Typography

| Token             | Font             | Size    | Weight | Usage                  |
|-------------------|------------------|---------|--------|------------------------|
| Display XL        | Literata         | 64px    | 300    | Hero headlines         |
| Headline LG       | Literata         | 48px    | 300    | Section headlines      |
| Headline MD       | Literata         | 24px    | 400    | Card headlines         |
| Body LG           | Hanken Grotesk   | 18px    | 400    | Lead paragraphs        |
| Body MD           | Hanken Grotesk   | 16px    | 400    | Chat messages, body    |
| Label SM          | JetBrains Mono   | 12px    | 500    | Timestamps, badges     |

## Spacing

- Base unit: 8px
- Container max-width: 1200px
- Gutter: 24px
- Mobile margin: 16px
- Desktop margin: 48px

## Border Radius

- Standard: 0.5rem (buttons, inputs)
- Conversational: 1.5rem (chat bubbles)
- Full pill: 9999px (badges)

## Elevation

No box-shadows. Depth via color contrast:
- Level 0: Void `#10141a` (background)
- Level 1: Deep Navy `#181c22` (containers)
- Glass: `backdrop-blur-[20px]` with 5% Frost tint

## Icons

Use `lucide-react` for all icons. No custom icon SVGs unless no lucide equivalent exists.
