# Validation: The Deep Vault Playability Iteration

## Status

Accepted

## Scope

This validation record covers the current `codex/improve-game-look-playability` branch diff for The Deep Vault browser MVP playability iteration.

Validated scope includes:

- Playability fixes for side-choice farming, early ending spoilers, final route locking, and consequence visibility.
- UI improvements for denser layout, route pressure, richer records, ending report, save/load controls placement, and version badge.
- Narrative/content improvements from `spec/requirements/notes.md`, including early Act I branching, Jun and Ilya side-quest resolutions, route-specific D3 crisis scenes, and ending summary evidence.
- Regression and route coverage updates in unit, content, component, and Playwright tests.
- Draft release notes in `RELEASE_NOTES.md`.

Out of scope:

- Production deployment.
- Release tag or GitHub Release publication.
- Cloudflare Pages configuration changes.
- Backend, account, telemetry, or cloud-save behavior.

## Source Artifacts

- Raw concept notes: [notes.md](../requirements/notes.md)
- Accepted requirement: [the-deep-vault-text-rpg.md](../requirements/the-deep-vault-text-rpg.md)
- Feature: [the-deep-vault-complete-game-mvp.md](../features/the-deep-vault-complete-game-mvp.md)
- Design: [the-deep-vault-mvp-game-architecture.md](../design/the-deep-vault-mvp-game-architecture.md)
- Design scope map: [the-deep-vault-mvp-content-scope-map.md](../design/the-deep-vault-mvp-content-scope-map.md)
- ExecPlan: [the-deep-vault-complete-game-mvp-implementation.md](../plans/the-deep-vault-complete-game-mvp-implementation.md)
- Previous validation baseline: [the-deep-vault-complete-game-mvp-implementation-validation.md](the-deep-vault-complete-game-mvp-implementation-validation.md)
- Release notes draft: [RELEASE_NOTES.md](../../RELEASE_NOTES.md)
- Implementation paths:
  - `src/App.tsx`
  - `src/components/EndingView.tsx`
  - `src/components/RecordsPanel.tsx`
  - `src/components/RoutePressure.tsx`
  - `src/components/StatusSummary.tsx`
  - `src/content/scenes.ts`
  - `src/content/routeFixtures.ts`
  - `src/game/routeEvaluator.ts`
  - `src/styles.css`
  - `src/App.test.tsx`
  - `src/game/game.test.ts`
  - `tests/content/first-path.test.ts`
  - `tests/e2e/app-smoke.spec.ts`

## Subagent Review Evidence

- PDLC step: Validation review
- Trigger: Draft validation artifact created for `codex/improve-game-look-playability` before human checkpoint.
- Required `.codex/agents` reviewers: `validation_gate_reviewer`, `implementation_reviewer`, `security_reviewer`, `quality_gate_reviewer`
- Review status: completed
- Findings summary: `validation_gate_reviewer` found the release-notes evidence overstated while uncommitted, requested explicit UI readability assertions, and asked for concrete CI/CD gate names. `implementation_reviewer` found no functional regression and confirmed Docker validation passed, but requested clearer approval/process evidence and a playability-iteration plan/update. `security_reviewer` found no auth, permission, secret, network, or dependency-file risk, and recommended avoiding full `package.json` client exposure plus future save-bound hardening. `quality_gate_reviewer` found minor implementation issues around ending ally states and React state-updater side effects. Code/test updates addressed the version exposure, ending ally state, React updater, and UI assertion findings.
- Evidence path: This artifact; release-readiness advisory output in thread from `release_readiness_reviewer`; advisory outputs in thread from `validation_gate_reviewer`, `implementation_reviewer`, `security_reviewer`, and `quality_gate_reviewer`.
- Unresolved gaps: PR-level CI is unavailable until commit/PR; formal manual playthrough review is not recorded; save-bound hardening and a scoped ExecPlan addendum remain recommended follow-ups.
- Human decision state: Draft artifact file accepted by human for advisory review; validation acceptance remains pending.
- Reason if skipped or unavailable: Not applicable.
- Impact on confidence: Automated and advisory review coverage is strong for code behavior; confidence remains limited by missing PR CI and missing formal manual playthrough evidence.
- Human decision required?: Yes, before marking validation accepted or approving merge, release, deployment, tag, announcement, or lifecycle completion.

