# Lifecycle Retrospective: Subagent Usage During PDLC Workflow

## Status

Draft

## Scope

This retrospective reviews process feedback raised during The Deep Vault complete-game MVP PDLC workflow: Codex did not consistently execute or record advisory subagent reviews across later PDLC stages.

This is a workflow and governance retrospective. It does not re-open product scope, implementation acceptance, validation acceptance, release approval, merge, deployment, tag, announcement, or lifecycle completion.

## Source Artifacts

- Repository guidance: `AGENTS.md`
- Requirements: `spec/requirements/the-deep-vault-text-rpg.md`
- Feature: `spec/features/the-deep-vault-complete-game-mvp.md`
- Stories: `spec/stories/`
- Designs: `spec/design/the-deep-vault-mvp-game-architecture.md`, `spec/design/the-deep-vault-mvp-content-scope-map.md`
- ADRs: `spec/architecture-records/`
- ExecPlan: `spec/plans/the-deep-vault-complete-game-mvp-implementation.md`
- Design validation: `spec/validation/the-deep-vault-mvp-design-validation.md`
- Implementation validation: `spec/validation/the-deep-vault-complete-game-mvp-implementation-validation.md`
- Release readiness: `spec/release-readiness/the-deep-vault-complete-game-mvp-release-readiness.md`
- Pre-release retrospective: `spec/lifecycle/the-deep-vault-mvp-pre-release-retrospective.md`

## Expected Outcomes

- When the human explicitly asks for subagents, delegation, or parallel agent work, Codex should consider using relevant read-only reviewer subagents after PDLC artifacts exist.
- Subagent reviews should remain advisory. They may draft findings, identify risks, and recommend readiness, but they cannot approve, accept, reject, merge, release, deploy, or close checkpoints.
- If subagents are not used after explicit permission or request, the workflow should record why they were skipped so the decision is visible.
- Validation and release-readiness evidence should distinguish human approval state from advisory automated, Codex, and subagent review evidence.

## Observed Outcomes

- The repository guidance permits Codex subagents only when the human explicitly asks for subagents, delegation, or parallel agent work.
- The human previously asked to review architecture and use subagents if needed. Design validation did record architecture and validation subagent review findings, so subagents were not absent from the whole PDLC workflow.
- Later implementation validation, release-readiness, and lifecycle artifacts recorded automated and Codex-authored evidence, but did not include a subagent-review consideration field for implementation, security, quality, validation-gate, release-readiness, or lifecycle-learning review.
- The durable record is therefore incomplete: it shows design-stage subagent use, but not consistent later-stage subagent consideration, usage, or skip reasons.
- The human noticed and reported the gap during lifecycle retrospective feedback.

## Evidence

- Evidence: Human feedback: "I noticed that you are not executing subagents during PDLC workflow."
  Source: User message on 2026-04-14 during lifecycle retrospective.

- Evidence: Repository guidance allows subagents only when explicitly asked and lists preferred reviewer subagents after PDLC artifacts exist.
  Source: `AGENTS.md`

- Evidence: Design validation recorded architecture and validation subagent review findings and noted that identified gaps were addressed.
  Source: `spec/validation/the-deep-vault-mvp-design-validation.md`

- Evidence: Existing implementation validation and release-readiness artifacts record local Docker validation, unavailable CI, unavailable host-native checks, pending release decisions, and human approval boundaries, but no later-stage subagent review evidence.
  Source: `spec/validation/the-deep-vault-complete-game-mvp-implementation-validation.md`, `spec/release-readiness/the-deep-vault-complete-game-mvp-release-readiness.md`

- Evidence: Existing lifecycle retrospective records validation, release-readiness, CI, dependency audit, narrative review, and deployment setup learnings, but not subagent workflow learning.
  Source: `spec/lifecycle/the-deep-vault-mvp-pre-release-retrospective.md`

