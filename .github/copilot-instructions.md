# Copilot Instructions for Next.js Starter Project

## Project Overview

This is a Next.js 16+ starter template with TypeScript, Tailwind CSS v4, Drizzle ORM, and shadcn/ui components. The architecture is modular with a clear separation of concerns.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (New York style)
- **Database**: PostgreSQL with Drizzle ORM
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner toast

## Architecture

- **Components**: Located in `src/components/`
  - `ui/`: shadcn/ui components
  - `shared/`: Shared reusable components (used in multiple places)
  - `icons/`: Icon components

- **Single-Use Components**: Place in `_components/` folder adjacent to usage
  - Example: `src/app/home/(auth)/sign-in/_components/sign-in-card.tsx`

- **Layout Components**: Place in `_layout/` folder adjacent to route group
  - Example: `src/app/home/_layout/Header.tsx`

- **Providers**: React context providers in `src/app/_providers/`
  - Example: `src/app/_providers/theme-provider.tsx`

- **Pages**: The `src/app/` directory using Next.js App Router

- **Database**: `src/db/` manages Drizzle ORM
  - `database.ts`: Database connection (hot-reload safe)
  - `migrate.ts`: Migration runner
  - `schema/`: Table definitions

- **Utilities**: `src/lib/`
  - `auth/`: Better Auth configuration
  - `env/`: Type-safe environment variables with Zod
  - `seo/`: SEO metadata utilities
  - `utils/`: Helper functions (cn, etc.)

## Critical Developer Workflows

### Development Server

```bash
npm run dev
```

### Database Migrations

```bash
npm run db:generate  # Generate migrations from schema
npm run db:migrate   # Run pending migrations
npm run db:studio    # Open Drizzle Studio
```

### Add shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## Project Conventions

- **Path Aliases**: `@/*` maps to `./src/*`
- **Environment Variables**: Use Zod schema in `src/lib/env/schema.env.ts`
- **Component Naming**: PascalCase for components, kebab-case for files
- **Server Components**: Default; use `"use client"` only when needed

## Code Style

- Use functional components with TypeScript
- Prefer named exports
- Use `async/await` over `.then()`
- Use `cn()` utility for conditional classNames

## Do NOT

- Use `any` type without justification
- Create class components
- Import from `@radix-ui/*` directly (use shadcn/ui wrappers)
- Hardcode environment values
