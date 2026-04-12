# Story: Story State and Choice Consequences

## Status

Accepted

## User Story

As a player, I want my choices to affect later scenes and outcomes, so that the MVP feels reactive rather than cosmetic.

## Background

The complete-game MVP requires choices across investigation, repairs, faction alignment, evidence handling, and public disclosure to affect route availability, character state, public stability, and ending variants. This story defines the minimum state and consequence behavior needed across the whole playthrough.

## Source Artifacts

- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
- [Raw requirements input: notes.md](../requirements/notes.md)

## Scope

- Track MVP story state for progress flags, evidence count, clearance or access, pressure or stress, supplies or resources, route progress, and public stability.
- Ensure selected choices can change tracked state.
- Ensure tracked state can change later dialogue, scene access, route availability, pressure, resources, or ending variants.
- Define at least one observable consequence chain for each major phase of the MVP: opening, investigation, faction escalation, crisis, route commitment, and ending.
- Preserve enough state traceability for validation and future route coverage.

## Out of Scope

- Final balancing of all meters.
- Full save/load persistence.
- Full faction trust and character-state depth, except where needed for general state behavior.
- Randomized crisis outcomes.
- Internal implementation architecture.

## Acceptance Criteria

- Given a player makes a consequential choice, when the choice resolves, then at least one relevant story state value changes or is recorded.
- Given a prior choice changed story state, when a later dependent scene is reached, then dialogue, access, pressure, resources, route availability, or ending context reflects that state.
- Given the MVP includes pressure or stress, when the player escalates, delays, conceals, or exposes information, then pressure can change in an observable way.
- Given the MVP includes clearance or access, when Tomas gains access to restricted areas, then the access reason is tied to maintenance competence, relationships, evidence, choices, or system failures.
- Given validation reviews the MVP, when state-dependent routes are inspected, then key state variables can be traced back to player actions.

## Implementation Notes

Sequence: third. This story depends on the playthrough spine and menu choice flow. It prepares the ground for evidence, faction, side-content, and ending stories.

## Validation

Validate by mapping a sample set of early, midgame, crisis, and endgame choices to their later observable consequences.

## Related Artifacts

- [Story: MVP Playthrough Spine](mvp-playthrough-spine.md)
- [Story: Menu Choice Scene Flow](menu-choice-scene-flow.md)