- Evidence: Read-only lifecycle and validation-gate reviewer subagents both classified this as a process-quality gap and recommended explicit subagent review evidence or skip reasons in validation and release-readiness artifacts.
  Source: `lifecycle_learning_reviewer` and `validation_gate_reviewer` advisory reviews on 2026-04-14.

## Confirmed Assumptions

- Subagents are permitted in this repository only when the human explicitly asks for subagents, delegation, or parallel agent work.
- Subagent findings are advisory evidence and do not replace human approval.
- Reviewer subagents are most useful after artifacts exist because they can check traceability, risk, and readiness against concrete requirements, designs, plans, implementation, and validation evidence.

## Disproven or Risky Assumptions

- Assumption: Main-agent review plus passing validation is sufficient to satisfy all PDLC review expectations after design approval.
  Status: Risky. The human expected visible subagent execution or at least explicit subagent consideration when permission was granted, especially for later implementation, security, quality, validation, and release-readiness checkpoints.

- Assumption: "Use subagents if needed" can be treated as optional without recording a decision.
  Status: Risky. It grants permission and creates a review expectation that should be handled visibly.

- Assumption: Existing implementation validation and release-readiness artifacts capture all important workflow review evidence.
  Status: Incomplete. They do not currently capture whether requested later-stage subagent review happened, was skipped, or produced findings.

## Lessons Learned

The workflow needs a visible subagent consideration checkpoint whenever the human grants subagent permission. The checkpoint should say whether subagents were used, which reviewer roles were used, what they found, or why they were skipped.

Design validation already demonstrates the intended pattern: subagent findings can be captured as advisory review evidence, gaps can be addressed, and human approval can remain separate. Later PDLC stages should follow the same pattern instead of relying only on main-agent review and automated test evidence.

Subagent use should be aligned to PDLC stage rather than applied generically:

- Product and scope review: `product_coherence_reviewer`
- Solution design and ADR review: `architecture_decision_reviewer`
- ExecPlan readiness review: `execution_plan_reviewer`
- Implementation review: `implementation_reviewer`
- Security and privacy review: `security_reviewer`
- Code quality and test hygiene review: `quality_gate_reviewer`
- Validation gate review: `validation_gate_reviewer`
- Release readiness review: `release_readiness_reviewer`
- Lifecycle learning review: `lifecycle_learning_reviewer`

This retrospective pass used `lifecycle_learning_reviewer` and `validation_gate_reviewer` to turn the feedback into recorded lifecycle learning.

## Follow-Up Recommendations

- Requirements: No product requirement change is needed unless the human wants subagent governance to become a formal workflow requirement for this repository template.
- Features: No game feature scope change is needed.
- Stories: No MVP gameplay story change is needed.
- Design / ADRs: Add a process note or ADR only if the repository should formalize subagent review as part of the PDLC architecture.
- Plans: Add a "Subagent consideration" line to future ExecPlan milestones when the human grants permission for subagents.
- Implementation: If the human wants a retroactive review of the current MVP branch, run `implementation_reviewer`, `security_reviewer`, `quality_gate_reviewer`, `validation_gate_reviewer`, and `release_readiness_reviewer`, then record the findings.
- Validation: Add subagent review evidence to validation artifacts when subagents were requested, including reviewer role, status, findings, and unresolved gaps.
- Release Readiness: Add a release-readiness check for requested advisory subagent reviews before recommending a human release decision.
- Process / Operations: Update workflow guidance or templates to require one visible statement when subagents are allowed: `Subagent consideration: used / skipped / not requested`, with the reason and evidence location.

## Human Checkpoint

Human decision is needed on whether to:

- Record this as accepted lifecycle feedback.
- Run retroactive advisory subagent reviews over the current MVP implementation and release-readiness evidence.
- Update templates, skills, or `AGENTS.md` so future PDLC workflows always record subagent consideration when permission is granted.

Only a human may approve the lifecycle learning, require process changes, accept retroactive review findings, or mark follow-up complete.
