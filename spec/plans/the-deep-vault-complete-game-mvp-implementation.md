# Implement The Deep Vault Complete Game MVP

## Status

Accepted

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `spec/plans/PLANS.md`. The plan is currently a draft implementation plan. It does not approve implementation by itself. A human must explicitly approve this ExecPlan before Codex begins editing product source code, tests, Docker, Dev Container, package manager, or CI/CD files.

## Purpose / Big Picture

After this work is implemented, a player can open a browser-based version of The Deep Vault, start a new game as Tomas Vale, make menu-based choices across the complete MVP story, gather evidence, affect faction and character state, save and load progress, and reach one of four endings: controlled truth, full exposure, preserve order, or exit protocol. A contributor can prove the work by running the local development server, playing from the opening scene to an ending, running unit and content validation tests, running route fixture tests for all four endings, and running Playwright browser tests that exercise scene flow, records, save/load, and ending reachability.

The implementation target is a static, client-side React application. There is no backend and no server-side database for the MVP. Game content lives in TypeScript modules, game rules are deterministic, and player save data is stored in browser `localStorage`.

## Progress

- [x] (2026-04-13 Europe/Warsaw) Created this draft ExecPlan from accepted requirements, feature, stories, solution design, ADRs, content scope map, and design validation artifacts.
- [x] (2026-04-13 Europe/Warsaw) Human explicitly requested implementation execution and the ExecPlan status was `Accepted`.
- [x] (2026-04-13 Europe/Warsaw) Created and switched to branch `codex/deep-vault-complete-game-mvp`.
- [x] (2026-04-13 Europe/Warsaw) Added reproducible Node.js 24, pnpm, Vite, React, TypeScript, TailwindCSS, Docker, and Dev Container tooling. Generated `pnpm-lock.yaml`, added the Vite app shell, initial Vitest and Playwright smoke tests, Docker Compose, Dev Container setup, command documentation, and passed the Docker-based validation chain.
- [x] (2026-04-13 Europe/Warsaw) Built the typed game model, Zod schema validation, deterministic condition/effect engine, scene selectors, route evaluator, localStorage save/load layer, and content graph validator. Added unit coverage for invalid content, deterministic conditions/effects, scene transitions, route evaluation, and save/load success and failure cases.
- [x] (2026-04-13 Europe/Warsaw) Implemented the React player interface for engine-backed scene text, menu choices, quest/evidence/codex records, status summary, local save/load controls, and ending route preview. Added component coverage for opening render and first route path, and expanded Playwright smoke coverage for the first route endpoint on desktop and mobile.
- [x] (2026-04-13 Europe/Warsaw) Created the first playable content path through the engine for Milestone 3. Added TypeScript content modules for P1 Survival Notice, A1 Pressure Fault, B-17 signal, a temporary route endpoint, B-17 evidence, records, locations, factions, characters, item metadata, and a full-exposure preview route fixture. This proves the engine-driven path and does not reduce the later full MVP content scope.
- [x] (2026-04-13 Europe/Warsaw) Added MVP-depth content coverage for all mandatory rows in the accepted content scope map: 22 main scenes, 4 endings, 8 side quests, 10 NPCs, 20 locations, 12 key items, required flags, 4 trust systems, character states, and required resources. Added content tests that fail if mandatory records or consequence effects are missing.
- [x] (2026-04-13 Europe/Warsaw) Implemented full route commitment, deterministic route fixture execution, route signal scoring, and save/load continuity coverage. Added fixture helpers and tests proving all four route fixtures reach matching endings and can save/load at mid-route before continuing with preserved choices, evidence, quests, route progress, and ending outcomes.
- [x] (2026-04-13 Europe/Warsaw) Added Playwright browser tests for all four ending routes, keyboard-reachable menu play, browser save/load continuity, record preservation, and ending screenshot attachment evidence for the full-exposure route.
- [x] (2026-04-13 Europe/Warsaw) Created validation evidence under `spec/validation/the-deep-vault-complete-game-mvp-implementation-validation.md`, mapping implementation evidence back to the requirement, feature, stories, design, ADRs, ExecPlan, automated checks, Playwright browser evidence, missing checks, and future gates. Result is `Ready for human review`; human decision remains pending.

## Surprises & Discoveries