Subagent findings are advisory evidence only. They do not approve validation.

## Preconditions

- Work occurs on feature branch `codex/improve-game-look-playability`.
- Docker workspace is available for reproducible validation.
- Development server can run at `http://localhost:5173/` for human/browser review.
- Existing MVP source artifacts remain accepted baseline. This playability iteration validation artifact is a Draft evidence record for human review; the implementation is not merged or released.

## Acceptance Criteria Mapping

- Criterion: Side choices cannot be repeatedly clicked to farm rewards or stall progression.
  Evidence status: Supported.
  Evidence: `tests/content/first-path.test.ts` includes side-choice farming regression coverage; `src/content/scenes.ts` adds side completion flags and hides completed resolutions.

- Criterion: Ending outcomes are not revealed before the terminal outcome scene.
  Evidence status: Supported.
  Evidence: `src/game/routeEvaluator.ts` only returns an ending on terminal scenes with a final route; `src/game/game.test.ts` and `tests/content/first-path.test.ts` cover route pressure without ending reveal.

- Criterion: Final route commitment cannot be overwritten at D4.
  Evidence status: Supported.
  Evidence: `src/content/scenes.ts` uses route-conditioned final execution choices; `tests/content/first-path.test.ts` verifies only the committed D4 route remains available.

- Criterion: Player-facing consequences are easier to read during play.
  Evidence status: Supported.
  Evidence: `src/App.tsx` summarizes choice deltas, `src/components/RoutePressure.tsx` shows route drift, `src/components/RecordsPanel.tsx` includes record summaries, and `src/components/EndingView.tsx` adds an ending report.

- Criterion: Concept improvements from `notes.md` should deepen playability without changing the platform or architecture.
  Evidence status: Supported.
  Evidence: Early Act I branching, Jun/Ilya side quest outcomes, and route-specific D3 scenes are implemented in `src/content/scenes.ts`; no backend, database, accounts, telemetry, or cloud save were introduced.

- Criterion: UI remains browser-playable across desktop and mobile.
  Evidence status: Supported.
  Evidence: `docker compose run --rm workspace pnpm validate` passed with 12 Playwright tests across desktop and mobile.

- Criterion: Release notes are prepared for repository tracking.
  Evidence status: Supported.
  Evidence: Draft [RELEASE_NOTES.md](../../RELEASE_NOTES.md) was added at repo root in the current branch diff. It remains pending commit/PR before it is tracked in GitHub.

## Checks

- Check: `docker compose run --rm workspace pnpm validate`
  Type: Automated
  Status: Passed
  Expected result: Lint, unit/content/component tests, production build, and Playwright checks pass.
  Actual result: Passed on 2026-04-27. Lint passed, 27 unit/app/content tests passed, production build passed, and 12 Playwright tests passed.

- Check: `pnpm lint`
  Type: Automated
  Status: Passed
  Expected result: ESLint completes without reported issues.
  Actual result: Passed through `pnpm validate`.

- Check: `pnpm test:unit`
  Type: Automated
  Status: Passed
  Expected result: Engine, content, and component tests pass.
  Actual result: Passed through `pnpm validate`; 27 tests passed across `src/game/game.test.ts`, `tests/content/first-path.test.ts`, and `src/App.test.tsx`.

- Check: `pnpm test:content`
  Type: Automated
  Status: Passed
  Expected result: Content graph, mandatory content records, route fixtures, save/load, and playability regressions pass.
  Actual result: Passed through `pnpm validate`; 10 content validation tests passed.

- Check: `pnpm build`
  Type: Automated
  Status: Passed
  Expected result: TypeScript typecheck and Vite production build succeed.
  Actual result: Passed through `pnpm validate`.

