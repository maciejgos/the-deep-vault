# Release Readiness: The Deep Vault Playability Iteration

## Status

Accepted

## Release Scope

This release-readiness record covers the `codex/improve-game-look-playability` branch diff for The Deep Vault playability iteration.

Release candidate scope:

- Browser UI polish and denser layout.
- Version badge and draft release notes added to the branch diff.
- Route pressure display and richer records/ending summary.
- Choice consequence feedback.
- Early Act I branching.
- Jun and Ilya side-quest resolution choices.
- Route-specific D3 crisis scenes.
- Fixes for side-choice farming, early ending spoilers, final route overwrite, and New Game reset visibility.
- Regression coverage and Playwright validation updates.

Out of scope:

- Production deployment.
- Release tag or GitHub Release publication.
- Cloudflare Pages setup or deployment.
- Backend, database, accounts, telemetry, or cloud saves.
- Any approval to merge, release, deploy, tag, announce, or mark lifecycle complete.

## Source Artifacts

- Raw concept notes: [notes.md](../requirements/notes.md)
- Accepted requirement: [the-deep-vault-text-rpg.md](../requirements/the-deep-vault-text-rpg.md)
- Feature: [the-deep-vault-complete-game-mvp.md](../features/the-deep-vault-complete-game-mvp.md)
- Design: [the-deep-vault-mvp-game-architecture.md](../design/the-deep-vault-mvp-game-architecture.md)
- Design scope map: [the-deep-vault-mvp-content-scope-map.md](../design/the-deep-vault-mvp-content-scope-map.md)
- ExecPlan: [the-deep-vault-complete-game-mvp-implementation.md](../plans/the-deep-vault-complete-game-mvp-implementation.md)
- Branch validation draft: [the-deep-vault-playability-iteration-validation.md](../validation/the-deep-vault-playability-iteration-validation.md)
- Previous MVP release-readiness baseline: [the-deep-vault-complete-game-mvp-release-readiness.md](the-deep-vault-complete-game-mvp-release-readiness.md)
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

## Human Checkpoint State

- Source MVP requirement, feature, stories, design, ADRs, and ExecPlan: Previously accepted for the MVP baseline.
- Playability iteration implementation: Requested by human in conversation.
- Branch validation: Draft and pending human acceptance.
- Release readiness: Draft and pending human decision.
- Merge approval: Pending.
- Release approval: Pending.
- Deployment approval: Pending.
- Tag or announcement approval: Pending.

Required reviewer coverage:

- `release_readiness_reviewer`: Completed advisory review in thread; artifact traceability blocker resolved; readiness remains blocked by pending human approval, missing PR CI, and missing formal manual playthrough evidence.
- `validation_gate_reviewer`: Completed advisory review in thread; requested precise release-notes tracking language, explicit UI assertions, and concrete GitHub Actions gate names.
- `security_reviewer`: Completed advisory review in thread; found no auth, permission, secret, network, or dependency-file risk; requested avoiding client `package.json` exposure and future save-bound hardening.
- `quality_gate_reviewer`: Completed advisory review in thread; requested Voss `shielded` ending ally display and removal of side effects inside the React state updater.
- `implementation_reviewer`: Completed advisory review in thread; found no functional regression and confirmed Docker validation passed; requested tighter approval/process evidence and a playability-iteration plan/update.

Codex has not approved validation, merge, release, deployment, tag, announcement, or lifecycle completion.

## Subagent Review Evidence

- PDLC step: Release readiness
- Trigger: Draft release-readiness artifact created for `codex/improve-game-look-playability` before human checkpoint.
- Required `.codex/agents` reviewers: `release_readiness_reviewer`, `validation_gate_reviewer`, `security_reviewer`, `quality_gate_reviewer`, `implementation_reviewer`
- Review status: completed
- Findings summary: `release_readiness_reviewer` completed and initially found release readiness blocked because branch-specific validation/release artifacts and required reviewer evidence were missing, PR-level CI was unavailable, and manual product review/rollback notes were not recorded. Branch-specific validation/release artifacts and rollback notes now exist. The additional validation, implementation, security, and quality reviewers have now completed. Actionable code/test findings were addressed for version exposure, ending ally display, React state-updater side effects, and UI visibility assertions.
- Evidence path: This artifact; [the-deep-vault-playability-iteration-validation.md](../validation/the-deep-vault-playability-iteration-validation.md); release readiness advisory output in thread from `release_readiness_reviewer`.
- Unresolved gaps: PR-level CI is unavailable; formal human manual playthrough review is not recorded; current changes are uncommitted; save-bound hardening and a scoped ExecPlan addendum remain recommended follow-ups.
- Human decision state: Draft artifact file accepted by human for advisory review; merge, release, deployment, tag, and announcement approval remain pending.
- Reason if skipped or unavailable: Not applicable.
- Release impact: Blocked for release until human approval is recorded and the human decides whether missing PR CI/manual playthrough evidence is acceptable for merge/release.

Subagent findings are advisory evidence only. They do not approve release, merge, deployment, tag, announcement, or lifecycle completion.

## Validation and CI/CD Evidence

- Check: Branch validation artifact
  Status: Draft
  Evidence: [the-deep-vault-playability-iteration-validation.md](../validation/the-deep-vault-playability-iteration-validation.md), pending human validation acceptance.

