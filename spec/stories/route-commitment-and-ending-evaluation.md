# Story: Route Commitment and Ending Evaluation

## Status

Accepted

## User Story

As a player, I want the final route and ending to reflect accumulated choices, so that controlled truth, full exposure, preserve order, and exit protocol feel morally and narratively distinct.

## Background

The requirement and complete-game MVP feature both require four major moral routes. The final route should be evaluated from accumulated choices and state rather than a single isolated endgame selection.

## Source Artifacts

- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
- [Raw requirements input: notes.md](../requirements/notes.md)

## Scope

- Define route commitment behavior for controlled truth, full exposure, preserve order, and exit protocol.
- Define MVP eligibility or consequence inputs from evidence, faction trust, character states, pressure, resources, clearance, public stability, and prior choices.
- Ensure each route has a distinct climax expression and ending outcome.
- Ensure ending variants can reflect major prior choices without requiring every optional branch to have a bespoke ending.
- Define how incomplete evidence, low trust, high pressure, or lost allies can alter route consequences.

## Out of Scope

- Additional ending routes beyond the four major routes.
- Full post-MVP ending epilogues for every possible variable combination.
- Randomized ending selection.
- Combat-first climax resolution.
- Final cinematic or presentation polish.

## Acceptance Criteria

- Given the player reaches route commitment, when accumulated state is evaluated, then controlled truth, full exposure, preserve order, and exit protocol are represented as distinct route possibilities or consequences.
- Given the player chooses or qualifies for controlled truth, when the ending resolves, then the outcome emphasizes gradual disclosure, managed stability, and tradeoffs from prior support or evidence.
- Given the player chooses or qualifies for full exposure, when the ending resolves, then the outcome emphasizes public truth, destabilization risk, and consequences from prior faction and character states.
- Given the player chooses or qualifies for preserve order, when the ending resolves, then the outcome emphasizes continuity, suppression, moral cost, and consequences from evidence or dissent.
- Given the player chooses or qualifies for exit protocol, when the ending resolves, then the outcome emphasizes seeking a world beyond Vault-9 and consequences from Boundary Ring, exile, or external signal evidence.
- Given two playthroughs reach different routes or major states, when endings are compared, then observable story outcomes differ.

## Implementation Notes

Sequence: eighth. This story depends on the playthrough spine, state tracking, evidence records, faction and character arcs, and zone progression.

## Validation

Validate by defining route fixtures or review scenarios for all four endings, including the minimum state needed to reach or alter each outcome.

## Related Artifacts

- [Story: Story State and Choice Consequences](story-state-choice-consequences.md)
- [Story: Faction Trust and Character Arcs](faction-trust-and-character-arcs.md)