- Observation: The repository currently has no committed package manager, product runtime, Dockerfile, Dev Container, executable test command, or CI/CD configuration.
  Evidence: `README.md`, `AGENTS.md`, `src/README.md`, and `tests/README.md` all describe product code and tests as future work.
- Observation: Architecture review found the content scope map and implementation-shaping choices were necessary before planning could be credible.
  Evidence: Accepted design artifacts now include `spec/design/the-deep-vault-mvp-content-scope-map.md`, Node.js 24 LTS, pnpm, Vite, TypeScript content modules, Zod or equivalent schema validation, browser `localStorage`, and Cloudflare Pages `dist` output.
- Observation: The implementation environment on 2026-04-13 did not have host `node` or `pnpm`.
  Evidence: `node --version` and `pnpm --version` returned `command not found`.
- Observation: Docker daemon access was available after explicit approval, so Milestone 1 validation could run inside the workspace container instead of requiring host Node.
  Evidence: `docker images` succeeded after approval, `docker compose build workspace` succeeded, and `docker compose run --rm workspace pnpm validate` passed.
- Observation: Playwright needed explicit browser and system dependency setup in the container.
  Evidence: The first `pnpm test:e2e` run failed because Chromium was missing from the Playwright cache. The fix added `pnpm test:e2e:setup`, `PLAYWRIGHT_BROWSERS_PATH=/ms-playwright`, an `ms-playwright` Docker volume, and Playwright system dependencies in `.devcontainer/Dockerfile`.
- Observation: Zod `record` schemas do not support `.partial()` in the installed Zod version.
  Evidence: The first Milestone 2 unit run failed with `TypeError: z.record(...).partial is not a function`; `routeProgress` validation was corrected to a route-keyed numeric record.

## Decision Log

- Decision: Implement the MVP as a browser-first static React application using TypeScript and TailwindCSS.
  Rationale: Accepted ADR `spec/architecture-records/browser-first-react-runtime-for-the-deep-vault-mvp.md` closes the MVP platform target as browser-first web and keeps the app client-side.
  Date/Author: 2026-04-13 / Codex, based on accepted ADR.
- Decision: Use Node.js 24 LTS, pnpm, Vite, Docker, and Dev Containers for implementation setup.
  Rationale: Accepted design and ADRs require reproducible local and CI-like tooling while keeping host-native commands documented.
  Date/Author: 2026-04-13 / Codex, based on accepted ADR.
- Decision: Use TypeScript content modules under `src/content/` and Zod or equivalent TypeScript-first validation under `src/game/`.
  Rationale: Accepted ADR `spec/architecture-records/data-driven-narrative-content-and-state-model.md` favors static bundling, type checking, route fixtures, and avoiding a separate content parser for MVP.
  Date/Author: 2026-04-13 / Codex, based on accepted ADR.
- Decision: Use no backend and no server-side database for the MVP.
  Rationale: Accepted ADR `spec/architecture-records/no-server-side-database-for-mvp.md` states that authoritative content ships as static assets and runtime player state is local-only.
  Date/Author: 2026-04-13 / Codex, based on accepted ADR.
- Decision: Use browser `localStorage` for one manual MVP save slot.
  Rationale: Accepted ADR `spec/architecture-records/local-first-save-and-load-persistence.md` chooses local-first persistence with a compact serialized state payload.
  Date/Author: 2026-04-13 / Codex, based on accepted ADR.
- Decision: Use Cloudflare Pages static hosting with `pnpm build` and `dist` output.
  Rationale: Accepted ADR `spec/architecture-records/cloudflare-pages-static-hosting-for-mvp.md` selects static hosting and keeps Workers, Functions, D1, KV, R2, and Durable Objects out of MVP scope.
  Date/Author: 2026-04-13 / Codex, based on accepted ADR.

## Outcomes & Retrospective

2026-04-13 update: Milestone 1 is implemented. The repository now contains a Vite React TypeScript scaffold, pnpm lockfile, TailwindCSS and ESLint configuration, initial UI smoke tests, Docker Compose and Dev Container definitions, Playwright browser setup, and updated command documentation. Host-native validation remains unavailable until host Node/pnpm are installed, but Docker-based validation passed with `docker compose run --rm workspace pnpm install --frozen-lockfile` and `docker compose run --rm workspace pnpm validate`.

