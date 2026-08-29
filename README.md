# Freelink

Curated hiring platform — *No Profiles, Just People.*

Next.js 14 (App Router) + TypeScript + Tailwind marketing site with three
registration flows (Talent / Hiring / Partner) and a protected admin dashboard,
backed by Firebase (Firestore, Storage, Auth).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Without Firebase (dev mode)
Copy `.env.local.example` to `.env.local` but leave Firebase vars blank. The
forms will log submissions to the browser console (`[freelink dev]`), and the
admin dashboard runs on seeded demo data so you can explore it end to end.

Log into `/admin` with any allow-listed email (any value works in dev; the
password field is ignored). Set `NEXT_PUBLIC_ADMIN_EMAILS` to the list you want.

### Configure Firebase for real
1. Create a project at https://console.firebase.google.com.
2. Fill `.env.local` with the web app config.
3. Deploy rules and hosting:
   ```bash
   firebase deploy --only firestore:rules,storage,hosting
   ```
4. Set `NEXT_PUBLIC_ADMIN_EMAILS`, create/manage staff in Firebase Auth, and add
   each admin's uid to a `adminUsers` doc in Firestore.

## Scripts

| Script       | Purpose                        |
| ------------ | ------------------------------ |
| `npm run dev`     | Local dev server               |
| `npm run build`   | Production build               |
| `npm run start`   | Serve production build         |
| `npm run lint`    | ESLint                         |
| `npm run typecheck`| TypeScript type checking       |

## Structure

- `app/` — App Router pages (marketing site, `/business`, `/talent`, `/partner`, `/admin`)
- `components/` — UI, forms, admin, and motion/3D components
- `lib/` — Firebase client, Firestore data layer, Zod schemas, helpers
- `firestore.rules` / `storage.rules` — security rules

## Brand notes

This site encodes the Freelink brand manual in `app/globals.css` (design
tokens). **Do not** add colors, fonts, or a logo variant beyond the palette in
that file.