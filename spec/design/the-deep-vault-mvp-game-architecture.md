# Design: The Deep Vault MVP Game Architecture

## Status

Accepted

## Context

The Deep Vault complete-game MVP needs a full beginning-to-end menu-based text RPG with evidence gathering, quest and codex records, faction trust, character states, route commitment, four endings, and save/load continuity.

The accepted feature and stories define product behavior but intentionally leave runtime, content structure, state handling, route evaluation, persistence policy, and validation approach unresolved. This design defines a browser-first, data-driven game architecture that can support the full MVP while keeping implementation small enough for an initial product build.

## Source Artifacts

- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Story: MVP Playthrough Spine](../stories/mvp-playthrough-spine.md)
- [Story: Menu Choice Scene Flow](../stories/menu-choice-scene-flow.md)
- [Story: Story State and Choice Consequences](../stories/story-state-choice-consequences.md)
- [Story: Evidence, Codex, and Quest Records](../stories/evidence-codex-and-quest-records.md)
- [Story: Vault Zones and Access Progression](../stories/vault-zones-access-progression.md)
- [Story: Faction Trust and Character Arcs](../stories/faction-trust-and-character-arcs.md)
- [Story: MVP Side Content Consequences](../stories/mvp-side-content-consequences.md)
- [Story: Route Commitment and Ending Evaluation](../stories/route-commitment-and-ending-evaluation.md)
- [Story: Save and Load Playthrough Continuity](../stories/save-load-playthrough-continuity.md)
- [Story: MVP Content Scope and Deferral Map](../stories/mvp-content-scope-and-deferral-map.md)
- [Design: The Deep Vault MVP Content Scope Map](the-deep-vault-mvp-content-scope-map.md)

## Goals

- Support a complete MVP playthrough from opening scene to one of four ending routes.
- Keep the core interaction model menu-based, deterministic, and inspectable.
- Make story content, state changes, route gates, evidence, quest records, codex entries, and endings traceable.
- Allow design and validation to reason about route coverage before code exists.
- Preserve player decisions across a full playthrough through local save/load.
- Keep the first implementation free of unnecessary backend, database, account, cloud save, AI runtime, or multiplayer complexity.
- Make the local development environment reproducible through Docker and Dev Containers before product implementation begins.
- Define a lightweight hosting target for the browser-first MVP.
- Define validation checks that can start as artifact review and later become automated tests or CI/CD gates.

## Proposed Design

### Runtime Shape

Build the MVP as a browser-first single-player web app using React, TypeScript, and TailwindCSS. The game should run entirely client-side for the first MVP unless later design adds accounts, cloud saves, analytics, or server-generated content.

The browser app should own:

- rendering the current scene, prose, menus, records, and save/load controls
- maintaining in-memory game state during play
- applying deterministic choice effects
- evaluating choice availability and route eligibility
- writing and reading local save data

No backend service is required for the MVP design. No database is required for the MVP design. If a future requirement adds cloud saves, player accounts, telemetry, content moderation, AI-generated prose, hosted authoring tools, or shared player state, that should trigger a new design and ADR.

### Development Environment

Use Docker and Dev Containers for the implementation environment once product tooling is introduced. The repository currently has no package manager, product runtime, Dockerfile, Compose file, or `.devcontainer/` configuration committed, so execution planning should include those files as part of the first implementation setup.

The development environment should provide:

- Node.js 24 LTS pinned in the Dev Container and local version metadata
- pnpm as the package manager with a committed lockfile
- Vite as the React application build tool
- reproducible dependency installation from committed lockfiles
- commands for development server, build, lint, unit tests, content validation, and Playwright tests once those tools exist
- browser automation dependencies needed for Playwright validation
- a documented path for running the same checks locally and in CI

The Dev Container should be the preferred contributor environment. Docker Compose may be used to run the workspace and future service dependencies, but the MVP should not add database or backend containers unless a later approved design changes the no-database and no-backend scope.

### Hosting Platform

Use Cloudflare Pages as the hosting platform for the browser-first MVP. The MVP is a static client-side app with no required backend, which fits Cloudflare Pages preview deployments and static asset delivery. The build command is `pnpm build`, and the deployable output directory is `dist`.

