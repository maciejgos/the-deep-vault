# Browser-First React Runtime for The Deep Vault MVP

## Status

Accepted

## Context

The Deep Vault complete-game MVP needs a menu-based, single-player text RPG runtime with scene rendering, player-facing records, local save/load, and future browser UI validation. The requirement still lists platform and runtime as an open question, but the accepted feature and stories need a concrete architecture direction before execution planning.

Reasonable options include a browser app, terminal app, desktop app, mobile app, or backend-hosted web app. A complete 5-7 hour text RPG benefits from a readable UI, accessible records, keyboard interaction, local persistence, and automated end-to-end validation.

## Decision

Use a browser-first web MVP implemented with React, TypeScript, and TailwindCSS, running client-side without a required backend for the first MVP.

React owns scene rendering, menu interaction, player-facing records, and UI state. TypeScript owns type contracts for content, game state, conditions, effects, and save payloads. TailwindCSS owns utility-first styling once UI implementation begins.

No backend, database, account system, cloud save, or AI runtime is selected by this ADR. Hosting is covered by a separate ADR.

## Consequences

This makes the MVP easier to validate with browser automation, easier to package as a web app, and more natural for quest, codex, save/load, and accessibility behavior than a terminal-first approach.

It also means implementation planning must introduce frontend tooling, document setup commands, and eventually update `AGENTS.md` and `README.md` with exact install, dev, build, lint, and test commands.

The tradeoff is that browser-first local persistence is not equivalent to cloud save durability. If the product later needs accounts, analytics, cloud saves, server-side content delivery, AI-generated text, or moderation, a new design and ADR will be needed.

This closes the MVP platform target as browser-first web. Future platform changes should be captured in a superseding ADR.

## Related Artifacts

- [Design: The Deep Vault MVP Game Architecture](../design/the-deep-vault-mvp-game-architecture.md)
- [ADR: Cloudflare Pages Static Hosting for MVP](cloudflare-pages-static-hosting-for-mvp.md)
- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
