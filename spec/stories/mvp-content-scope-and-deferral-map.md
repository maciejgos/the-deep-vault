# Story: MVP Content Scope and Deferral Map

## Status

Accepted

## User Story

As a human reviewer, I want the raw narrative package mapped to MVP content depth, so that the team knows what is mandatory, represented lightly, or deferred without breaking the complete game.

## Background

The accepted requirement asks which raw-note content is mandatory at full depth, which can be represented at MVP depth, and which can be deferred without breaking the complete playthrough. This story creates the content scope control needed before design and execution planning.

## Source Artifacts

- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
- [Raw requirements input: notes.md](../requirements/notes.md)

## Scope

- Map raw-note scenes, side quests, NPCs, locations, key items, global flags, trust systems, and resource meters to MVP handling.
- Classify content as mandatory at MVP depth, represented lightly, deferred, or rejected.
- Explain how each deferral preserves a complete beginning-to-end playthrough.
- Identify content whose deferral would weaken route distinction, evidence logic, faction consequences, or ending evaluation.
- Provide a reviewable basis for story sequencing, design, and execution planning.

## Out of Scope

- Final content writing.
- Source code or content schema implementation.
- Approval of deferrals without human review.
- Adding new post-MVP features.
- Full production backlog creation.

## Acceptance Criteria

- Given the raw narrative package lists major content, when the map is complete, then each major scene, side quest, NPC, location, key item, flag group, trust system, and resource meter has an MVP handling classification.
- Given content is classified as deferred, when a reviewer inspects the rationale, then they can understand why the complete-game MVP still works without it.
- Given content is classified as mandatory, when later stories or designs reference MVP scope, then the content is clearly part of the first complete-game target.
- Given route or ending logic depends on content, when that content is classified, then the map identifies whether it is mandatory, represented lightly, or a risk if deferred.
- Given the map is produced by Codex, when status or checkpoint state changes, then no deferral is treated as approved without explicit human approval.

## Implementation Notes

Sequence: tenth, but this can run earlier in parallel with design preparation after story approval. This is a product-scope control story, not source implementation.

## Validation

Validate by comparing the map against the accepted requirement and raw notes, then checking that the complete-game MVP still has a coherent playthrough and four ending routes after proposed deferrals.

## Related Artifacts

- [Story: MVP Playthrough Spine](mvp-playthrough-spine.md)
- [Story: MVP Side Content Consequences](mvp-side-content-consequences.md)

