# Story: Save and Load Playthrough Continuity

## Status

Accepted

## User Story

As a player, I want to save and resume a full MVP playthrough, so that I can complete the 5-7 hour experience without losing decisions, evidence, or route progress.

## Background

The feature requires save/load behavior sufficient for a player to complete and resume a full playthrough. The requirement leaves open whether save/load should include multiple slots, autosave, rewind, chapter replay, or manual saves only.

## Source Artifacts

- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)

## Scope

- Define MVP save/load behavior sufficient to resume a complete playthrough.
- Preserve current scene or checkpoint, prior choices, evidence records, quest state, route progress, faction trust, character states, resources, pressure, and access state.
- Define minimum player-facing feedback for saving, loading, missing saves, and incompatible or unavailable save data.
- Identify unresolved policy decisions for multiple slots, autosave, rewind, and chapter replay.

## Out of Scope

- Cloud saves.
- Cross-device synchronization.
- Rewind or chapter replay unless approved later.
- Save migration for post-MVP schema changes.
- Platform-specific storage implementation.

## Acceptance Criteria

- Given the player has made progress, when they save and later load, then they resume at the expected scene or checkpoint.
- Given the player loads a saved state, when they inspect evidence, quests, faction trust, character states, route progress, resources, and access state, then the MVP preserves the saved values.
- Given no saved state exists, when the player attempts to load, then the MVP provides clear feedback rather than failing silently.
- Given save behavior is limited at MVP depth, when a human reviewer inspects the story, then unresolved decisions about multiple slots, autosave, rewind, and chapter replay are explicit.
- Given the player completes the full MVP over multiple sessions, when they reach the ending, then saved choices and state still influence route and ending outcomes.

## Implementation Notes

Sequence: ninth. This story should be designed after core state needs are known and before implementation planning commits to a runtime or storage model.

## Validation

Validate through a resume scenario that saves before a major choice, loads after restart, continues through later scenes, and confirms state-dependent consequences still occur.

## Related Artifacts

- [Story: Story State and Choice Consequences](story-state-choice-consequences.md)