2026-04-13 update: Milestone 2 is implemented. The repository now contains the initial `src/game/` foundation for serializable game state, structured content contracts, constrained condition and effect vocabularies, deterministic scene transitions, route scoring and ending selection, content graph validation, and single-slot localStorage save/load. Docker-based `pnpm validate` passed with 7 unit tests and 2 Playwright smoke tests.

2026-04-13 update: Milestone 3 is implemented. The repository now contains `src/content/` modules and `tests/content/first-path.test.ts` proving a scripted path from `P1. Survival Notice` through `A1. Pressure Fault`, B-17 evidence collection, and a temporary full-exposure endpoint. Docker-based `pnpm validate` passed with 9 unit/content tests and 2 Playwright smoke tests.

2026-04-13 update: Milestone 4 is implemented. The static placeholder UI was replaced with React components backed by `src/game/` and `src/content/`, including scene rendering, choices, records, status, save/load controls, and ending preview. Docker-based `pnpm validate` passed with 10 unit/content/component tests and 4 Playwright smoke tests across desktop and mobile projects.

2026-04-13 update: Milestone 5 is implemented. The repository now contains lean MVP-depth content records for all mandatory content scope map rows, plus validation tests that inspect actual scene choice effects for mandatory flags, side quest outcomes, trust systems, character states, and resources. Docker-based `pnpm validate` passed with 12 unit/content/component tests and 4 Playwright smoke tests across desktop and mobile projects.

2026-04-13 update: Milestone 6 is implemented. The route evaluator now scores accumulated route signals from evidence, faction trust, character states, public stability, pressure, resources, and key items, while still honoring explicit final route commitment. Route fixture helpers run scripted paths, and content tests save at mid-route, load, continue, and prove all four fixtures reach their matching endings. Docker-based `pnpm validate` passed with 14 unit/content/component tests and 4 Playwright smoke tests.

2026-04-13 update: Milestone 7 is implemented. Playwright now derives browser route checks from the committed route fixtures and verifies keyboard entry, all four ending routes, browser save/load resume, record preservation, and a full-exposure ending screenshot attachment in the Playwright report. Docker-based `pnpm validate` passed with 14 unit/content/component tests and 12 Playwright browser tests across desktop and mobile projects.

2026-04-13 update: Milestone 8 is implemented. Validation evidence was recorded in `spec/validation/the-deep-vault-complete-game-mvp-implementation-validation.md` with result `Ready for human review`. The validation maps implementation evidence to accepted PDLC artifacts, records passed Docker validation, identifies missing host-native and CI checks, and keeps human acceptance pending.

## Context and Orientation

This repository now contains The Deep Vault browser MVP runtime under `src/`, executable tests under `tests/` and beside source files, and package manager plus container tooling at the repository root. The PDLC artifacts under `spec/` remain the source of truth for scope, rationale, validation, and follow-up work.

The source requirement is `spec/requirements/the-deep-vault-text-rpg.md`. It defines a complete choice-based text RPG in Vault-9, starring Tomas Vale, with investigation, evidence, faction trust, resources, branching consequences, and four endings. The complete-game MVP feature is `spec/features/the-deep-vault-complete-game-mvp.md`. The accepted stories in `spec/stories/` cover the playthrough spine, menu choice scene flow, state consequences, evidence/codex/quest records, zone progression, faction and character arcs, side content consequences, route/ending evaluation, save/load continuity, and content-scope mapping.

The accepted architecture lives in `spec/design/the-deep-vault-mvp-game-architecture.md`. The accepted content scope map lives in `spec/design/the-deep-vault-mvp-content-scope-map.md`. The accepted ADRs are:

- `spec/architecture-records/browser-first-react-runtime-for-the-deep-vault-mvp.md`
- `spec/architecture-records/docker-and-dev-containers-for-implementation.md`
- `spec/architecture-records/data-driven-narrative-content-and-state-model.md`
- `spec/architecture-records/no-server-side-database-for-mvp.md`
- `spec/architecture-records/local-first-save-and-load-persistence.md`
- `spec/architecture-records/cloudflare-pages-static-hosting-for-mvp.md`

The implementation must respect the nested source guidance in `src/AGENTS.md` for The Deep Vault browser MVP.

Plain-language definitions used in this plan:

