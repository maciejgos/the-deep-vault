# Story: MVP Playthrough Spine

## Status

Accepted

## User Story

As a player, I want a complete beginning-to-end story path through The Deep Vault, so that I can finish the MVP and understand the core Vault-9 conspiracy even before every optional branch is polished.

## Background

The complete-game MVP feature requires a full playthrough with a coherent beginning, middle, climax, route resolution, and ending. This story establishes the main playable spine that later stories can enrich with deeper systems, evidence, faction reactions, side content, and save behavior.

## Source Artifacts

- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
- [Raw requirements input: notes.md](../requirements/notes.md)

## Scope

- Define the MVP main-story sequence from Tomas Vale's opening maintenance-runner situation through final route resolution.
- Include the major phases needed for a complete playthrough: opening pressure, first contradiction, deeper investigation, civic crisis escalation, route commitment, climax, and ending.
- Include MVP-depth representations of the major conspiracy reveals: hidden records, false public data, inhabited or active lower sectors, manipulated exterior feeds, and exile practices.
- Identify the minimum required scenes, transitions, and hub moments needed for a coherent complete playthrough.
- Define where the four ending routes become possible, without implementing final route logic in this story.

## Out of Scope

- Full optional side content.
- Full faction trust logic.
- Detailed ending evaluation rules.
- Final prose polish for every scene.
- Runtime architecture, content schema, UI layout, or source implementation.

## Acceptance Criteria

- Given the MVP playthrough spine, when a human reviewer follows the scene sequence, then they can identify a coherent beginning, middle, climax, and ending structure.
- Given Tomas starts as a maintenance runner, when the sequence opens restricted information or areas, then each access point is justified by repairs, relationships, evidence, choices, or system failures.
- Given the story centers on curated lies, when the main spine reaches each major reveal, then that reveal changes the player's understanding of Vault-9 rather than serving only as atmosphere.
- Given the feature requires four routes, when the spine reaches the route-commitment phase, then controlled truth, full exposure, preserve order, and exit protocol are all available as MVP-supported directions.
- Given later stories add systems and content, when they reference the spine, then they can attach state, evidence, faction reactions, side content, and endings without redefining the main story order.

## Implementation Notes

Sequence: first. This is the anchor story for downstream design and implementation planning. It should produce enough structure for later stories to target specific scenes, route phases, and required reveals.

## Validation

Validate by reviewing the spine against the complete-game MVP feature and confirming that a player can complete an end-to-end narrative path without optional content or final polish.

## Related Artifacts

- [Story template](TEMPLATE.md)