- Check: `pnpm test:e2e`
  Type: UI
  Status: Passed
  Expected result: Browser smoke, route endings, and save/load pass on desktop and mobile.
  Actual result: Passed through `pnpm validate`; 12 Playwright tests passed. Coverage now includes version badge visibility, route pressure heading visibility, consequence status text after the first choice, ending report visibility, and preserve-order Voss `shielded` ending ally display.

- Check: Human manual playthrough review
  Type: Manual
  Status: Missing
  Expected result: Human reviewer confirms narrative pacing, route clarity, version badge visibility, New Game behavior, and content comprehension in the running app.
  Actual result: Not yet recorded for this branch.

- Check: PR-level CI
  Type: Operational
  Status: Unavailable
  Expected result: GitHub Actions validates the committed branch or PR.
  Actual result: No commit or PR exists for the current diff, so branch/PR CI evidence is unavailable.

- Check: Advisory reviewer coverage
  Type: Manual
  Status: Passed
  Expected result: Required implementation, validation gate, security, and quality reviewers run and findings are recorded.
  Actual result: Completed in thread on 2026-04-27. Actionable code/test findings were addressed; remaining gaps are recorded as follow-up or release-readiness risks.

## Evidence

- Latest command: `docker compose run --rm workspace pnpm validate`
- Latest result: Passed on 2026-04-27.
- Automated coverage includes:
  - Side-choice anti-farming coverage.
  - Early Act I branching coverage.
  - Jun and Ilya side quest resolution coverage.
  - Ending spoiler prevention.
  - Final route locking.
  - Route-specific crisis scene routing.
  - Version badge, route pressure visibility, consequence status text, ending report visibility, and preserve-order ending ally visibility.
  - New Game reset.
  - All four route fixtures reaching matching endings.
  - Browser save/load resume and records preservation.

## Missing, Skipped, or Unavailable Checks

- Check: Human narrative/playthrough review
  Reason: User has been inspecting the app, but no formal playthrough acceptance has been recorded.
  Risk: Automated tests now cover visible UI signals, but they still do not prove pacing, comprehension, tone, or player satisfaction.

- Check: PR-level GitHub Actions
  Reason: Current diff is uncommitted and no PR exists.
  Risk: Docker-local validation is strong, but merge/release confidence should include CI evidence before release.

- Check: Host-native `pnpm validate`
  Reason: Host `pnpm` is unavailable in this environment.
  Risk: Low if Docker is the accepted reproducible validation path; record as unavailable.

## Future CI/CD or Lifecycle Gates

- Gate: GitHub Actions `Validate / Lint, Test, Build, and E2E`
  Trigger: Every PR and pre-release branch.
  Blocks: Merge or release when the workflow job fails, is cancelled, or is missing for the target branch/PR.

- Gate: GitHub Actions `Validate / OSV Dependency Scan`
  Trigger: PR opened or updated.
  Blocks: Merge/release when actionable dependency vulnerabilities are reported.

- Gate: GitHub Actions dependency review step in `Validate / Lint, Test, Build, and E2E`
  Trigger: Dependency changes and pre-release checks.
  Blocks: PR merge when dependency review reports moderate-or-higher actionable findings.

- Gate: Manual narrative playthrough checklist
  Trigger: Customer-visible narrative, route, or UI changes.
  Blocks: Human acceptance when pacing/comprehension review is missing.

- Gate: Required subagent review coverage
  Trigger: Validation artifact created or updated.
  Blocks: `Result = Ready for human review` when required reviewer coverage is missing, skipped, or unavailable without explicit human acknowledgment.

## Result

Pending

Automated validation and required advisory reviewer coverage have completed, but validation remains pending until human acceptance is recorded.

## Follow-Up

- Record human manual playthrough review for the playability iteration.
- Commit the branch and open a PR to obtain CI evidence.
- Expand future route fixtures for skipped side quests and low-support outcomes.
- Add save-bound/content-aware hardening for crafted localStorage payloads.
- Add a scoped ExecPlan addendum or progress note for this playability iteration.

## Human Decision

Draft artifact file accepted by human on 2026-04-27 for advisory review. Validation acceptance remains pending.

Only a human may approve advancement to merge/release.
