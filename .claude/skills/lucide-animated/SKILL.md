# Lucide-Animated

Free, open-source collection of 350+ animated React icons with smooth Motion-powered animations.

You are an expert in lucide-animated, a React icon library built with Motion (Framer Motion) and Lucide icons. You help developers integrate and customize these animated icons in their React/Next.js projects.

## Overview

- **350+ animated icons** - smooth Motion-powered animations
- **MIT licensed** - free for personal and commercial use
- **TypeScript support** - fully typed React components
- **Copy-paste ready** - components install directly into your project
- **Customizable** - full control over SVG properties and animations
- **Dark/light theme** - built-in theme support

## Installation

The recommended installation uses shadcn CLI to add icons individually:

```bash
# Using pnpm (recommended)
pnpm dlx shadcn add @lucide-animated/{icon-name}

# Using npm
npx shadcn add @lucide-animated/{icon-name}

# Using yarn
yarn dlx shadcn add @lucide-animated/{icon-name}

# Using bun
bunx shadcn add @lucide-animated/{icon-name}
```

**Important**: Use kebab-case for icon names (e.g., `arrow-right`, `check-circle`).

## Basic Usage

After installation, icons are added to your project as React components:

```tsx
import { ArrowRight } from "@/components/ui/arrow-right";

export default function Example() {
  return (
    <div>
      <ArrowRight />
    </div>
  );
}
```

## Customization

Icons are SVG-based and fully customizable:

### Size and Color

```tsx
<ArrowRight className="w-8 h-8 text-blue-500" />
```

### Custom Styling

```tsx
<ArrowRight
  style={{
    width: "2rem",
    height: "2rem",
    color: "#3b82f6",
  }}
/>
```

### Animation Control

Since icons use Motion, you can pass Motion props:

```tsx
<ArrowRight
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
/>
```

## Icon Categories

The library includes icons for:

- **Arrows** - directional indicators and navigation
- **Charts** - data visualization elements
- **Folders** - file system and organization
- **UI Controls** - buttons, toggles, menus
- **Social Media** - platform icons
- **Communication** - messaging and alerts
- **And more** - extensive collection across categories

## Framework Alternatives

While the main library is for React, community ports exist:

- **Svelte**: movingicons.dev (by @jis3r)
- **Vue**: imfenghuang.github.io/icons (by @imfenghuang)
- **Angular**: ajitzero/animated-icons (by @ajitzero)
- **Flutter**: flutter_lucide_animated package (by @ravikovind)

## Technical Stack

- **Language**: TypeScript
- **Animation**: Motion (formerly Framer Motion)
- **Base Icons**: Lucide
- **License**: MIT

## Best Practices

1. **Performance**: Icons are lightweight, but use code splitting for large applications
2. **Accessibility**: Add appropriate ARIA labels for screen readers
3. **Theming**: Leverage className prop for theme integration
4. **Animation**: Respect user's motion preferences with `prefers-reduced-motion`

## Example: Accessible Icon Button

```tsx
import { Heart } from "@/components/ui/heart";

export function LikeButton() {
  return (
    <button
      aria-label="Like this post"
      className="p-2 rounded-full hover:bg-gray-100"
    >
      <Heart className="w-6 h-6 text-red-500" />
    </button>
  );
}
```

## Example: Conditional Animation

```tsx
import { CheckCircle } from "@/components/ui/check-circle";

export function SuccessMessage({ show }: { show: boolean }) {
  return (
    <div>
      {show && (
        <CheckCircle
          className="w-8 h-8 text-green-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      )}
    </div>
  );
}
```

## Resources

- **Website**: https://lucide-animated.com
- **GitHub**: https://github.com/pqoqubbw/icons
- **Creator**: @pqoqubbw (Dmytro)
- **License**: MIT

## Contributing

The project welcomes contributions. See CONTRIBUTING.md in the GitHub repository for guidelines on adding new icons.

## Common Issues

### Icons not animating

- Ensure Motion is installed: `npm install motion`
- Check for CSS conflicts overriding animations
- Verify Motion props are correctly applied

### TypeScript errors

- Icons are fully typed - ensure @types/react is installed
- Check import paths match your project structure

### Styling not applying

- Icons respect both className and style props
- Use Tailwind classes or inline styles as needed
- Parent container styling may affect icon display

## When to Use This Skill

Use this skill when:

- Installing lucide-animated icons in React/Next.js projects
- Customizing icon animations or styling
- Troubleshooting icon display or animation issues
- Implementing accessible icon components
- Choosing between lucide-animated and other icon libraries
- Optimizing icon performance in production
