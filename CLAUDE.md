# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

10x Solution CMS — a multi-tenant, white-label content management system built with Next.js 14 (App Router) + Supabase (PostgreSQL). UI is in Vietnamese.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build (also serves as type-check)
npm run lint     # ESLint
npm run start    # Start production server
```

No test framework is configured. No separate type-check script — use `npm run build` to catch type errors.

## Architecture

### Data Layer
- **Database**: Supabase PostgreSQL with RLS enabled (but policies are permissive — isolation is app-level)
- **Schema**: `supabase-schema.sql` is the base; `migrations/` has incremental SQL files run manually in Supabase SQL Editor
- **CRUD helpers**: All in `src/lib/supabase.ts` — direct Supabase client calls, no ORM
- **Tenant scoping**: `src/lib/tenant-filter.ts` reads `tenantId` from the auth cookie client-side and injects `.eq('tenant_id', id)` into queries. `super_admin` bypasses filtering.

### Auth
- Custom cookie-based auth (NOT Supabase Auth)
- Cookie `cms_auth`: base64-encoded JSON `{userId, email, name, role, tenantId, tenantName, ts}`
- Login: `POST /api/auth/login` → calls `rpc('verify_user_login')` with pgcrypto bcrypt
- Rate limiting: 5 failed login attempts per 15 min (tracked in `login_attempts` table)
- Middleware (`src/middleware.ts`) protects all `/admin/*` routes
- Roles: `super_admin` (cross-tenant), `admin`, `editor` (scoped to own tenant)
- Auth context: `src/lib/auth-context.tsx` provides `useAuth()` hook

### License System
- Key format: `CMS-{PLAN}-{maxSites}-{hash}` with djb2 hash (secret: `10xCMS2026`)
- Plans: BASIC (1 site), PRO (5), BUSINESS (unlimited)
- Env var: `NEXT_PUBLIC_LICENSE_KEY`; no key = free trial (1 site)
- Generator: `node scripts/generate-license.js`
- Logic: `src/lib/license.ts`

### Key Directories
- `src/app/admin/` — Admin pages (dashboard, posts, categories, tags, media, SEO, etc.)
- `src/app/api/` — API routes (auth, posts, license, cron)
- `src/components/admin/` — Shared components (Sidebar, RichTextEditor with Tiptap, MediaLibrary)
- `src/lib/` — Utilities, types, Supabase client, auth context, tenant filter, license

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_NAME
NEXT_PUBLIC_SITE_URL
CRON_SECRET
```
Optional: `NEXT_PUBLIC_LICENSE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`

### Path Alias
`@/*` maps to `./src/*` (configured in tsconfig.json)
