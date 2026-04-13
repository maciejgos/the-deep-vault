This directory contains The Deep Vault browser MVP source code.

Follow the accepted architecture:

- React owns browser UI.
- TypeScript owns game and content contracts.
- TailwindCSS owns styling.
- Game content should live under `src/content/`.
- Deterministic game rules, state, schema validation, route evaluation, and save/load code should live under `src/game/`.
- Browser save/load uses one local-first `localStorage` save slot for the MVP.

Do not add a backend, server-side database, Cloudflare Worker, Pages Function, D1, KV, R2, Durable Object, account system, cloud save, telemetry, multiplayer, procedural content generation, AI-generated prose, combat-first mechanics, or extra ending route without returning to solution design and ADR review.

Keep the first screen playable. Do not add a marketing landing page before the game experience.
