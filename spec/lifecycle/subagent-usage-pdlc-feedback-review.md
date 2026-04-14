# Lifecycle Retrospective: Subagent Usage During PDLC Workflow

## Status

Draft

## Scope

This retrospective reviews process feedback raised during The Deep Vault complete-game MVP PDLC workflow: Codex did not consistently execute or record advisory subagent reviews across later PDLC stages, and the PDLC process should automate relevant reviewer subagent execution at defined checkpoints.

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

- The PDLC workflow should automatically execute relevant read-only reviewer subagents at defined stage gates once the process has human authorization to use subagents.
- Subagent reviews should remain advisory. They may draft findings, identify risks, and recommend readiness, but they cannot approve, accept, reject, merge, release, deploy, or close checkpoints.
- If a required reviewer subagent cannot be executed, the workflow should record the reviewer role, reason unavailable or skipped, impact on confidence, and whether human approval is needed to proceed despite missing advisory review.
- Validation and release-readiness evidence should distinguish human approval state from advisory automated, Codex, and subagent review evidence.

## Observed Outcomes

- The repository guidance permits Codex subagents only when the human explicitly asks for subagents, delegation, or parallel agent work.
- The human previously asked to review architecture and use subagents if needed. Design validation did record architecture and validation subagent review findings, so subagents were not absent from the whole PDLC workflow.
- Later implementation validation, release-readiness, and lifecycle artifacts recorded automated and Codex-authored evidence, but did not include a subagent-review consideration field for implementation, security, quality, validation-gate, release-readiness, or lifecycle-learning review.
- The durable record is therefore incomplete: it shows design-stage subagent use, but not consistent later-stage subagent consideration, usage, or skip reasons.
- The human noticed and reported the gap during lifecycle retrospective feedback.
- The human clarified that subagents should be executed automatically by the process, not depend on the human remembering to ask for reviewer agents at each PDLC stage.

## Evidence

- Evidence: Human feedback: "I noticed that you are not executing subagents during PDLC workflow."
  Source: User message on 2026-04-14 during lifecycle retrospective.

- Evidence: Human clarification: "subagents should be executed in automated way by the process."
  Source: User message on 2026-04-14 during lifecycle retrospective follow-up.

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

- Evidence: Read-only lifecycle and execution-plan reviewer subagents found that the clarified expectation conflicts with current opt-in guidance and should route first to Process / Operations and Execution Planning, then to Validation Review and Release Readiness evidence.
  Source: `lifecycle_learning_reviewer` and `execution_plan_reviewer` advisory reviews on 2026-04-14.

## Confirmed Assumptions

- Current repository guidance permits subagents only when the human explicitly asks for subagents, delegation, or parallel agent work.
- Subagent findings are advisory evidence and do not replace human approval.
- Reviewer subagents are most useful after artifacts exist because they can check traceability, risk, and readiness against concrete requirements, designs, plans, implementation, and validation evidence.
- Stage-triggered subagent execution can be automated as process evidence while preserving the no-self-approval boundary.

## Disproven or Risky Assumptions

- Assumption: Main-agent review plus passing validation is sufficient to satisfy all PDLC review expectations after design approval.
  Status: Risky. The human expected visible subagent execution or at least explicit subagent consideration when permission was granted, especially for later implementation, security, quality, validation, and release-readiness checkpoints.

- Assumption: "Use subagents if needed" can be treated as optional without recording a decision.
  Status: Risky. It grants permission and creates a review expectation that should be handled visibly.

- Assumption: Existing implementation validation and release-readiness artifacts capture all important workflow review evidence.
  Status: Incomplete. They do not currently capture whether requested later-stage subagent review happened, was skipped, or produced findings.

- Assumption: Opt-in subagent usage is an adequate governance model for AI-native PDLC.
  Status: Disproven by human feedback. The desired process is stage-triggered reviewer execution at defined checkpoints after authorization, with explicit skip evidence when execution is unavailable.

## Lessons Learned

The workflow needs automated subagent review checkpoints once the human authorizes subagent use for the PDLC process. The checkpoint should say which reviewer roles were required for the stage, which subagents ran, what they found, where the evidence is recorded, and whether any reviewer was unavailable or skipped.

Design validation already demonstrates the intended pattern: subagent findings can be captured as advisory review evidence, gaps can be addressed, and human approval can remain separate. Later PDLC stages should follow the same pattern instead of relying only on main-agent review and automated test evidence.

Subagent execution should be aligned to PDLC stage rather than applied generically:

- Requirements and feature scope review: `product_coherence_reviewer`
- Solution design and ADR review: `architecture_decision_reviewer`
- ExecPlan readiness review: `execution_plan_reviewer`
- Implementation completion review: `implementation_reviewer`, `security_reviewer`, `quality_gate_reviewer`
- Validation gate review: `validation_gate_reviewer`
- Release readiness review: `release_readiness_reviewer`
- Lifecycle learning review: `lifecycle_learning_reviewer`

Each checkpoint should produce a subagent evidence ledger entry:

- Checkpoint
- Trigger
- Reviewer subagents
- Status: `pending`, `running`, `completed`, `skipped`, or `unavailable`
- Findings summary
- Evidence path
- Unresolved gaps
- Human decision state

This retrospective pass used `lifecycle_learning_reviewer`, `validation_gate_reviewer`, and `execution_plan_reviewer` to turn the feedback into recorded lifecycle learning.

## Follow-Up Recommendations

- Requirements: No product requirement change is needed unless the human wants subagent governance to become a formal workflow requirement for this repository template.
- Features: No game feature scope change is needed.
- Stories: No MVP gameplay story change is needed.
- Design / ADRs: Add a process ADR only if the repository should formalize automated advisory reviewer orchestration as part of the Flow Forge workflow architecture.
- Plans: Add required `Subagent Review Checkpoints` and a `Subagent Evidence Ledger` to future ExecPlans for significant work.
- Implementation: If the human wants a retroactive review of the current MVP branch, run `implementation_reviewer`, `security_reviewer`, `quality_gate_reviewer`, `validation_gate_reviewer`, and `release_readiness_reviewer`, then record the findings.
- Validation: Add a validation gate requiring evidence that required stage subagents ran, produced findings, or were explicitly unavailable.
- Release Readiness: Require validation evidence to include required subagent review status before recommending a human release decision.
- Process / Operations: Update `AGENTS.md`, skill instructions, and templates so relevant reviewer subagents run automatically at specified PDLC checkpoints once subagent use is authorized for the process.

## Human Checkpoint

Human decision is needed on whether to:

- Record this as accepted lifecycle feedback.
- Run retroactive advisory subagent reviews over the current MVP implementation and release-readiness evidence.
- Update templates, skills, or `AGENTS.md` so future PDLC workflows automatically execute required reviewer subagents at stage gates and record a subagent evidence ledger.

Only a human may approve the lifecycle learning, require process changes, accept retroactive review findings, or mark follow-up complete.