Cloudflare Workers, Cloudflare D1, R2, KV, Pages Functions, or any other server-side Cloudflare service should not be introduced for the MVP unless a later approved requirement adds backend behavior, cloud saves, asset uploads, analytics, server-side content, or account features.

### Player Experience Flow

The main screen should prioritize the playable text experience. A player sees the current scene title, location or chapter context, narrative text, available choices, and any concise state feedback needed to understand consequences.

The player moves through:

1. Opening maintenance-runner situation.
2. First contradiction in public doctrine.
3. Investigation and hub selection across Vault-9 zones.
4. Escalating faction and character pressure.
5. Major conspiracy reveals.
6. Route commitment.
7. Crisis resolution.
8. Ending and outcome summary.

Hub moments should let the player inspect objectives, evidence, codex entries, and available leads before choosing the next action. Hubs should not become free-roaming simulations; they are structured decision points that preserve authored pacing.

### Content Model

Represent game content as structured data rather than hard-coded scene logic. The MVP should define content records for:

- scenes
- choices
- effects
- conditions
- evidence entries
- quest entries
- codex entries
- locations and zones
- factions
- characters
- endings
- side content

Each scene should have a stable id, title, zone, narrative blocks, choices, and optional entry or exit effects. Each choice should have text, optional availability conditions, effects, and a target scene or outcome.

Conditions and effects should use a constrained vocabulary rather than arbitrary code embedded in content. For example:

- condition: evidence exists
- condition: faction trust at least threshold
- condition: flag is set
- condition: character state equals value
- effect: set flag
- effect: add evidence
- effect: adjust trust
- effect: set character state
- effect: adjust pressure
- effect: move to scene

This keeps content reviewable and makes validation fixtures possible.

Content should live in TypeScript modules under a future `src/content/` directory. Runtime and test validation should use Zod schemas or equivalent TypeScript-first schema validation under future `src/game/` modules. TypeScript modules are preferred over JSON, YAML, or Markdown-frontmatter for the MVP because they preserve static bundling, editor type checking, refactor safety, and direct route fixture imports without adding a separate content parser.

### Game State

Game state should be a single serializable object with explicit fields for MVP behavior:

- current scene or checkpoint
- visited scenes
- selected choices
- progress flags
- faction trust
- character states
- evidence records
- quest records
- codex records
- player resources such as stress, supplies, clearance, and evidence count
- route progress and final route
- public stability or crisis pressure
- side content outcomes
- save metadata such as version and timestamp

State changes should be applied through a single effect-resolution path so validation can trace outcomes consistently. Player-facing state should be selective: evidence, quests, codex, current objectives, and clear major consequences should be visible; exact trust and pressure numbers may be shown, hinted, or hidden depending on later product approval.

### Quest, Evidence, and Codex Records

Evidence, quest, and codex records should be generated from structured content ids. Records need concise player-facing summaries and optional source scene references for validation.

Evidence should matter in at least three ways:

- unlock or alter dialogue and choices
- change faction or character reactions
- influence route or ending evaluation

Quest records should cover active objectives, completed objectives, and unresolved leads. The codex should cover doctrine contradictions, documents, locations, factions, and major discoveries.

### Faction and Character Model

Faction trust should be represented as bounded numeric or ordinal values for Mechanical, Stability Office, Keepers, and Descenders. Character states should use named states, not free-form text, so route and scene conditions can depend on them.

The design should avoid simulating relationships at high complexity. MVP depth is enough if each major faction has at least one visible consequence chain and core characters can affect crisis or ending context.

### Route Evaluation

Route commitment should be deterministic and state-driven. The player may choose a route only when the MVP has enough evidence and state context to make that route meaningful, or the route may remain available with degraded consequences.

Route evaluation should consider:

- final route choice or commitment
- evidence gathered
- major doctrine contradictions discovered
- faction trust or opposition
- character states
- pressure or public stability
- key side content outcomes
- route-specific flags such as Boundary Ring or exile evidence

