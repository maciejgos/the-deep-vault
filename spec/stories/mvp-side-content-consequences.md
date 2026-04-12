# Story: MVP Side Content Consequences

## Status

Accepted

## User Story

As a player, I want optional side content to affect trust, evidence, resources, or character outcomes, so that exploration and replay create meaningful differences without blocking every ending.

## Background

The complete-game MVP includes side content at MVP depth where needed to support faction trust, evidence, resources, character outcomes, or route eligibility. The raw notes target 8 side quests, but this story focuses on MVP-depth side content that strengthens a complete playthrough.

## Source Artifacts

- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
- [Raw requirements input: notes.md](../requirements/notes.md)

## Scope

- Define the MVP set of side content needed to support replay, evidence, trust, resources, character outcomes, and route context.
- Ensure each side content item has an observable consequence or meaningful record entry.
- Allow side content to be completed, missed, or failed at MVP depth.
- Connect side content to at least one of: faction trust, evidence, supplies or resources, pressure, character state, route context, or ending variant.
- Preserve the complete main playthrough if optional side content is skipped.

## Out of Scope

- Full-depth implementation of every raw-note side quest if it does not affect MVP outcomes.
- Side content that exists only as flavor.
- Procedural quest generation.
- Post-MVP side quests.
- Final content polish for all optional branches.

## Acceptance Criteria

- Given side content is available, when the player completes it, then the result affects trust, evidence, resources, pressure, character state, route context, or ending variant.
- Given side content is available, when the player skips or fails it, then the MVP remains completable and can reflect the missed opportunity where relevant.
- Given a side content item grants evidence, when the player later reaches a relevant dialogue, route, or ending moment, then that evidence can be referenced or used.
- Given a side content item affects a character, when that character appears later, then their state reflects the side content outcome.
- Given human reviewers inspect the MVP scope, when they compare side content to the raw notes, then they can identify which side quests are mandatory at MVP depth, represented lightly, or deferred.

## Implementation Notes

Sequence: seventh. This story depends on state tracking, evidence records, zone progression, and faction or character behavior.

## Validation

Validate by listing each MVP side content item, its trigger, possible outcomes, and at least one observable consequence or explicit rationale for deferral.

## Related Artifacts

- [Story: Evidence, Codex, and Quest Records](evidence-codex-and-quest-records.md)
- [Story: Faction Trust and Character Arcs](faction-trust-and-character-arcs.md)

