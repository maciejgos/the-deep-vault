# Validation: The Deep Vault Background Music

## Status

Draft

## Scope

This validation record covers the `codex/add-background-music` branch diff that adds optional background music to The Deep Vault browser MVP.

Validated scope includes:

- A player-controlled ambient music panel in the browser UI.
- Original Web Audio soundscape generation for a low, tense vault atmosphere, revised after user feedback to be audible on ordinary speakers.
- Scene-sensitive ambience intensity without adding backend, telemetry, cloud save, external media, or new runtime dependencies.
- Component and application regression coverage for the audio-control fallback state.

Out of scope:

- Final human acceptance of music taste, mix, volume, or pacing.
- Production deployment.
- Release tag or merge approval.

## Source Artifacts

- Accepted requirement: [the-deep-vault-text-rpg.md](../requirements/the-deep-vault-text-rpg.md)
- Feature: [the-deep-vault-complete-game-mvp.md](../features/the-deep-vault-complete-game-mvp.md)
- Design: [the-deep-vault-mvp-game-architecture.md](../design/the-deep-vault-mvp-game-architecture.md)
- ExecPlan baseline: [the-deep-vault-complete-game-mvp-implementation.md](../plans/the-deep-vault-complete-game-mvp-implementation.md)
- Implementation paths:
  - `src/App.tsx`
  - `src/components/AmbientAudioControl.tsx`
  - `src/styles.css`
  - `src/App.test.tsx`

## Subagent Review Evidence

- PDLC step: Implementation execution and validation review
- Trigger: Background music implementation diff and draft validation artifact created before human checkpoint.
- Required `.codex/agents` reviewers: `implementation_reviewer`, `security_reviewer`, `quality_gate_reviewer`, `validation_gate_reviewer`
- Review status: unavailable
- Findings summary: Advisory reviewer subagents did not run. Local review found no dependency, network, storage, backend, telemetry, or cloud-save expansion. Automated lint, typecheck, unit tests, and production build passed through available host and Docker checks.
- Evidence path: This artifact; command outputs from the current Codex thread.
- Unresolved gaps: Required advisory reviewer coverage is unavailable; human music/aesthetic review is not recorded; Playwright browser evidence for actually hearing audio is not recorded because audible output is a manual sensory check.
- Human decision state: Pending.
- Reason if skipped or unavailable: Current Codex tool policy permits spawning subagents only when the user explicitly asks for subagents, delegation, or parallel agent work. The implementation request did not include explicit subagent authorization.
- Impact on confidence: Automated confidence is good for build/test regressions, but process confidence is reduced because required advisory implementation, security, quality, and validation reviewers did not run.
- Human decision required?: Yes. Explicit human acknowledgment is required before treating missing advisory review coverage as acceptable.

Subagent findings are advisory evidence only. They do not approve validation.

## Preconditions

- Work occurs on feature branch `codex/add-background-music`.
- The app remains a static Vite/React browser MVP.
- Audio playback is user-initiated because browsers block autoplay and players need a clear mute path.
- Docker workspace is available for reproducible unit/build validation.

## Acceptance Criteria Mapping

- Criterion: Add background music appropriate to The Deep Vault.
  Evidence status: Partially Supported.
  Evidence: `src/components/AmbientAudioControl.tsx` generates an original ambient loop using audible low-mid drones, filtered tones, stereo motion, a short start signal, a volume control, and scene-sensitive intensity. Human review is still needed to judge taste and fit.

- Criterion: Preserve player control and browser compatibility.
  Evidence status: Supported.
  Evidence: The UI requires a `Start ambience` click, exposes a `Mute` state and volume slider, uses `aria-pressed`, disables the control when Web Audio is unavailable, and cleans up the `AudioContext` on unmount.

- Criterion: Avoid architectural scope expansion.
  Evidence status: Supported.
  Evidence: The change adds no backend, account, telemetry, storage, network call, dependency, external audio file, or cloud service.

- Criterion: Existing game behavior remains playable.
  Evidence status: Supported.
  Evidence: `docker compose run --rm workspace pnpm test:unit` passed with 27 tests, `docker compose run --rm workspace pnpm build` passed, and `docker compose run --rm workspace pnpm test:e2e` passed with 12 browser tests.

## Checks

- Check: `node_modules/.bin/eslint .`
  Type: Automated
  Status: Passed
  Expected result: ESLint completes without reported issues.
  Actual result: Passed on 2026-04-30.

- Check: `node_modules/.bin/tsc --noEmit`
  Type: Automated
  Status: Passed
  Expected result: TypeScript completes without type errors.
  Actual result: Passed on 2026-04-30 after tightening the Web Audio browser-window type.

