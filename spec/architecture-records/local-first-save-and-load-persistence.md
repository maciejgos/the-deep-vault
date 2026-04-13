# Local-First Save and Load Persistence

## Status

Accepted

## Context

The complete-game MVP targets a 5-7 hour playthrough and requires save/load continuity. The current requirements do not approve accounts, cloud saves, cross-device sync, autosave, rewind, chapter replay, or multiple save slots.

The MVP needs persistence that is sufficient for a player to resume a complete playthrough without introducing backend infrastructure before the core game loop is validated.

## Decision

Use local-first save/load persistence for the MVP using browser `localStorage`. The save payload should serialize the complete game state plus metadata such as save version and timestamp.

A single manual save slot is sufficient for MVP design unless human review approves multiple slots, autosave, rewind, or chapter replay before execution planning.

The app should handle no-save, successful-load, incompatible-version, unavailable-storage, and malformed-save cases with player-facing feedback.

## Consequences

This keeps MVP infrastructure simple and avoids accounts, databases, cloud storage, authentication, IndexedDB complexity, and backend operations before they are needed.

The tradeoff is durability and payload size: `localStorage` saves can be lost when a player clears site data, switches devices, or uses a restricted browser environment, and the save payload must remain compact.

If multiple save slots, large player-generated data, cloud saves, accounts, cross-device play, telemetry, or backup/restore become requirements, this ADR should be superseded by a persistence and data ownership decision.

## Related Artifacts

- [Design: The Deep Vault MVP Game Architecture](../design/the-deep-vault-mvp-game-architecture.md)
- [Story: Save and Load Playthrough Continuity](../stories/save-load-playthrough-continuity.md)
- [Story: Story State and Choice Consequences](../stories/story-state-choice-consequences.md)
