# WMStudio Next.js Starter

![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

A production-ready Next.js 16+ starter template with authentication, database, and modern UI components out of the box.

## ✨ Features

- ⚡ **Next.js 16+** with App Router and Turbopack
- 🔐 **Better Auth** - Authentication with Google OAuth (ready to extend)
- 🗄️ **Drizzle ORM** - Type-safe PostgreSQL database with migrations
- 🎨 **Tailwind CSS v4** - Latest utility-first CSS with CSS variables
- 🧩 **shadcn/ui** - Beautiful, accessible Radix-based components (New York style)
- 🌙 **Dark Mode** - System-aware theme switching with next-themes
- 📝 **React Hook Form + Zod** - Type-safe form handling and validation
- 🔔 **Sonner** - Elegant toast notifications
- 🛣️ **Proxy Routing** - Flexible routing with subdomain support for production
- 🔒 **Type-safe Environment** - Zod-validated environment variables
- 🔍 **SEO Utilities** - Helper functions for consistent metadata
- ⚠️ **Error Handling** - Graceful error boundaries with recovery
- ⏳ **Loading States** - Built-in loading UI for route transitions

## Tech Stack

| Category       | Technology                      |
| -------------- | ------------------------------- |
| Framework      | Next.js 16+ (App Router)        |
| Language       | TypeScript (strict mode)        |
| Styling        | Tailwind CSS v4 + CSS Variables |
| UI Components  | shadcn/ui (New York style)      |
| Database       | PostgreSQL + Drizzle ORM        |
| Authentication | Better Auth (Google OAuth)      |
| Validation     | Zod                             |
| Forms          | React Hook Form                 |
| Notifications  | Sonner                          |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted like [Neon](https://neon.tech), [Supabase](https://supabase.com))
- Google OAuth credentials ([Google Cloud Console](https://console.cloud.google.com/apis/credentials))

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone https://github.com/wmstudio/wmstudio-nextjs-starter.git
   cd wmstudio-nextjs-starter
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:

   ```env
   # Database
   POSTGRES_URL=postgresql://user:password@localhost:5432/myapp

   # Better Auth
   BETTER_AUTH_SECRET=your-secret-key-at-least-32-characters
   BETTER_AUTH_URL=http://localhost:3000

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Run database migrations:**

   ```bash
   npm run db:migrate
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) 🚀

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── _providers/           # React context providers
│   │   └── theme-provider.tsx
│   ├── error.tsx             # Global error boundary
│   ├── global-error.tsx      # Root layout error boundary
│   ├── loading.tsx           # Global loading state
│   ├── home/                 # Public routes (via proxy rewrite)
│   │   ├── _layout/          # Layout components (Header, Footer)
│   │   ├── error.tsx         # Home error boundary
│   │   ├── loading.tsx       # Home loading state
│   │   ├── (auth)/           # Auth pages (sign-in, etc.)
│   │   │   ├── loading.tsx   # Auth loading state
│   │   │   └── sign-in/
│   │   │       ├── page.tsx
│   │   │       └── _components/  # Single-use components
│   │   └── page.tsx          # Home page
│   └── api/
│       └── auth/             # Better Auth API routes
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── shared/               # Reusable components (logo, copyright, etc.)
│   └── icons/                # Icon components
├── db/
│   ├── database.ts           # Database connection (hot-reload safe)
│   ├── migrate.ts            # Migration runner
│   ├── migrations/           # Generated migrations
│   └── schema/               # Drizzle schema definitions
├── lib/
│   ├── auth/                 # Better Auth configuration
│   ├── env/                  # Type-safe environment variables
│   ├── seo/                  # SEO metadata utilities
│   └── utils/                # Utility functions (cn, etc.)
└── proxy.ts                  # Next.js proxy routing (middleware replacement)
```

### Component Organization

| Type              | Location                    | Usage                          |
| ----------------- | --------------------------- | ------------------------------ |
| UI primitives     | `src/components/ui/`        | shadcn/ui components           |
| Shared components | `src/components/shared/`    | Used in multiple places        |
| Single-use        | `_components/` next to page | Used only in one location      |
| Layout components | `_layout/` next to route    | Header, Footer for route group |
| Providers         | `src/app/_providers/`       | React context providers        |
| Icons             | `src/components/icons/`     | SVG icon components            |

## Scripts

| Command               | Description                     |
| --------------------- | ------------------------------- |
| `npm run dev`         | Start dev server (Turbopack)    |
| `npm run build`       | Build for production            |
| `npm run start`       | Start production server         |
| `npm run lint`        | Run ESLint                      |
| `npm run db:generate` | Generate migrations from schema |
| `npm run db:migrate`  | Run pending migrations          |
| `npm run db:studio`   | Open Drizzle Studio             |

## Authentication

This template uses [Better Auth](https://better-auth.com) with Google OAuth pre-configured.

### Sign-in Page

Visit `/sign-in` to see the default sign-in page. Supports `callbackUrl` query parameter for redirects.

### Adding More Providers

Edit `src/lib/auth/index.ts` to add more OAuth providers:

```typescript
socialProviders: {
  google: { ... },
  github: {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  },
},
```

### Protecting Routes

Uncomment the protection logic in `src/proxy.ts`:

```typescript
if (!sessionCookie) {
  const callbackUrl = encodeURIComponent(req.url);
  return NextResponse.redirect(
    new URL(`/sign-in?callbackUrl=${callbackUrl}`, req.url),
  );
}
```

## Database

Uses [Drizzle ORM](https://orm.drizzle.team) with PostgreSQL. Schema uses a custom namespace (`APP`) to avoid conflicts.

### Adding Tables

1. Edit `src/db/schema/index.ts`
2. Generate migration: `npm run db:generate`
3. Run migration: `npm run db:migrate`

### View Data

```bash
npm run db:studio
```

## Dark Mode

The template includes a fully configured dark mode using `next-themes`. The theme respects system preferences by default.

### Using the Theme Toggle

Import and use the `ThemeToggle` component:

```tsx
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

### Available Themes

- `light` - Light mode
- `dark` - Dark mode
- `system` - Follow system preference (default)

## SEO

Use the SEO utilities for consistent metadata across pages:

```tsx
// In any page.tsx
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Dashboard",
  description: "View your dashboard and analytics",
  keywords: ["dashboard", "analytics"],
});
```

### Available Functions

| Function                  | Description                        |
| ------------------------- | ---------------------------------- |
| `createMetadata()`        | Creates metadata with OG/Twitter   |
| `createNoIndexMetadata()` | Creates metadata with noindex flag |
| `siteConfig`              | Site-wide configuration object     |

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
```

Browse available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components)

## Routing

This template uses a proxy-based routing system (`src/proxy.ts`) instead of traditional middleware, providing:

- **Path-based routing** (development): `/sign-in` → `/home/sign-in`
- **Subdomain routing** (production): `app.example.com` → separate app routes

### Enable Subdomain Routing

Set in `.env`:

```env
USE_SUBDOMAIN_ROUTING=true
BASE_DOMAIN=.yourdomain.com
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
NODE_ENV=production
POSTGRES_URL=your-production-database-url
BETTER_AUTH_SECRET=your-production-secret
BETTER_AUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## What's Included vs What's Not

### ✅ Included

- Authentication (Better Auth + Google OAuth)
- Database setup (Drizzle + PostgreSQL)
- UI component system (shadcn/ui)
- Dark mode with system preference support
- Type-safe environment variables
- Toast notifications
- Proxy-based routing system
- Hot-reload safe database connection
- Sign-in page
- Error boundaries with recovery UI
- Loading states for route transitions
- SEO metadata utilities

### ❌ Not Included (By Design)

- Testing framework (add Vitest/Jest as needed)
- CI/CD pipelines (project-specific)
- Email provider setup (add Resend/SendGrid as needed)
- Rate limiting (add Upstash as needed)
- Analytics (add Vercel Analytics/Plausible as needed)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://better-auth.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## License

MIT
