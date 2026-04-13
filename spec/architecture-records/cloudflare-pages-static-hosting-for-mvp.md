# Cloudflare Pages Static Hosting for MVP

## Status

Accepted

## Context

The proposed MVP runtime is a client-side React, TypeScript, and TailwindCSS web app with no required backend or database. The product needs shareable preview builds, static asset hosting, browser validation, and a low-operational-overhead deployment path.

Reasonable hosting options include Cloudflare Pages, Vercel, GitHub Pages, Netlify, or no hosted environment during MVP implementation. The current MVP does not require serverless functions, edge middleware, backend APIs, cloud saves, or database-backed routes.

## Decision

Use Cloudflare Pages as the static hosting platform for the MVP.

The MVP should deploy built static assets to Cloudflare Pages. The proposed build command is `pnpm build`, and the deployable output directory is `dist`. Preview deployments should be used for review when CI/CD is introduced. Cloudflare Workers, Pages Functions, D1, KV, R2, Durable Objects, or other server-side Cloudflare services are out of scope unless a later approved design adds backend behavior.

## Consequences

Cloudflare Pages fits the static client-only architecture and gives the project preview deployments without forcing backend infrastructure. It also leaves room to add Cloudflare services later if product requirements justify them.

The tradeoff is that Cloudflare Pages alone does not provide cloud saves, accounts, server-side validation, database persistence, or backend APIs. Those capabilities remain intentionally out of scope for the MVP.

Vercel remains a reasonable alternative if the team later prefers Vercel's workflow or needs Vercel-specific serverless behavior; changing hosting should be captured in a superseding ADR.

## Related Artifacts

- [Design: The Deep Vault MVP Game Architecture](../design/the-deep-vault-mvp-game-architecture.md)
- [ADR: Browser-First React Runtime for The Deep Vault MVP](browser-first-react-runtime-for-the-deep-vault-mvp.md)
- [ADR: No Server-Side Database for MVP](no-server-side-database-for-mvp.md)