Each ending should have a base outcome plus conditional variants. The MVP should avoid a combinatorial explosion: endings should summarize meaningful differences from major state groups rather than every possible variable.

### Save and Load

Use local-first save/load for the MVP through browser `localStorage`. The save payload should be the serialized game state plus metadata and a version number. A single manual save slot is sufficient for MVP design unless human review chooses multiple slots or autosave.

The app should handle:

- no save exists
- save exists and loads successfully
- save version is incompatible or unavailable
- save data is malformed

Cloud saves, accounts, cross-device sync, and server-side database persistence are out of scope for this design.

`localStorage` is sufficient for a single serialized MVP save slot and is easier to inspect in Playwright than IndexedDB. If save payload size, async writes, multiple slots, or larger player-created data become requirements, this decision should be revisited.

### Content Scope and Deferral Map

Before execution planning, the raw narrative package is mapped into MVP content classifications in [Design: The Deep Vault MVP Content Scope Map](the-deep-vault-mvp-content-scope-map.md):

- mandatory at MVP depth
- represented lightly
- deferred
- rejected

The map covers raw-note scenes, side quests, NPCs, locations, key items, flags, trust systems, and resource meters. Deferred content includes a rationale explaining why the complete playthrough and four routes still work.

### Data Flow

1. The app loads content data and initializes a new game state or loaded save state.
2. The scene renderer reads the current scene id and resolves visible narrative blocks and available choices.
3. The player selects a menu choice.
4. The effect resolver validates conditions, applies effects to game state, records choice history, and transitions to the next scene.
5. Record managers update evidence, quest, and codex summaries based on effects.
6. Route evaluator runs when route commitment or ending scenes require it.
7. Save manager serializes state to local storage when the player saves.

The hosting flow should remain static:

1. CI installs dependencies in the same runtime family used by the Dev Container.
2. CI runs `pnpm install --frozen-lockfile`, lint, unit tests, content graph checks, route fixtures, save/load round trips, build, and Playwright checks as they become available.
3. CI builds static assets.
4. Cloudflare Pages serves the `dist` output through preview and production deployments.

### Validation Strategy

Immediate validation should be artifact-based:

- Check the design links to accepted source artifacts.
- Check each accepted story has an explicit design response.
- Check durable decisions are captured in proposed ADRs.
- Check open questions remain visible and are not treated as approved.
- Check the design includes route, state, evidence, faction, side content, and save/load behavior.

Future automated validation should include:

- content schema checks for required fields, valid ids, and valid condition/effect names
- link checks between scenes, choices, evidence, quests, codex entries, and endings
- route fixture tests for all four endings
- deterministic playthrough simulations for happy path and key variant paths
- save/load round-trip tests
- accessibility and keyboard-navigation checks once UI exists
- Playwright end-to-end checks for scene flow, records, save/load, and ending reachability

## Alternatives Considered

- Terminal-first MVP: simpler to implement, but weaker for browser UI validation, accessibility review, and future visual presentation. It also makes save/load and player-facing records less natural for a 5-7 hour RPG.
- Backend-first web app: useful for accounts, cloud saves, analytics, or hosted content tools, but unnecessary for a single-player MVP and adds operational complexity before the game loop is proven.
- Database-backed MVP: useful for accounts, cross-device saves, analytics, shared content, or hosted authoring, but unnecessary while the MVP is single-player, local-first, and static.
- Vercel hosting: also reasonable for a React static app, but Cloudflare Pages is the proposed default because the MVP does not need serverless API routes and can benefit from simple static hosting and preview deployments.
- Hostless local-only build: simplest operationally, but weaker for sharing review builds, release-readiness evidence, and browser validation across environments.
- Native local development without containers: faster for contributors who already have the right Node.js tooling, but less reproducible and weaker for future CI parity than a Dev Container baseline.
- Hard-coded scene logic: fast for a tiny prototype, but risky for a complete MVP with many scenes, routes, conditions, and validation needs.
- Full narrative engine dependency: could reduce engine work, but may constrain state, route evaluation, validation fixtures, and custom records. This can be reconsidered during execution planning if a candidate library matches the content model.
- Multiple save slots and autosave by default: player-friendly, but the requirement leaves save policy open. A single manual local slot is the smallest design that supports full-playthrough continuity.
- JSON, YAML, or Markdown-frontmatter content files: easier for non-TypeScript authoring, but they require additional parser and schema plumbing before the MVP has an authoring workflow. TypeScript content modules with schema validation are the smallest typed path for implementation.
- IndexedDB for save data: more scalable than `localStorage`, but unnecessary for one MVP save slot and less direct for simple Playwright state inspection.

