# Validation: <Short Name>

## Status

Draft

## Scope

Describe the requirement, feature, story, plan, or outcome being validated.

## Source Artifacts

Link to related requirements, features, stories, designs, ADRs, ExecPlans, implementation changes, or review notes.

## Subagent Review Evidence

- PDLC step: Validation review
- Trigger: <Draft validation artifact ready for advisory review before human checkpoint>
- Required `.codex/agents` reviewers: `validation_gate_reviewer`; add `implementation_reviewer`, `security_reviewer`, or `quality_gate_reviewer` when evidence depends on implementation scope, security, or test quality.
- Review status: <pending, running, completed, skipped, or unavailable>
- Findings summary: <Advisory findings; not approval>
- Evidence path: <Link to subagent output, validation note, or review artifact>
- Unresolved gaps: <Open issues or none>
- Human decision state: <Pending unless explicitly approved by a human>
- Reason if skipped or unavailable: <Reason, or Not applicable>
- Impact on confidence: <How missing or partial review affects validation confidence>
- Human decision required?: <Yes/No; required when reviewer coverage is skipped, unavailable, or partial>

Subagent findings are advisory evidence only. They may recommend `Blocked`, `Failed`, or `Ready for human review`, but they do not approve validation.

## Preconditions

List what must exist before this validation can be performed.

## Acceptance Criteria Mapping

- Criterion: <Requirement, feature, story, design, ADR, or ExecPlan acceptance criterion>
  Evidence status: <Supported, Partially Supported, Failed, Missing, or Not Applicable>
  Evidence: <Artifact link, command output summary, screenshot, review note, or explanation>

## Checks

- Check: <What to inspect or run>
  Type: <Artifact, Behavior, Automated, UI, Security, Operational, or Manual>
  Status: <Passed, Failed, Skipped, Unavailable, Manual, or Future Gate>
  Expected result: <Observable evidence of success>
  Actual result: <What happened or what evidence is missing>

## Evidence

Record links, command output summaries, screenshots, review notes, or other proof.

## Missing, Skipped, or Unavailable Checks

- Check: <Check that could not be completed>
  Reason: <Why it was skipped or unavailable>
  Risk: <Impact on validation confidence>

- Check: <Required subagent reviewer that did not run>
  Reason: <Why the reviewer was skipped or unavailable>
  Risk: <Impact on validation confidence and whether explicit human acknowledgment is required>

## Future CI/CD or Lifecycle Gates

- Gate: <Check that should become automated or continuously reviewed later>
  Trigger: <When the gate should run>
  Blocks: <What it should block when failing>

- Gate: Required subagent review coverage
  Trigger: Validation artifact created or updated
  Blocks: `Result = Ready for human review` when required reviewer coverage is missing, skipped, or unavailable without explicit human acknowledgment

## Result

Pending

Use `Pending`, `Blocked`, `Failed`, or `Ready for human review` unless a human explicitly instructs otherwise. Do not mark validation accepted or complete without explicit human approval.

## Follow-Up

List any issues, gaps, or next actions discovered during validation.

## Human Decision

Pending

Record the explicit human decision when provided. Do not mark validation accepted, complete, released, or merged without explicit human approval.
