# Decision record template by Michael Nygard

This is the template in [Documenting architecture decisions - Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).
You can use [adr-tools](https://github.com/npryce/adr-tools) for managing the ADR files.

In each ADR file, write these sections:

# Title

## Status

What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.?

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Subagent Review Evidence

- PDLC step: Architecture decision review
- Trigger: <Draft ADR ready for advisory review before human checkpoint>
- Required `.codex/agents` reviewers: `architecture_decision_reviewer`
- Additional risk-based reviewers: `security_reviewer`, `validation_gate_reviewer`, or `product_coherence_reviewer` when security, privacy, data, hosting, dependency, validation, or product-scope risk warrants it.
- Review status: <pending, running, completed, skipped, or unavailable>
- Findings summary: <Advisory findings; not approval>
- Evidence path: <Link to subagent output, validation note, or review artifact>
- Unresolved gaps: <Open issues or none>
- Human decision state: <Pending unless explicitly accepted by a human>
- Reason if skipped or unavailable: <Reason, or Not applicable>
- Impact on confidence: <How missing or partial review affects confidence>
- Human decision required?: <Yes/No; required when reviewer coverage is skipped, unavailable, or partial>

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?

## Related Artifacts

Link to requirements, features, stories, designs, ExecPlans, validation artifacts, release-readiness records, or lifecycle notes that depend on or revise this decision.
