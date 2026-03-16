# CLAUDE.md

This file provides guidance for AI assistants working with this codebase.

## Project Overview

A Vietnamese-localized premium subscription payment UI built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. The app demonstrates a complete payment checkout flow including form validation, success states, and error handling.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| UI Library | React 19.2.3 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 + PostCSS |
| Linting | ESLint 9 (flat config) |
| Package Manager | npm |
| Deployment | Vercel (implied by setup) |

## Repository Structure

```
Product-builds/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata and fonts
│   ├── page.tsx             # Main payment page (/ route)
│   ├── globals.css          # Tailwind CSS + theme variables
│   └── error-state/
│       └── page.tsx         # Error state demo (/error-state route)
├── components/              # Reusable React components
│   ├── PaymentForm.tsx      # Client component — form logic + validation
│   ├── OrderSummary.tsx     # Order summary display (uses mock data)
│   └── ErrorState.tsx       # Error UI with retry/contact actions
├── lib/
│   └── mockData.ts          # Mock order, user, and error message data
├── public/                  # Static assets (SVGs, favicon)
├── next.config.ts           # Minimal Next.js config
├── tsconfig.json            # TypeScript config (strict, path alias @/*)
├── eslint.config.mjs        # ESLint 9 flat config
└── postcss.config.mjs       # PostCSS with Tailwind v4 plugin
```

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There is no test runner configured. Do not assume `npm test` will work.

## Architecture & Conventions

### Component Model

- **Server Components** (default): `app/layout.tsx`, `app/page.tsx`, `app/error-state/page.tsx` — no `"use client"` directive.
- **Client Components**: `components/PaymentForm.tsx` uses `"use client"` for state and event handlers.
- Keep state management in client components; pass data down as props from server components or use `lib/mockData.ts`.

### Path Aliases

The `@/*` alias maps to the project root. Always use it for imports:

```typescript
import { mockOrder } from '@/lib/mockData'
import PaymentForm from '@/components/PaymentForm'
```

### Styling

- Use **Tailwind CSS utility classes** exclusively — no CSS modules, no inline styles.
- Theme colors are defined as CSS variables in `app/globals.css` (`--background`, `--foreground`).
- Dark mode is handled via `prefers-color-scheme` media query in `globals.css`.
- Fonts: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) are loaded via `next/font/google` in `layout.tsx`.

### TypeScript

- Strict mode is on — no `any`, no implicit types.
- All component props should be explicitly typed with interfaces or inline types.
- The target is ES2017 with `bundler` module resolution.

### Localization

- UI copy is in **Vietnamese** throughout. Keep all user-facing strings in Vietnamese when adding or modifying UI text.
- Error messages and labels are defined in `lib/mockData.ts` under `mockErrorMessages`.

### Mock Data

`lib/mockData.ts` contains:
- `mockOrder` — order line items, pricing (VND), subscription details
- `mockUser` — user name, email, current tier
- `mockErrorMessages` — error strings in Vietnamese

This is a demo/prototype app. There is no real API integration — modify `mockData.ts` to change displayed content.

## Key Component Behaviors

### PaymentForm (`components/PaymentForm.tsx`)

- Formats card number as `XXXX XXXX XXXX XXXX` on input.
- Formats expiry as `MM/YY` on input.
- Limits CVV to 3 digits.
- On submit: simulates a 1.5-second processing delay, then shows a success state.
- Contains a developer "Test Error" button that navigates to `/error-state`.

### ErrorState (`components/ErrorState.tsx`)

- Accepts `errorCode`, `errorMessage`, and `technicalDetails` props.
- Shows troubleshooting steps and two actions: Retry (navigates back) and Contact Support.

## ESLint Configuration

Flat config (`eslint.config.mjs`) extends:
- `eslint-config-next/core-web-vitals` — enforces Core Web Vitals best practices
- `eslint-config-next/typescript` — TypeScript-specific rules

Ignored paths: `.next/`, `out/`, `build/`, `next-env.d.ts`.

Run `npm run lint` before committing. Fix all lint errors; do not disable rules without justification.

## Git Conventions

- Branch naming: `claude/<description>` for AI-assisted work.
- Commit messages follow Conventional Commits: `fix:`, `feat:`, `chore:`, `refactor:`, etc.
- Single-author project (Hoang Ha). Keep commits focused and descriptive.

## Things That Don't Exist (Don't Assume)

- No test suite (no Jest, Vitest, or Playwright).
- No CI/CD pipeline (no `.github/workflows`).
- No backend API or database.
- No authentication system.
- No i18n library (strings are hardcoded in Vietnamese).
- No state management library (Redux, Zustand, etc.) — plain `useState`.
- No `.env` files or environment variable usage.