- A scene is one playable text moment with a stable id, title, location or zone, narrative text, and menu choices.
- A choice is a selectable menu option that may require state, apply effects, and move the player to another scene or ending.
- Game state is the serializable object that remembers current scene, selected choices, flags, trust, character states, records, resources, and route progress.
- A condition is a rule that decides whether content or a choice is available, such as "the player has the raw sensor spool."
- An effect is a deterministic state change caused by a choice, such as "add evidence" or "increase trust_keepers."
- A route fixture is a scripted automated scenario that starts a new game, chooses a known sequence of options, and proves a specific ending can be reached.
- Content graph validation is an automated check that all scene ids, choice targets, conditions, effects, records, and endings are valid and reachable where required.

## Plan of Work

The work should happen in milestones that produce independently verifiable progress. Do not start implementation until a human approves this ExecPlan. Once approved, create or switch to a feature branch before edits unless the human explicitly instructs otherwise.

Milestone 1 creates the implementation foundation. Add package manager and app scaffolding with Node.js 24 LTS, pnpm, Vite, React, TypeScript, TailwindCSS, Vitest, Testing Library, Playwright, ESLint, Prettier if chosen by the implementation agent, Docker, Docker Compose if useful, and a Dev Container. Update `README.md`, `AGENTS.md`, `src/AGENTS.md`, and `tests/README.md` with exact commands. At the end of the milestone, `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm test`, and a placeholder `pnpm test:e2e` command should be documented and runnable. If Playwright browser installation needs network access, request permission rather than bypassing the approval flow.

Milestone 2 builds the game model and validation foundation before the UI depends on it. Add `src/game/types.ts`, `src/game/schemas.ts`, `src/game/initialState.ts`, `src/game/conditions.ts`, `src/game/effects.ts`, `src/game/engine.ts`, `src/game/selectors.ts`, `src/game/routeEvaluator.ts`, `src/game/saveLoad.ts`, and `src/game/contentGraph.ts`. These modules define state, content records, schema validation, condition evaluation, effect application, scene transition, route evaluation, and localStorage persistence. Unit tests should prove that a choice can update state, invalid content is rejected, route conditions are deterministic, and save/load preserves state.

Milestone 3 creates the first playable vertical path through the engine without claiming the full MVP is done. Add `src/content/` modules for world metadata, records, scenes, choices, endings, side content, and route fixtures. Include enough content to start at `P1. Survival Notice`, make choices through the opening maintenance failure, collect B-17 evidence, and reach at least one temporary test ending. Add tests that validate the content graph and simulate this path. This is not a product scope reduction; it is a proving step for the complete-game MVP.

Milestone 4 implements the React player interface. Add `src/main.tsx`, `src/App.tsx`, `src/components/SceneView.tsx`, `src/components/ChoiceList.tsx`, `src/components/RecordsPanel.tsx`, `src/components/SaveLoadControls.tsx`, `src/components/StatusSummary.tsx`, and supporting styles. The first screen should be the game experience, not a landing page. A player should see story text, menu choices, concise status feedback, records, and save/load controls. The UI should be keyboard accessible at MVP depth and should not require free-text parser input. Add React component tests for scene rendering, unavailable choices, record display, and save/load controls.

Milestone 5 fills the full MVP content scope at MVP depth. Implement all 22 main scenes, all 8 side quests, all 4 endings, all 10 major NPCs, all 20 locations, all 12 key items, core flags, 4 trust systems, character states, and resources classified in `spec/design/the-deep-vault-mvp-content-scope-map.md`. The prose can be lean, but every mandatory item must exist and matter. Each main reveal must add evidence, pressure, route context, or a meaningful choice. Each side quest must affect trust, evidence, resources, pressure, character state, route context, or ending variant. Add content graph tests that fail on missing mandatory content.

Milestone 6 implements full route commitment, ending evaluation, and save/load continuity. The player must be able to reach controlled truth, full exposure, preserve order, and exit protocol through deterministic route fixtures. The route evaluator must use accumulated evidence, faction trust, character states, pressure, resources, public stability, and route-specific flags. Save/load must preserve current scene, choice history, records, trust, character states, resources, route progress, side-content outcomes, and save metadata. Tests must cover missing saves, malformed saves, incompatible versions, and successful round trips.

