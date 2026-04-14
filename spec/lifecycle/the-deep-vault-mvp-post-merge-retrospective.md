# Lifecycle Retrospective: The Deep Vault MVP Post-Merge Review

## Status

Draft

## Scope

This retrospective reviews the local merge event for The Deep Vault complete-game MVP after the human instructed Codex to merge the implementation branch into `main`.

The reviewed event is the fast-forward merge of `codex/deep-vault-complete-game-mvp` into `main` at commit `35e818b480f742e5df709534b70e80f11244728d`.

This retrospective covers merge lifecycle evidence only. It does not approve deployment, production release, tag, announcement, incident closure, post-release product acceptance, or lifecycle completion.

## Source Artifacts

- Requirement: `spec/requirements/the-deep-vault-text-rpg.md`
- Feature: `spec/features/the-deep-vault-complete-game-mvp.md`
- Stories: `spec/stories/`
- Designs:
  - `spec/design/the-deep-vault-mvp-game-architecture.md`
  - `spec/design/the-deep-vault-mvp-content-scope-map.md`
- ADRs: `spec/architecture-records/`
- ExecPlan: `spec/plans/the-deep-vault-complete-game-mvp-implementation.md`
- Validation: `spec/validation/the-deep-vault-complete-game-mvp-implementation-validation.md`
- Release readiness: `spec/release-readiness/the-deep-vault-complete-game-mvp-release-readiness.md`
- Pre-release lifecycle retrospective: `spec/lifecycle/the-deep-vault-mvp-pre-release-retrospective.md`
- Subagent workflow retrospective: `spec/lifecycle/subagent-usage-pdlc-feedback-review.md`
- Merge target: `main`
- Merged branch: `codex/deep-vault-complete-game-mvp`

## Expected Outcomes

- Merge should happen only after explicit human instruction.
- `main` should fast-forward cleanly to the validated MVP branch without conflicts or uncommitted work.
- Merge should preserve the accepted validation and release-readiness evidence without treating those advisory artifacts as deployment, tag, announcement, or production release approval.
- Post-merge lifecycle evidence should record remaining release, deployment, CI/CD, security audit, narrative review, and process risks.
- Lifecycle review should use the applicable `.codex/agents` reviewer subagents and record their advisory evidence.

## Observed Outcomes

- Human instructed Codex to merge code.
- `main` fast-forwarded from `9d2e3b3` to `35e818b480f742e5df709534b70e80f11244728d`.
- `main`, `origin/main`, and `codex/deep-vault-complete-game-mvp` point at `35e818b`.
- The working tree is clean after merge.
- No merge conflict occurred.
- The release-readiness artifact still records merge approval as pending, so its decision state is stale relative to the observed merge event.
- The pre-release lifecycle retrospective still says no merge evidence existed, so it is stale relative to the observed merge event.
- The implementation validation artifact remains useful but contains pre-release sequencing language that predates accepted release-readiness and merge.
- Deployment, production release, release tag, announcement, Cloudflare Pages setup, CI workflow, dependency/security audit, and human narrative playthrough review remain unrecorded.
- Lifecycle review used `lifecycle_learning_reviewer` and `release_readiness_reviewer` advisory subagents for the post-merge checkpoint.

## Evidence

- Evidence: Human instructed Codex to merge code.
  Source: User message: "Merge code"

- Evidence: `main` was fast-forwarded to the feature branch.
  Source: `git merge --ff-only codex/deep-vault-complete-game-mvp`

- Evidence: Current branch state after merge.
  Source: `git status --short --branch` returned `## main...origin/main`

- Evidence: Merge target and source branch point at the same commit.
  Source: `git rev-parse main` and `git rev-parse codex/deep-vault-complete-game-mvp` both returned `35e818b480f742e5df709534b70e80f11244728d`

- Evidence: Remote tracking exists after merge.
  Source: `git remote -v` shows `origin` as `https://github.com/maciejgos/the-deep-vault.git`

- Evidence: Release-readiness was accepted before merge but still lists release, merge, deployment, tag, and announcement approval as pending.
  Source: `spec/release-readiness/the-deep-vault-complete-game-mvp-release-readiness.md`

- Evidence: Release-readiness rollback notes mention reverting a merge commit, but the actual merge was a fast-forward with no merge commit.
  Source: `spec/release-readiness/the-deep-vault-complete-game-mvp-release-readiness.md`; `git merge --ff-only codex/deep-vault-complete-game-mvp`

- Evidence: Implementation validation remains accepted and advisory, with Docker validation passed but CI, host-native validation, human narrative review, and dependency/security audit gaps still recorded.
  Source: `spec/validation/the-deep-vault-complete-game-mvp-implementation-validation.md`

- Evidence: Pre-release lifecycle retrospective recorded no merge, deployment, public release, support period, telemetry, incident, or user feedback evidence before this merge event.
  Source: `spec/lifecycle/the-deep-vault-mvp-pre-release-retrospective.md`

- Evidence: Lifecycle reviewer subagent found stale pre-release lifecycle and release-readiness decision state, and release-readiness reviewer subagent found stale merge scope, decision, validation sequencing, and rollback notes.
  Source: Advisory subagent reviews on 2026-04-14.

## Confirmed Assumptions

