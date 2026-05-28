# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Huerray** is a Next.js 16 marketing website for connecting brands with authentic creators for user-generated content (UGC). The application is built with React 19, uses the App Router architecture, and features internationalization support for multiple languages (English, German, French, Spanish).

## Development Commands

### Running the Development Server

```bash
npm run dev
# Runs Next.js with Turbopack enabled on http://localhost:3000
```

### Building for Production

```bash
npm run build
# Creates an optimized production build
```

### Linting

```bash
npm run lint
# Runs ESLint with Next.js TypeScript configuration
```

### Testing

```bash
npm test                    # Run all Playwright tests
npm run test:ui             # Open Playwright UI for interactive testing
npm run test:headed         # Run tests in headed mode (visible browser)
npm run test:report         # View the HTML test report
```

Tests are located in the `tests/` directory and include:

- `home.spec.ts` - Home page functionality
- `navigation.spec.ts` - Navigation behavior
- `language-selector.spec.ts` - Language switching
- `components.spec.ts` - Component-level tests

## Architecture

### Internationalization (i18n)

The app uses `next-intl` for internationalization with a custom configuration in `i18n.ts`:

- **Supported locales**: `en`, `de`, `fr`, `es`
- **Default locale**: `en`
- **Translation files**: Organized in `locales/{locale}/...` as JSON namespaces, including feature folders such as `locales/{locale}/dashboard/admin/{feature}.json`
- **Namespaces**: `common`, `header`, `footer`, `home`
- **Route structure**: All pages are under `app/[locale]/` for locale-specific routing

To add a new locale:

1. Add the locale code to the `locales` array in `i18n.ts`
2. Create a new directory `locales/{locale}/` with all required JSON files
3. The locale will automatically be available in the language selector

### Routing & Pages

- **App Router**: Uses Next.js 16 App Router with dynamic locale routing
- **Layout**: `app/[locale]/layout.tsx` provides the root layout with:
  - Font configuration (Geist Sans and Geist Mono)
  - Comprehensive favicon and icon setup
  - `NextIntlClientProvider` wrapper for translations
- **Home page**: `app/[locale]/page.tsx` → renders `HomeClient` component
- **Force dynamic**: All pages use `export const dynamic = 'force-dynamic'`

### Component Architecture

All major page sections are separated into dedicated components in `components/`:

- `HomeClient.tsx` - Main client-side component that orchestrates the home page
- `Header.tsx` - Navigation header with language selector and user menu
- `Hero.tsx` - Hero section with animations
- `HowItWorks.tsx` - Feature explanation section
- `ContentObjectives.tsx` - Content objectives showcase
- `Testimonial.tsx` - User testimonials
- `PlatformLogos.tsx` - Platform integrations display
- `CreatorVideos.tsx` - Video showcases
- `CreatorsSection.tsx` - Creator highlights
- `Footer.tsx` - Site footer with signup form
- `LanguageSelector.tsx` - Language switcher component
- `UserMenu.tsx` - User account menu

### UI Components

shadcn/ui components are located in `components/ui/`:

- `avatar.tsx`, `badge.tsx`, `button.tsx`, `command.tsx`, `dialog.tsx`, `input.tsx`, `popover.tsx`

Configuration is stored in `components.json`.

### Styling System

Custom CSS architecture with modular imports in `app/globals.css`:

- **Base**: Tailwind CSS with custom CSS modules
- **Modular CSS files** in `styles/`:
  - `spacing.css` - Spacing utilities
  - `colors.css` - Color variables and tokens
  - `typography.css` - Font definitions and text styles
  - `fonts.css` - Font-face declarations
  - Component-specific: `header.css`, `footer.css`, `button.css`, `hero.css`, etc.

Custom fonts:

- **Display font**: Right Grotesk Spatial Black (`.otf`, `.woff`, `.woff2`)
- **Body font**: ABC Diatype (Light, Regular, Medium)
- **Icon font**: icomoon

### Animations

Uses `motion` (formerly Framer Motion) for animations:

- Header mobile menu animations
- Custom CSS animations for hero carousel (scroll-up, scroll-down, horizontal scrolling)
- Responsive animation behavior (horizontal on mobile, vertical on desktop)

### Assets

- **Images**: `public/images/` organized by category (logo, platforms, content, creators, artifacts, icons, flags)
- **Videos**: `public/videos/` with multiple formats (`.mp4`, `.webm`) and compressed versions
- **Fonts**: `public/fonts/` with multiple formats for cross-browser support

### TypeScript Configuration

- **Target**: ES2017
- **Module resolution**: bundler
- **Path alias**: `@/*` maps to root directory
- **JSX**: react-jsx (automatic runtime)
- **Strict mode**: enabled

## Key Patterns

### Translation Usage

```tsx
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('namespace');
  return <div>{t('key')}</div>;
}
```

### Client Components

Most components use `'use client'` directive due to:

- Motion animations requiring browser APIs
- User interactions (language selector, menus)
- Translation hooks from next-intl

### Image Optimization

- Uses Next.js `Image` component with `priority` for above-the-fold images
- Logo has `priority={true}` in Header component

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Custom responsive animations via CSS media queries

## Component Patterns & Conventions

### CSS Naming Convention

The codebase uses **BEM (Block Element Modifier)** naming extensively:

- **Block**: `.hero`, `.button`, `.creator-videos`
- **Element**: `.hero__section`, `.hero__container`, `.hero__title`, `.button--hero`
- **Modifier**: `.button--size-xl`, `.hero__carousel-track--scroll-1`

Example from Hero component:

```tsx
<div className='hero'>
  <section className='hero__section'>
    <div className='hero__container'>
      <div className='hero__content'>
        <h1 className='hero__title'>Title</h1>
      </div>
    </div>
  </section>
</div>
```

### Translation Namespaces

Components can use multiple translation namespaces:

```tsx
const tCommon = useTranslations('common');
const t = useTranslations('home.hero');

// Usage:
tCommon('button.getStarted'); // From common.json
t('title'); // From home.json under 'hero' key
```

### Infinite Scroll Pattern

For seamless infinite scrolling animations, arrays are duplicated using:

```tsx
// Duplicate array n times for continuous loop
Array(4).fill(imageArray).flat();
```

This creates enough content copies to prevent visible seams during CSS animations.

### Responsive Animations

Animations change behavior at breakpoints:

- **Mobile**: Horizontal scrolling (`scroll-horizontal`, `scroll-horizontal-reverse`)
- **Desktop (768px+)**: Vertical scrolling (`scroll-up`, `scroll-down`)

CSS classes like `hero__carousel-track--scroll-1` apply different animations based on screen size.

### Performance Optimizations

#### Lazy Video Loading

Videos use IntersectionObserver for efficient loading and playback:

```tsx
// Only load video sources when section is in viewport
{
  loadedVideos.has(index) && (
    <>
      <source src={video.webm} type='video/webm' />
      <source src={video.mp4} type='video/mp4' />
    </>
  );
}
```

Video attributes for performance:

- `preload='none'` - Prevents automatic loading
- `muted` and `playsInline` - Enables autoplay
- Staggered playback with `setTimeout(play, index * 50)` to reduce CPU spikes

#### Animation Performance

- Use `requestAnimationFrame` for DOM updates and video operations
- IntersectionObserver with `threshold: 0.1` and `rootMargin: '100px'` for early detection

### React Experimental Features

Components use **`useEffectEvent`** from React (experimental hook):

```tsx
import { useEffectEvent } from 'react';

const handleImageChangeEvent = useEffectEvent(() => {
  // Stable callback that doesn't change effect dependencies
  onImageChange();
});
```

This is not yet a stable React API but is used for handling events in effects without re-triggering them.

### Button System

The Button component bridges React props with BEM CSS classes using `class-variance-authority`:

```tsx
// In component usage
<Button variant='hero' size='xl'>
  Get Started
</Button>;

// Button component uses cva to map props to BEM classes
const buttonVariants = cva('button', {
  variants: {
    variant: {
      hero: 'button--hero',
      default: 'button--default',
      // ...
    },
    size: {
      xl: 'button--size-xl',
      // ...
    },
  },
});
```

**Key features**:

- Uses `@radix-ui/react-slot` for `asChild` pattern (render as child component)
- Uses `cn()` utility from `lib/utils.ts` for class merging (combines `clsx` + `tailwind-merge`)
- Adds `data-slot='button'` attribute for component identification
- All styles defined in `styles/button.css` using BEM

Custom button variants in `styles/button.css`:

- `button--hero` - Primary CTA with gradient border effect using CSS masks
- `button--default`, `button--outline`, `button--ghost`, `button--link`
- Sizes: `button--size-sm`, `button--size-lg`, `button--size-xl`, `button--size-icon`

### Typography System

Uses Tailwind CSS `@theme` directive for custom design tokens:

- **Responsive font sizes**: Defined at mobile, tablet (768px), desktop (1024px)
- **Heading classes**: `.h1` through `.h6` available as utilities
- **Gradient text**: `.gradient-text` class applies pink-to-orange gradient
- **Font families**:
  - `--font-heading`: Right Grotesk (for h1, h3)
  - `--font-secondary`: ABC Diatype (body text, h4-h6)

Example:

```tsx
<h1 className='gradient-text hero__title'>{t('title')}</h1>
```

### Video Format Strategy

Always provide multiple formats for browser compatibility:

```tsx
const videos = [
  {
    webm: '/videos/creator-video-1.webm', // Better compression
    mp4: '/videos/creator-video-1.mp4', // Fallback
  },
];
```

### Animation Timing Patterns

- Random intervals: `Math.random() * 5000 + 5000` (5-10 seconds)
- Random directions: `Math.random() > 0.5 ? 'top' : 'bottom'`
- Smooth transitions: `duration: 2, ease: 'easeOut'`

### Component Data Patterns

Static data is defined outside components as constants for better performance and organization:

```tsx
// Images for sections
const heroColumn1Images = [
  '/images/creators/creator-1.jpg',
  '/images/creators/creator-2.jpg',
];

// Videos with multiple formats
const videos = [
  {
    webm: '/videos/creator-video-1.webm',
    mp4: '/videos/creator-video-1.mp4',
  },
];

// Link structures
const socialLinks = [{ name: 'Facebook', icon: 'facebook', href: '#' }];

export function Component() {
  // Component logic using the data
}
```

**Benefits**:

- Data isn't recreated on each render
- Easier to maintain and update
- Clear separation of data and logic
- Consistent structure across components

## Development Notes

- **Package manager**: Yarn (configured in `package.json`)
- **React Compiler**: Enabled with `babel-plugin-react-compiler`
- **Font loading**: Uses `next/font/google` for Geist fonts, custom fonts loaded via CSS
- **Turbopack**: Enabled by default in dev mode (can be disabled with `NODE_OPTIONS='--no-turbopack'`)
- **Testing**: Playwright runs on `http://localhost:3000` and automatically starts dev server
- **Experimental React APIs**: Uses `useEffectEvent` (not yet stable)
- Always use figma-desktop mcp for Figma desktop links
- Use playwright mcp to verify UI that you have implemented from Figma files

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