Milestone 7 adds end-to-end browser validation and screenshots. Add Playwright tests under `tests/e2e/` that start the app, begin a new game, make menu choices, inspect records, save and load, and reach all four endings through approved fixtures. Include at least one desktop and one mobile viewport check. Because this is a text RPG, screenshot evidence should focus on readable scene text, visible choices, records, and ending summaries. Playwright tests should verify that the primary UI is nonblank, interactive, keyboard-navigable at MVP depth, and not dependent on free-text input.

Milestone 8 updates validation and release-preparation artifacts. Use the `validation-review` skill after implementation to create or update validation evidence under `spec/validation/`. Map evidence back to the accepted requirement, feature, stories, designs, ADRs, and this ExecPlan. Record passed, failed, skipped, unavailable, manual, and future-gate checks. Do not mark validation accepted or release-ready without explicit human approval.

## Concrete Steps

Before implementation, confirm the working tree and branch:

    cd /Users/macg/Code/the-deep-vault_v1
    git status --short
    git checkout -b codex/deep-vault-complete-game-mvp

If the branch already exists, switch to it instead of creating a duplicate branch. Do not discard uncommitted user changes.

For Milestone 1, add or update these files:

- `package.json`
- `pnpm-lock.yaml`
- `.nvmrc`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `index.html`
- `.gitignore`
- `.devcontainer/devcontainer.json`
- `.devcontainer/Dockerfile`
- `docker-compose.yml` if Compose is used
- `README.md`
- `AGENTS.md`
- `src/AGENTS.md`
- `tests/README.md`

Expected package scripts:

    pnpm dev
    pnpm build
    pnpm lint
    pnpm test
    pnpm test:unit
    pnpm test:content
    pnpm test:e2e
    pnpm validate

`pnpm validate` should eventually run lint, unit tests, content validation, build, and Playwright tests. During early milestones it may run only the checks that exist, but update it as each validation layer is added.

For Milestone 2, create the core modules:

- `src/game/types.ts`
- `src/game/schemas.ts`
- `src/game/initialState.ts`
- `src/game/conditions.ts`
- `src/game/effects.ts`
- `src/game/engine.ts`
- `src/game/selectors.ts`
- `src/game/routeEvaluator.ts`
- `src/game/saveLoad.ts`
- `src/game/contentGraph.ts`
- `src/game/fixtures.ts` if route fixture helpers are useful

Required exported interfaces and functions should include stable names close to these:

    export interface GameState { ... }
    export interface Scene { ... }
    export interface Choice { ... }
    export interface Condition { ... }
    export interface Effect { ... }
    export interface EvidenceEntry { ... }
    export interface QuestEntry { ... }
    export interface CodexEntry { ... }
    export interface Ending { ... }

    export function createInitialState(): GameState
    export function getCurrentScene(content: GameContent, state: GameState): Scene
    export function getAvailableChoices(scene: Scene, state: GameState): Choice[]
    export function applyChoice(content: GameContent, state: GameState, choiceId: string): GameState
    export function evaluateCondition(condition: Condition, state: GameState): boolean
    export function applyEffect(state: GameState, effect: Effect): GameState
    export function evaluateEnding(content: GameContent, state: GameState): EndingResult
    export function saveGame(state: GameState): SaveResult
    export function loadGame(): LoadResult
    export function validateContentGraph(content: GameContent): ValidationResult

Use immutable updates for game state: each function should return a new state object rather than mutating the old object in place. This makes tests and save/load behavior easier to reason about.

For Milestone 3 and Milestone 5, organize content under:

- `src/content/index.ts`
- `src/content/world.ts`
- `src/content/scenes.ts`
- `src/content/records.ts`
- `src/content/characters.ts`
- `src/content/factions.ts`
- `src/content/items.ts`
- `src/content/endings.ts`
- `src/content/sideQuests.ts`
- `src/content/routeFixtures.ts`
- `src/content/mvpScope.ts`

The content modules must include stable ids matching or clearly derived from the accepted scope map. Examples: `scene.p1.survival-notice`, `scene.a1.pressure-fault`, `ending.controlled-truth`, `evidence.found-b17`, `quest.s1.cold-hands-clinic`, and `faction.keepers`.

For Milestone 4, create the UI modules:

- `src/main.tsx`
- `src/App.tsx`
- `src/styles.css`
- `src/components/SceneView.tsx`
- `src/components/ChoiceList.tsx`
- `src/components/RecordsPanel.tsx`
- `src/components/SaveLoadControls.tsx`
- `src/components/StatusSummary.tsx`
- `src/components/EndingView.tsx`
- `src/components/DebugStatePanel.tsx` only if approved or kept test-only

Do not build a marketing landing page. The first screen should let the player start or continue the game and immediately see the narrative interface.

For Milestones 6 and 7, add tests and fixtures:

- `src/game/*.test.ts` for unit tests
- `src/content/*.test.ts` or `tests/content/*.test.ts` for content graph validation
- `tests/e2e/deep-vault-flow.spec.ts` for Playwright scene and record flow
- `tests/e2e/deep-vault-endings.spec.ts` for ending reachability
- `tests/e2e/deep-vault-save-load.spec.ts` for localStorage save/load behavior

Expected validation commands as the implementation matures:

    cd /Users/macg/Code/the-deep-vault_v1
    pnpm install --frozen-lockfile
    pnpm lint
    pnpm test:unit
    pnpm test:content
    pnpm build
    pnpm test:e2e
    pnpm validate

If using Docker or the Dev Container, equivalent commands should run inside the container. For example:

    docker compose run --rm workspace pnpm install --frozen-lockfile
    docker compose run --rm workspace pnpm validate

Only include the Compose command if `docker-compose.yml` is implemented with a `workspace` service.

## Validation and Acceptance

Validation must prove behavior, not just file presence.

Milestone 1 is accepted when a clean checkout can install dependencies, start the Vite dev server, run lint, run a placeholder or initial unit test suite, build static assets into `dist`, and run documented commands either host-native or inside the Dev Container. The expected observable result is that `pnpm build` creates a `dist/` directory and the app can be opened locally through the dev server.

Milestone 2 is accepted when unit tests prove that content schemas reject invalid content, conditions evaluate deterministically, effects update state, scene transitions work, route evaluation is deterministic, and save/load serializes and restores state.

Milestone 3 is accepted when a scripted test can start at the opening scene, select menu choices, add B-17 evidence, update state, and reach a temporary test ending or milestone endpoint through the engine.

Milestone 4 is accepted when a human can run `pnpm dev`, open the local URL printed by Vite, see the playable narrative interface, select choices with mouse and keyboard, open records, and see save/load controls. Component tests should verify the same behavior without relying only on manual inspection.

Milestone 5 is accepted when content validation proves that all 22 main scenes, 8 side quests, 10 major NPCs, 20 locations, 12 key items, core flags, 4 trust systems, resources, and 4 endings from the accepted content scope map are present at MVP depth. Each mandatory side quest must have at least one observable consequence.

Milestone 6 is accepted when route fixture tests can reach all four endings and compare observable outcome differences. Save/load tests must prove that a saved game can resume with current scene, records, choices, trust, character states, resources, route progress, and ending consequences intact.

Milestone 7 is accepted when Playwright tests pass for core browser flows, records, save/load, and four ending reachability. At least one screenshot or trace should be captured as validation evidence if useful for human review.

Milestone 8 is accepted when a validation artifact under `spec/validation/` records evidence for all accepted requirement, feature, story, design, ADR, and ExecPlan criteria. Validation may recommend readiness, but only a human may accept implementation completion or approve release readiness.

The full ExecPlan is accepted as implemented only when:

- `pnpm validate` passes in the documented environment.
- `pnpm build` produces static `dist` output.
- Playwright can reach all four endings.
- The browser UI supports menu-only play, records, local save/load, and ending summaries.
- Validation evidence is recorded under `spec/validation/`.
- No backend, server-side database, Cloudflare Worker, Pages Function, D1, KV, R2, Durable Object, account system, cloud save, telemetry, multiplayer, procedural content generation, AI-generated prose, combat-first mechanics, or extra ending route has been introduced.

## Idempotence and Recovery

Most implementation steps are additive and can be retried. If dependency installation fails because of network or sandbox restrictions, rerun the same command with the required approval rather than changing package choices silently. If the Dev Container setup fails, keep host-native commands working while fixing container configuration.

Do not use destructive git commands such as `git reset --hard` or `git checkout --` to recover unless the human explicitly asks. If generated files or dependency directories appear, keep them out of version control through `.gitignore` unless they are required committed artifacts such as `pnpm-lock.yaml`.