## Risks and Tradeoffs

- Complete-game MVP scope is large. The content scope and deferral map must be completed before execution planning to avoid uncontrolled expansion.
- Client-only persistence can be lost if the player clears browser data. This is acceptable for MVP only if human review accepts local-first save behavior.
- `localStorage` has size and browser-policy limits. Execution planning should keep the save payload compact and test malformed, missing, and incompatible saves.
- A data-driven content model adds upfront design work, but it reduces long-term risk for branching validation and content review.
- Hiding exact trust and pressure values improves narrative immersion but may make debugging and validation harder. The implementation can expose debug-only state views later if approved.
- Route evaluation can become opaque if conditions are scattered. Route rules should live in structured data or one explicit route evaluator, not inside ad hoc scene prose.
- Browser-first design closes the first playable target as web for MVP implementation. Future platform changes need a superseding design or ADR.
- Cloudflare Pages is simple for static hosting, but it does not solve cloud saves, database persistence, authentication, or backend behavior. Those remain out of scope unless future requirements change.
- Dev Containers improve reproducibility, but they add setup files and Docker dependency overhead. Contributors should still be able to run documented commands directly on the host when they choose.
- TypeScript content modules favor developer ergonomics over nontechnical writing workflows. A future hosted authoring tool or external content format would need a superseding design.
- Themes involving coercion, disappearance, exile, family separation, and social collapse still need content warning and sensitivity review decisions.

## Validation

Immediate checks:

- Review this design against the complete-game MVP feature and all accepted stories.
- Review accepted ADRs for browser-first runtime, Docker and Dev Containers, data-driven narrative model, no-database MVP scope, local-first persistence, and Cloudflare Pages hosting.
- Confirm every major story has a design path to implementation planning.
- Confirm the MVP content scope map covers raw-note scenes, side quests, NPCs, locations, key items, flags, trust systems, resources, and deferrals.
- Confirm open questions are not silently resolved beyond the proposed ADRs.

Future CI/CD or lifecycle gates:

- Static Markdown link and required-section checks for PDLC artifacts.
- Dev Container build and command smoke checks once tooling exists.
- pnpm lockfile and Node 24 LTS version checks once tooling exists.
- Content graph validation for missing scene targets, duplicate ids, invalid conditions, invalid effects, unreachable required scenes, and unreachable endings.
- Route fixture coverage for controlled truth, full exposure, preserve order, and exit protocol.
- Save/load serialization round-trip coverage.
- Playwright coverage for core menu flow, records, save/load, and ending reachability.
- Release-readiness check requiring validation evidence for all accepted stories before merge or release.

## Related Artifacts

- [ADR: Browser-First React Runtime for The Deep Vault MVP](../architecture-records/browser-first-react-runtime-for-the-deep-vault-mvp.md)
- [ADR: Docker and Dev Containers for Implementation](../architecture-records/docker-and-dev-containers-for-implementation.md)
- [ADR: Data-Driven Narrative Content and State Model](../architecture-records/data-driven-narrative-content-and-state-model.md)
- [ADR: No Server-Side Database for MVP](../architecture-records/no-server-side-database-for-mvp.md)
- [ADR: Local-First Save and Load Persistence](../architecture-records/local-first-save-and-load-persistence.md)
- [ADR: Cloudflare Pages Static Hosting for MVP](../architecture-records/cloudflare-pages-static-hosting-for-mvp.md)
- [Design: The Deep Vault MVP Content Scope Map](the-deep-vault-mvp-content-scope-map.md)
- [Validation: The Deep Vault MVP Design Validation](../validation/the-deep-vault-mvp-design-validation.md)