- The MVP branch could be merged into `main` by fast-forward without conflict.
- The accepted validation and release-readiness evidence was sufficient for the human to approve the merge step.
- Merge approval does not imply deployment, public release, tag, announcement, or lifecycle completion.
- The no-backend, no-server-database, local-only save scope remains unchanged by the merge.

## Disproven or Risky Assumptions

- Assumption: Release-readiness artifacts remain accurate after merge without update.
  Status: Risky. The release-readiness artifact still records merge approval as pending even though the human approved and Codex completed the merge.

- Assumption: Pre-release lifecycle artifacts remain accurate after merge without update or supersession.
  Status: Risky. The pre-release retrospective accurately described the state before merge, but it is no longer the latest lifecycle state after the fast-forward merge.

- Assumption: Merge rollback can always revert a merge commit.
  Status: Disproven for this merge. The merge was a fast-forward, so there is no merge commit to revert. Practical rollback requires reverting the implementation commit range or moving branch refs only with explicit human approval.

- Assumption: Local merge is equivalent to production release.
  Status: Disproven. No deployment, release tag, announcement, Cloudflare Pages project, public usage, telemetry, support feedback, or incident evidence exists.

- Assumption: Docker-local validation is sufficient as an ongoing main-branch protection.
  Status: Risky. No CI workflow is committed to enforce `pnpm validate` on `main` or future pull requests.

- Assumption: Dependency and security risk are covered by the merge.
  Status: Risky. No dependency/security audit gate has been recorded.

- Assumption: Automated route validation proves product quality.
  Status: Risky. Human narrative/playthrough review is still not recorded.

## Lessons Learned

Product learning:

The merge makes the complete-game MVP available on `main`, but product acceptance still needs human playthrough judgment. Automated route and browser tests prove reachability and state continuity, not narrative pacing, tone, or player comprehension.

Technical learning:

The branch merged cleanly because implementation work stayed linear and the target branch had no divergent commits. This reduced merge risk and made rollback simpler.

Validation learning:

Validation evidence was strong enough to support a human merge decision, but it remains local and Docker-based. The next validation improvement should convert the Docker validation chain into CI so `main` is protected after merge.

Release-readiness learning:

Merge changed the lifecycle state, but the release-readiness artifact still says merge is pending. Future release-readiness flow should record the human merge decision and actual merge evidence separately from deployment, tag, and announcement decisions.

Rollback learning:

Fast-forward merges need rollback notes that differ from merge-commit rollbacks. For this history, rollback should be described as reverting the implementation commit range or explicitly approving a branch-ref move; "revert the merge commit" is not accurate.

Security and privacy learning:

The static, local-only architecture still limits data risk after merge. Dependency audit and player-facing local-save caveats remain unclosed release gates.

Process learning:

The post-merge lifecycle step used applicable reviewer subagents, following the new subagent workflow expectation. The artifact chain still needs template/process updates so every PDLC stage automatically records `.codex/agents` reviewer evidence.

## Follow-Up Recommendations

- Requirements: No new game requirement is recommended from the merge event alone. No new user, stakeholder, market, or operational evidence changed the original problem or acceptance criteria.

- Features: No feature boundary change is recommended from merge evidence. Future feature shaping should wait for playthrough feedback or post-release usage signals.

- Stories: Add follow-up stories only if human playthrough review identifies concrete content, route clarity, save/load copy, or UX issues.

- Design / ADRs: No game architecture ADR change is required from the merge. Consider a process ADR only if automated `.codex/agents` reviewer orchestration should become a durable Flow Forge workflow decision.

- Plans: Future ExecPlans should include CI setup and subagent evidence checkpoints before merge readiness, not only after lifecycle feedback.

- Implementation: Add CI workflow for `pnpm install --frozen-lockfile` and `pnpm validate` if `main` should be protected before more work lands. Add dependency/security audit if it is release-blocking.

- Validation: Add a main-branch CI gate for Docker or host validation. Add a validation gate that records required `.codex/agents` reviewer status at every PDLC step.

- Release Readiness: Update or supersede release-readiness evidence so merge is recorded as completed by human instruction, while deployment, production release, tag, announcement, Cloudflare Pages setup, dependency/security audit, and narrative playthrough review remain pending unless separately approved. Update rollback notes for fast-forward merge reality.

- Process / Operations: Update `AGENTS.md`, PDLC templates, and skill guidance so every PDLC step automatically invokes applicable `.codex/agents` reviewers and records a subagent evidence ledger. Add a stale-artifact cleanup checkpoint after merge, deployment, release, or rollback events.

## Human Checkpoint

Human approval is needed to decide:

- Whether this post-merge retrospective scope is accurate.
- Whether to accept merge lifecycle learning as recorded.
- Whether release-readiness evidence should be updated now to record merge completion.
- Whether stale pre-release lifecycle and validation sequencing notes should be updated, superseded, or left as historical artifacts with this post-merge retrospective as the latest state.
- Whether CI, dependency/security audit, narrative playthrough review, or Cloudflare Pages setup should become required before deployment or public release.
- Whether to start the next PDLC loop at release readiness, validation review, implementation execution, execution planning, or process operations.

Only a human may approve lifecycle learning, update release decisions, approve deployment, approve public release, create a release tag, announce the release, or mark lifecycle follow-up complete.
