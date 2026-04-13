# No Server-Side Database for MVP

## Status

Accepted

## Context

The Deep Vault MVP is a single-player browser-first text RPG. Current accepted scope requires local save/load continuity, structured content, route evaluation, and player-facing records, but does not require accounts, cloud saves, shared state, analytics, leaderboards, hosted authoring tools, multiplayer, or server-generated content.

Adding a database now would create hosting, migration, backup, access-control, privacy, and operational responsibilities before the MVP needs durable shared data.

## Decision

Use no server-side database for the MVP.

Authoritative game content should ship as static versioned application assets generated from TypeScript content modules in the repository. Runtime player state should live in memory during play and persist through local-first save/load in the browser. Structured content and route validation should be handled through files and automated checks in the repository, not through a database.

If future requirements add accounts, cloud saves, analytics, content authoring, player telemetry, moderation, or shared state, this ADR should be superseded by a database and data ownership decision.

## Consequences

This keeps the MVP deployable as a static app and avoids premature database operations. It also simplifies privacy and security posture because the MVP does not collect or store player data server-side.

The tradeoff is that players do not get cross-device saves, account recovery, cloud backup, or shared progress. Clearing browser data can lose save data, as described in the local-first persistence ADR.

Future execution planning should still define typed content files and validation checks carefully, because repository content becomes the source of truth for narrative data.

## Related Artifacts

- [Design: The Deep Vault MVP Game Architecture](../design/the-deep-vault-mvp-game-architecture.md)
- [ADR: Local-First Save and Load Persistence](local-first-save-and-load-persistence.md)
- [Story: Save and Load Playthrough Continuity](../stories/save-load-playthrough-continuity.md)