If a milestone partially succeeds, update the `Progress` section before stopping. Record any unexpected issue in `Surprises & Discoveries` with evidence. If an architecture decision needs to change, stop and return to solution design or ADR update rather than silently changing implementation direction.

If content implementation becomes too large, do not reduce the MVP to a vertical slice. Instead, keep the complete-game MVP target and split the implementation into internal milestones while preserving mandatory content from `spec/design/the-deep-vault-mvp-content-scope-map.md`.

## Interfaces and Dependencies

Use these dependencies unless implementation discovers a concrete blocker that requires returning to design:

- React for browser UI.
- TypeScript for source, content modules, and type contracts.
- Vite for local dev server and static build.
- TailwindCSS for styling.
- pnpm for package management and lockfile.
- Node.js 24 LTS for runtime tooling.
- Vitest for unit and content tests.
- React Testing Library for component tests.
- Playwright for browser end-to-end tests.
- Zod or an equivalent TypeScript-first schema validator for content and save payload validation.
- Docker and Dev Containers for reproducible implementation environment.
- Cloudflare Pages static hosting with `pnpm build` and `dist` output.

No server runtime or database dependency is part of the MVP.

The `GameState` interface must include fields for current scene or checkpoint, visited scenes, selected choices, progress flags, faction trust, character states, evidence records, quest records, codex records, stress, supplies, clearance, evidence count, route progress, final route, public stability or riot level, side content outcomes, and save metadata.

The `GameContent` interface must include scenes, endings, evidence definitions, quest definitions, codex definitions, locations, factions, characters, items, side quests, and route fixtures.

The effect vocabulary must support at least: set flag, add evidence, add or update quest, add codex entry, adjust faction trust, set character state, adjust stress, adjust supplies, set clearance, adjust public stability or riot level, set side quest outcome, set route tendency, set final route, and move to scene.

The condition vocabulary must support at least: has evidence, flag equals value, faction trust threshold, character state equals value, resource threshold, route selected, side quest outcome, current scene visited, item acquired, and boolean combinations such as all-of or any-of.

The save payload must include a version string or number. Loading must validate the payload before using it. Invalid or incompatible saves must produce player-facing feedback instead of crashing.

## Artifacts and Notes

Source artifacts used to create this plan:

- `spec/requirements/the-deep-vault-text-rpg.md`
- `spec/requirements/notes.md`
- `spec/features/the-deep-vault-complete-game-mvp.md`
- `spec/stories/mvp-playthrough-spine.md`
- `spec/stories/menu-choice-scene-flow.md`
- `spec/stories/story-state-choice-consequences.md`
- `spec/stories/evidence-codex-and-quest-records.md`
- `spec/stories/vault-zones-access-progression.md`
- `spec/stories/faction-trust-and-character-arcs.md`
- `spec/stories/mvp-side-content-consequences.md`
- `spec/stories/route-commitment-and-ending-evaluation.md`
- `spec/stories/save-load-playthrough-continuity.md`
- `spec/stories/mvp-content-scope-and-deferral-map.md`
- `spec/design/the-deep-vault-mvp-game-architecture.md`
- `spec/design/the-deep-vault-mvp-content-scope-map.md`
- `spec/architecture-records/browser-first-react-runtime-for-the-deep-vault-mvp.md`
- `spec/architecture-records/docker-and-dev-containers-for-implementation.md`
- `spec/architecture-records/data-driven-narrative-content-and-state-model.md`
- `spec/architecture-records/no-server-side-database-for-mvp.md`
- `spec/architecture-records/local-first-save-and-load-persistence.md`
- `spec/architecture-records/cloudflare-pages-static-hosting-for-mvp.md`
- `spec/validation/the-deep-vault-mvp-design-validation.md`

Current repository facts:

- There is no committed package manager, build system, product runtime, Dockerfile, Dev Container, or executable test command.
- `src/` currently contains only `README.md` and `AGENTS.md`.
- `tests/` currently contains only `README.md`.
- The next implementation agent must update this ExecPlan as a living document while working.

Plan authoring note, 2026-04-13: This ExecPlan was created to move the accepted design package into implementation planning. It intentionally does not create source code, tests, Docker, Dev Container, package, or CI/CD files because implementation has not yet been explicitly approved.
