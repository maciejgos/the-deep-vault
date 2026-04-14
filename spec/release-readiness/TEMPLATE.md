# Release Readiness: <Short Name>

## Status

Draft

## Release Scope

Describe the story, feature, milestone, branch, pull request, deployment candidate, documentation update, or configuration change being considered for release.

## Source Artifacts

Link to related requirements, features, stories, designs, ADRs, ExecPlans, validation artifacts, implementation changes, or review notes.

## Human Checkpoint State

Summarize which human checkpoints are explicitly approved and which remain pending. Do not treat Codex or subagent readiness judgments as approval.

Include whether all required `.codex/agents` reviewers ran, and list any skipped or unavailable reviewer coverage that needs human acknowledgment before release, deployment, tag, announcement, or lifecycle completion.

## Subagent Review Evidence

- PDLC step: Release readiness
- Trigger: <Draft release-readiness artifact ready for advisory review before human checkpoint>
- Required `.codex/agents` reviewers: `release_readiness_reviewer`; add `validation_gate_reviewer`, `security_reviewer`, `quality_gate_reviewer`, or `implementation_reviewer` when release evidence depends on validation, security, quality, or implementation scope.
- Review status: <pending, running, completed, skipped, or unavailable>
- Findings summary: <Advisory findings; not approval>
- Evidence path: <Link to subagent output, validation note, or review artifact>
- Unresolved gaps: <Open issues or none>
- Human decision state: <Pending unless explicitly approved by a human>
- Reason if skipped or unavailable: <Reason, or Not applicable>
- Release impact: <Blocks release, requires human acceptance, or can become follow-up work>

Subagent findings are advisory evidence only. They may recommend `Blocked`, `Ready with accepted risks`, or `Ready for human release approval`, but they do not approve release, merge, deployment, tag, announcement, or lifecycle completion.

## Validation and CI/CD Evidence

- Check: <Validation, CI/CD, manual, Playwright, security, quality, architecture, or implementation review check>
  Status: <Passed, Failed, Skipped, Unavailable, Manual, or Future Gate>
  Evidence: <Command output summary, CI result, screenshot, review note, or artifact link>

## Review Notes

Summarize security, quality, architecture, implementation, validation, product, or operational review notes that affect the release decision.

## Risks

- Risk: <Product, architecture, security, privacy, data, migration, operational, performance, observability, support, or rollback risk>
  Release impact: <Blocks release, requires human acceptance, or can become follow-up work>

- Risk: Required subagent review missing or unavailable
  Release impact: Blocks release readiness advancement until the reviewer runs or the human explicitly accepts the missing advisory review coverage.

## Rollback or Recovery

Describe the rollback, recovery, or deferral path. If no runtime or deployment exists yet, record why rollback is not applicable.

## Advisory Readiness State

<Ready for human release approval, Ready with accepted risks, Blocked, or Not applicable>

## Follow-Up

List known follow-up work and separate release-blocking work from work that can happen after release.

## Human Decision

Pending

Record the explicit human decision when provided. Do not mark release approved, merged, deployed, tagged, announced, or complete without explicit human approval.
