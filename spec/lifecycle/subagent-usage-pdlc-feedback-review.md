# Lifecycle Retrospective: Subagent Usage During PDLC Workflow

## Status

Accepted

## Scope

This retrospective reviews process feedback raised during The Deep Vault complete-game MVP PDLC workflow: Codex did not consistently execute or record advisory subagent reviews across later PDLC stages, and every PDLC step should automatically use the applicable reviewer subagents defined in `.codex/agents`.

This is a workflow and governance retrospective. It does not re-open product scope, implementation acceptance, validation acceptance, release approval, merge, deployment, tag, announcement, or lifecycle completion.

## Source Artifacts

- Repository guidance: `AGENTS.md`
- Project subagent definitions: `.codex/agents/`
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

- Every PDLC stage must automatically invoke at least one applicable read-only reviewer subagent defined in `.codex/agents`.
- PDLC stages with product, architecture, implementation, security, quality, validation, release, or lifecycle risk should invoke all applicable `.codex/agents` reviewer roles for that stage.
- Subagent reviews should remain advisory. They may draft findings, identify risks, and recommend readiness, but they cannot approve, accept, reject, merge, release, deploy, or close checkpoints.
- If a required `.codex/agents` reviewer cannot be executed, the artifact for that PDLC stage should record the reviewer role, reason unavailable or skipped, impact on confidence, unresolved risk, and whether explicit human approval is needed to proceed despite missing advisory review.
- Each PDLC artifact should distinguish human approval state from advisory automated, Codex, and subagent review evidence.

## Observed Outcomes

- The repository guidance permits Codex subagents only when the human explicitly asks for subagents, delegation, or parallel agent work.
- The human previously asked to review architecture and use subagents if needed. Design validation did record architecture and validation subagent review findings, so subagents were not absent from the whole PDLC workflow.
- Later implementation validation, release-readiness, and lifecycle artifacts recorded automated and Codex-authored evidence, but did not include a subagent-review consideration field for implementation, security, quality, validation-gate, release-readiness, or lifecycle-learning review.
- The durable record is therefore incomplete: it shows design-stage subagent use, but not consistent later-stage subagent consideration, usage, or skip reasons.
- The human noticed and reported the gap during lifecycle retrospective feedback.
- The human clarified that subagents should be executed automatically by the process, not depend on the human remembering to ask for reviewer agents at each PDLC stage.
- The human further clarified that every PDLC step should use the subagents defined in `.codex/agents`.

## Evidence

- Evidence: Human feedback: "I noticed that you are not executing subagents during PDLC workflow."
  Source: User message on 2026-04-14 during lifecycle retrospective.

- Evidence: Human clarification: "subagents should be executed in automated way by the process."
  Source: User message on 2026-04-14 during lifecycle retrospective follow-up.

- Evidence: Human clarification: "Every step of PDLC should use subagents which are defined in .codex/agents."
  Source: User message on 2026-04-14 during lifecycle retrospective follow-up.

- Evidence: The repository defines project-scoped read-only reviewer subagents for product coherence, architecture decisions, execution plans, implementation, security, quality gates, validation gates, release readiness, and lifecycle learning.
  Source: `.codex/agents/`

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

- Evidence: Read-only lifecycle and execution-plan reviewer subagents found that the clarified expectation conflicts with current opt-in guidance, the local `.codex/agents` inventory is sufficient to cover the full PDLC chain, and the follow-up should route first to Process / Operations and Execution Planning, then to Validation Review and Release Readiness evidence.
  Source: `lifecycle_learning_reviewer` and `execution_plan_reviewer` advisory reviews on 2026-04-14.

## Confirmed Assumptions

- Current repository guidance permits subagents only when the human explicitly asks for subagents, delegation, or parallel agent work.
- Subagent findings are advisory evidence and do not replace human approval.
- Reviewer subagents are most useful after artifacts exist because they can check traceability, risk, and readiness against concrete requirements, designs, plans, implementation, and validation evidence.
- Stage-triggered subagent execution can be required as process evidence while preserving the no-self-approval boundary.
- The local `.codex/agents` inventory is broad enough to cover every current PDLC stage with at least one advisory reviewer role.

## Disproven or Risky Assumptions

