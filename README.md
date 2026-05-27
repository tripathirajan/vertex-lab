# Vertex-Lab

A composable React UI platform with design tokens, headless components, hooks, and a Tailwind-powered design system.

## Architecture

```
packages/
├── utilities/       # Framework-agnostic helpers (mergeRefs, createContext, etc.)
├── hooks/           # React hooks (useControllableState, useMediaQuery, etc.)
├── primitives/      # Low-level DOM abstractions (Box, Flex, Stack, Text, Primitive, Slot)
├── headless/        # Behavior-only accessible components (Dialog, Accordion, Tabs, etc.)
├── theme/           # Design tokens (primitive → semantic → component) + ThemeProvider
└── ui/              # Tailwind-powered styled components (Button, Card, Input, etc.)

apps/
└── playground/      # Demo app showcasing all components
```

## Token System (3-layer)

1. **Primitive** — raw numeric scales (`blue.500`, `gray.200`, `spacing.4`, `radius.md`)
2. **Semantic** — intent-based aliases (`color.bg.subtle`, `color.text.muted`, `color.border.interactive`)
3. **Component** — per-component overrides (`buttonTokens.primary.bg`, `inputTokens.border`)

Tokens are delivered as CSS custom properties. A single `data-theme` attribute on `<html>` switches every token at once — no hydration flicker, no class explosion.

```css
:root {
  --color-bg-default: #ffffff;
  --color-text-default: #111827;
  --color-border-default: #e5e7eb;
}
[data-theme="dark"] {
  --color-bg-default: #030712;
  --color-text-default: #f9fafb;
  --color-border-default: #1f2937;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* auto dark */ }
}
```

## Packages

### `@vertex-lab/utilities`
Framework-agnostic helpers: `composeEventHandlers`, `mergeRefs`, `clamp`, `debounce`, `throttle`, `deepMerge`, `createContext`, `isHTMLElement`, `isFocusable`.

### `@vertex-lab/hooks`
React hooks: `useControllableState`, `useClickOutside`, `useMediaQuery`, `useScrollLock`, `useFocusTrap`, `useResizeObserver`, `useIntersectionObserver`, `useLocalStorage`, `useDebounce`, `useId`, `useBoolean`, `useToggle`, `useStableCallback`, `useEventListener`, `usePrevious`, `useMounted`.

### `@vertex-lab/primitives`
Low-level DOM abstractions: `Box`, `Container`, `Flex`, `Grid`, `Stack`, `Inline`, `Center`, `AspectRatio`, `Text`, `Heading`, `Paragraph`, `Code`, `Pre`, `Link`, `Primitive`, `Slot`, `Portal`, `Presence`, `Boundary`, `Button`, `Input`, `Textarea`, `Label`, `Form`, `VisuallyHidden`, `FocusScope`, `DismissableLayer`, `Overlay`.

### `@vertex-lab/headless`
Behavior-only components with ARIA support:
- `Tabs`, `TabList`, `Tab`, `TabPanel`
- `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionPanel`
- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogOverlay`, `DialogTitle`, `DialogDescription`
- `Switch`, `Checkbox`
- `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`
- `Toggle`, `ToggleGroup`, `ToggleGroupItem`
- `Tooltip`, `TooltipTrigger`, `TooltipContent`
- `Popover`, `PopoverTrigger`, `PopoverContent`
- `RadioGroup`, `RadioGroupItem`

### `@vertex-lab/theme`
Design token definitions and ThemeProvider.
- 3-layer token system (primitive → semantic → component)
- `ThemeProvider` / `useTheme` — light/dark/system theme management via `data-theme` attribute
- Token generation script: `npx tsx packages/theme/src/tokens/generate.ts`

### `@vertex-lab/ui`
Tailwind-powered styled components using design tokens:
- `Button` — 6 variants (primary, secondary, outline, ghost, danger, link) × 4 sizes
- `Input` / `Textarea` — with error state
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Badge` — 6 variants (default, secondary, success, warning, danger, outline)
- `Separator` — horizontal/vertical
- `Avatar`, `AvatarImage`, `AvatarFallback`
- `Switch`, `Checkbox`
- `Tabs`, `TabList`, `Tab`, `TabPanel`
- `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionPanel`
- `Dialog` with full overlay system
- `cn()` — utility combining `clsx` + `tailwind-merge`

## Quick Start

```bash
pnpm install
pnpm playground
```

The playground runs on `http://localhost:5173` and showcases all components with light/dark/system theme toggle.

## Token Customization

1. Edit `packages/theme/src/tokens/primitive.ts` (color scales, spacing, etc.)
2. Edit `packages/theme/src/tokens/semantic.ts` (light/dark mappings)
3. Run `npx tsx packages/theme/src/tokens/generate.ts` to regenerate `theme.css`

## Design Decisions

- **Numeric scales, not t-shirt sizes** — `blue.500` not `blue.medium`. Easier to insert values later.
- **Semantic naming: `category.role.variant`** — e.g. `color.bg.subtle`, `color.text.muted`. Intent is readable without knowing the primitive.
- **Theming via CSS custom properties** — `:root` + `[data-theme="dark"]`. Single attribute switch, no hydration flicker.
- **Component tokens are opt-in** — for complex multi-variant components.
- **Headless + styled separation** — headless components carry behavior and ARIA; styled components add Tailwind classes on top.