- Check: `docker compose run --rm workspace pnpm test:unit`
  Type: Automated
  Status: Passed
  Expected result: Unit, app, and content tests pass.
  Actual result: Passed on 2026-04-30; 27 tests passed across 3 files.

- Check: `docker compose run --rm workspace pnpm build`
  Type: Automated
  Status: Passed
  Expected result: TypeScript typecheck and Vite production build succeed.
  Actual result: Passed on 2026-04-30.

- Check: `docker compose run --rm workspace pnpm test:e2e`
  Type: UI
  Status: Passed
  Expected result: Browser smoke, route endings, save/load, and ambience-control visibility pass on desktop and mobile.
  Actual result: Passed on 2026-04-30; 12 Playwright tests passed.

- Check: Host `pnpm test:unit` and `pnpm lint`
  Type: Automated
  Status: Unavailable
  Expected result: Host package scripts run from the committed lockfile.
  Actual result: Host shell reported `pnpm: command not found`.

- Check: Host `node_modules/.bin/vitest run`
  Type: Automated
  Status: Unavailable
  Expected result: Vitest runs locally.
  Actual result: Vitest could not start because the local host `node_modules` is missing Rollup optional package `@rollup/rollup-darwin-arm64`; Docker validation succeeded instead.

- Check: Manual audio fit review
  Type: Manual
  Status: Missing
  Expected result: Human reviewer starts the ambience in a real browser and confirms volume, mood, looping, and mute behavior feel appropriate.
  Actual result: Not yet recorded.

## Evidence

- Lint: `node_modules/.bin/eslint .` passed.
- Typecheck: `node_modules/.bin/tsc --noEmit` passed.
- Unit tests: `docker compose run --rm workspace pnpm test:unit` passed with 27 tests.
- Build: `docker compose run --rm workspace pnpm build` passed and produced `dist/`.
- E2E: `docker compose run --rm workspace pnpm test:e2e` passed with 12 browser tests.
- UI fallback coverage: `src/App.test.tsx` verifies the opening scene still renders and the ambience control is disabled with `Audio unavailable.` when Web Audio is absent in the test environment.
- Browser UI coverage: `tests/e2e/app-smoke.spec.ts` verifies `Start ambience` is visible on the playable first screen.
- User feedback response: The first mix was reported inaudible. The revised mix raises gain, shifts the drone root from near-sub-bass into low-mid frequencies, opens the filter, adds a short audible start signal, and exposes volume control.

## Missing, Skipped, or Unavailable Checks

- Check: Human audio review
  Reason: Automated tests cannot confirm whether generated music feels right to a player.
  Risk: The feature is technically present, but mood, fatigue, loudness, and musical fit require human judgment.

- Check: Required subagent reviewers
  Reason: Tool policy requires explicit user authorization before spawning subagents; no such authorization was provided in the implementation request.
  Risk: Advisory process coverage is incomplete. Human acknowledgment is required before moving toward acceptance or release readiness.

- Check: Full Playwright interaction with audible output
  Reason: Playwright can click UI controls but cannot validate subjective audio output.
  Risk: Browser UI behavior has unit/build/e2e coverage, but audible playback should be checked manually in a real browser.

## Future CI/CD or Lifecycle Gates

- Gate: Browser audio smoke test
  Trigger: UI or audio-control changes.
  Blocks: Human acceptance when the ambience control cannot start, mute, or cleanly fall back in a browser.

- Gate: Manual sensory review checklist
  Trigger: New music, sound, animation, or atmosphere changes.
  Blocks: Release readiness when human fit, fatigue, and accessibility review is missing.

- Gate: Dependency and architecture scope check
  Trigger: Any future media/audio implementation change.
  Blocks: Merge when external media services, telemetry, backend storage, or new dependencies are introduced without design/ADR review.

- Gate: Required subagent review coverage
  Trigger: Validation artifact created or updated.
  Blocks: `Result = Ready for human review` when required reviewer coverage is missing, skipped, or unavailable without explicit human acknowledgment.

## Result

Pending

Automated validation passed, but validation remains pending until human audio review and missing advisory reviewer coverage are addressed or explicitly acknowledged.

## Follow-Up

- Start the app in a real browser and review the ambience volume, loop fatigue, mood, and mute behavior.
- Decide whether to ask Codex to run the required advisory reviewer subagents for implementation, security, quality, and validation coverage.
- Consider adding a Playwright UI smoke assertion for the visible ambience control if this feature evolves further.

## Human Decision

Pending

Only a human may approve validation, merge, release, deployment, tag, announcement, or lifecycle completion.