- Assumption: Main-agent review plus passing validation is sufficient to satisfy all PDLC review expectations after design approval.
  Status: Risky. The human expected visible subagent execution or at least explicit subagent consideration when permission was granted, especially for later implementation, security, quality, validation, and release-readiness checkpoints.

- Assumption: "Use subagents if needed" can be treated as optional without recording a decision.
  Status: Risky. It grants permission and creates a review expectation that should be handled visibly.

- Assumption: Existing implementation validation and release-readiness artifacts capture all important workflow review evidence.
  Status: Incomplete. They do not currently capture whether requested later-stage subagent review happened, was skipped, or produced findings.

- Assumption: Opt-in subagent usage is an adequate governance model for AI-native PDLC.
  Status: Disproven by human feedback. The desired process is stage-triggered reviewer execution at defined checkpoints after authorization, with explicit skip evidence when execution is unavailable.

- Assumption: Subagent automation only belongs at late validation and release gates.
  Status: Disproven by human feedback. The desired process is every-step reviewer participation using the applicable `.codex/agents` role for that PDLC stage.

## Lessons Learned

The workflow needs automated subagent review checkpoints at every PDLC step. Each checkpoint should say which `.codex/agents` reviewer roles were required for the stage, which subagents ran, what they found, where the evidence is recorded, and whether any reviewer was unavailable or skipped.

Design validation already demonstrates the intended pattern: subagent findings can be captured as advisory review evidence, gaps can be addressed, and human approval can remain separate. Later PDLC stages should follow the same pattern instead of relying only on main-agent review and automated test evidence.

Subagent execution should be aligned to every PDLC stage rather than applied generically:

- Requirements refinement: `product_coherence_reviewer`
- Feature shaping: `product_coherence_reviewer`
- Story breakdown: `product_coherence_reviewer`
- Solution design: `architecture_decision_reviewer`, plus `product_coherence_reviewer` when product intent may drift
- ADR review: `architecture_decision_reviewer`, plus `security_reviewer` when security, privacy, data, hosting, or dependency decisions are involved
- Execution planning: `execution_plan_reviewer`, plus `validation_gate_reviewer` for test and CI/CD gate quality
- Implementation execution: `implementation_reviewer`, `security_reviewer`, `quality_gate_reviewer`
- Validation review: `validation_gate_reviewer`, plus `implementation_reviewer`, `security_reviewer`, or `quality_gate_reviewer` when evidence depends on implementation scope, security, or test quality
- Release readiness: `release_readiness_reviewer`, plus `validation_gate_reviewer`, `security_reviewer`, and `quality_gate_reviewer`
- Lifecycle retrospective: `lifecycle_learning_reviewer`, plus `product_coherence_reviewer`, `architecture_decision_reviewer`, `security_reviewer`, or `validation_gate_reviewer` depending on the learning

Each checkpoint should produce a subagent evidence ledger entry:

- PDLC step
- Trigger
- Required `.codex/agents` reviewers
- Review status: `pending`, `running`, `completed`, `skipped`, or `unavailable`
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
- Plans: Add required `Subagent Review Checkpoints` and a `Subagent Evidence Ledger` to future ExecPlans for significant work, covering every planned PDLC step.
- Implementation: If the human wants a retroactive review of the current MVP branch, run the applicable `.codex/agents` reviewers for implementation, security, quality, validation, release readiness, and lifecycle evidence, then record the findings.
- Validation: Add a validation gate requiring evidence that every applicable PDLC-step subagent ran, produced findings, or was explicitly unavailable.
- Release Readiness: Require validation evidence to include every applicable PDLC-step subagent review status before recommending a human release decision.
- Process / Operations: Update `AGENTS.md`, skill instructions, and templates so every PDLC step automatically invokes the applicable reviewer subagents defined in `.codex/agents` once subagent use is authorized for the process.

## Human Checkpoint

Human decision is needed on whether to:

- Record this as accepted lifecycle feedback.
- Run retroactive advisory subagent reviews over the current MVP artifact chain using all applicable `.codex/agents` reviewer roles.
- Update templates, skills, or `AGENTS.md` so future PDLC workflows automatically execute applicable `.codex/agents` reviewers at every PDLC step and record a subagent evidence ledger.

Only a human may approve the lifecycle learning, require process changes, accept retroactive review findings, or mark follow-up complete.