- Check: `docker compose run --rm workspace pnpm validate`
  Status: Passed
  Evidence: Passed on 2026-04-27. Lint passed, 27 unit/app/content tests passed, production build passed, and 12 Playwright tests passed.

- Check: `pnpm lint`
  Status: Passed
  Evidence: Completed through `pnpm validate` with no reported ESLint issues.

- Check: `pnpm test:unit`
  Status: Passed
  Evidence: Completed through `pnpm validate`; 27 tests passed across engine, content, and component coverage.

- Check: `pnpm test:content`
  Status: Passed
  Evidence: Completed through `pnpm validate`; 10 content validation checks passed.

- Check: `pnpm build`
  Status: Passed
  Evidence: TypeScript typecheck and Vite production build completed through `pnpm validate`.

- Check: `pnpm test:e2e`
  Status: Passed
  Evidence: 12 Playwright tests passed across desktop and mobile, including route endings, save/load continuity, version badge visibility, route pressure visibility, consequence status text, ending report visibility, and preserve-order Voss `shielded` ally display.

- Check: PR-level CI
  Status: Unavailable
  Evidence: Current diff is uncommitted and no PR exists for `codex/improve-game-look-playability`.

- Check: Human manual playthrough review
  Status: Missing
  Evidence: No formal branch-scoped manual playthrough acceptance has been recorded.

- Check: Required advisory reviewer coverage
  Status: Passed
  Evidence: `release_readiness_reviewer`, `validation_gate_reviewer`, `security_reviewer`, `quality_gate_reviewer`, and `implementation_reviewer` completed advisory review in thread on 2026-04-27.

- Check: Host-native validation
  Status: Unavailable
  Evidence: Host `pnpm` is unavailable; Docker validation is the reproducible path used.

## Review Notes

- Product readiness: Automated coverage supports the intended playability changes, but human review is still needed for narrative pacing, route clarity, and player comprehension.
- Architecture readiness: No architecture drift detected. The change stays within browser-first React, TypeScript content/state, TailwindCSS styling, and local-first save/load.
- Security and privacy readiness: No backend, accounts, telemetry, external player data, database, or cloud save were introduced. Browser-local save behavior remains unchanged.
- Quality readiness: Docker-local `pnpm validate` passes. Test coverage was expanded for the playability regressions and new branch content.
- Operational readiness: Static build passes. PR-level CI evidence is missing until the branch is committed and a PR/check run exists.
- Documentation readiness: Draft [RELEASE_NOTES.md](../../RELEASE_NOTES.md) now records the playability iteration in the branch diff, but it remains uncommitted and Draft.

## Risks

- Risk: No PR-level CI evidence exists for this exact diff.
  Release impact: Blocks or requires explicit human acceptance before merge/release.

- Risk: Human narrative/playthrough review is not recorded.
  Release impact: Blocks or requires explicit human acceptance before customer-visible release.

- Risk: Current changes are uncommitted.
  Release impact: Blocks PR CI and merge until committed.

- Risk: No production deployment evidence exists.
  Release impact: Blocks deployment approval, but does not block local validation or a later merge decision if human accepts the risk.

- Risk: Browser localStorage saves remain local-only and versioned as `SAVE_VERSION = "1"`.
  Release impact: Accepted MVP behavior, but should remain visible in player-facing/release expectations if released externally.

- Risk: Crafted localStorage saves can still contain impossible or oversized but schema-shaped state.
  Release impact: Low security risk for a single-player static app; save-bound hardening can become follow-up unless the human raises the release bar.

## Rollback or Recovery

- Source rollback before merge: discard or revise the uncommitted diff on `codex/improve-game-look-playability` only with explicit human instruction.
- Source rollback after commit but before merge: revert the branch commit or abandon the branch.
- Merge rollback after human-approved merge: revert the playability iteration commit range on `main` with explicit human approval.
- Static deployment rollback: redeploy the previous static build or revert the playability iteration commit and rebuild.
- Data rollback: No server-side data, migrations, accounts, cloud saves, telemetry, or external player data exist. Browser `localStorage` saves are local-only; users can clear browser data or start a new game.

## Advisory Readiness State

Blocked

The branch has strong Docker-local validation evidence, completed advisory reviewer coverage, branch-scoped validation/release artifacts, rollback notes, and release notes. Release readiness remains blocked until a human approves validation/release decisions and decides whether missing PR-level CI and formal manual playthrough evidence are acceptable for merge/release.

## Follow-Up

Required or human-accepted before merge/release approval:

- Record human manual playthrough/product review for this playability iteration.
- Commit the branch and obtain PR-level CI evidence if a merge/release decision is desired.
- Human must explicitly approve any merge, release, deployment, tag, or announcement.

Can follow after human-approved merge/release:

- Add deeper divergent route fixtures for skipped side quests and low-support outcomes.
- Add route-specific ending variants based on ally survival, casualty pressure, and evidence integrity.
- Decide whether future release notes should move to `CHANGELOG.md`, GitHub Releases, or both.
- Add save-bound/content-aware hardening for crafted localStorage payloads.
- Add a scoped ExecPlan addendum or progress note for this playability iteration.

## Human Decision

Draft artifact file accepted by human on 2026-04-27 for advisory review. Merge, release, deployment, tag, and announcement approval remain pending.

Only a human may approve merge, release, deployment, tag, announcement, or lifecycle completion.
