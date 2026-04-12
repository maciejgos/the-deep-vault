# Story: Evidence, Codex, and Quest Records

## Status

Accepted

## User Story

As a player, I want records of evidence, discoveries, objectives, and unresolved leads, so that I can understand the conspiracy and make informed choices across a full playthrough.

## Background

The MVP feature requires a quest log or equivalent objective record and a codex or logbook for important evidence, documents, discoveries, locations, doctrine contradictions, and unresolved leads.

## Source Artifacts

- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)

## Scope

- Track active objectives, completed objectives, gathered evidence, major discoveries, doctrine contradictions, and unresolved questions at MVP depth.
- Record discoveries from hidden records, false public data, inhabited lower levels, manipulated exterior feeds, exile practices, and related clues.
- Allow evidence records to support later dialogue, choices, route context, trust changes, or ending evaluation.
- Provide player-facing summaries that are understandable without external notes.
- Include updates across the full MVP, not only the opening act.

## Out of Scope

- Final codex prose polish for every optional lore entry.
- Full searchable archive behavior.
- Complex inventory management beyond key evidence or items.
- Localization.
- Final UI layout.

## Acceptance Criteria

- Given the player discovers important evidence, when the discovery resolves, then the evidence is added to a player-facing record.
- Given the player opens the quest or objective record, when active work exists, then they can identify current objectives and unresolved leads.
- Given the player opens the codex or logbook, when major discoveries have occurred, then they can review important evidence, doctrine contradictions, and location or faction context.
- Given evidence is relevant to a later choice, when the player reaches that choice, then the game can use the evidence to unlock, alter, justify, or contextualize the option.
- Given the player reaches the final route phase, when route context is evaluated, then the records reflect the major evidence gathered during the playthrough.

## Implementation Notes

Sequence: fourth. This story depends on story state and choice consequences. It should coordinate with route and ending work so evidence can matter beyond collection.

## Validation

Validate by tracing each required conspiracy reveal to a record entry and at least one later use or narrative consequence.

## Related Artifacts

- [Story: Story State and Choice Consequences](story-state-choice-consequences.md)

