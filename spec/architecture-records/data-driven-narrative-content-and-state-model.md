# Data-Driven Narrative Content and State Model

## Status

Accepted

## Context

The Deep Vault MVP includes many scenes, choices, evidence records, faction trust values, character states, route gates, endings, side content, and save/load requirements. Hard-coding branching story logic directly in UI components would make validation, review, and route coverage difficult.

The project needs a model that lets contributors inspect content, trace choice effects, validate scene links, and test ending eligibility without manually playing every possible branch.

## Decision

Use a data-driven narrative model with structured records for scenes, choices, conditions, effects, evidence, quests, codex entries, locations, factions, characters, endings, and side content.

MVP content should live in TypeScript modules under a future `src/content/` directory and should be validated with Zod schemas or equivalent TypeScript-first schema validation under future `src/game/` modules. TypeScript content modules are preferred over JSON, YAML, or Markdown-frontmatter for the MVP because they preserve static bundling, editor type checking, refactor safety, and direct imports for route fixtures without adding a separate parser.

Scene choices should use a constrained condition and effect vocabulary instead of arbitrary embedded code. Game state should be a single serializable object containing current scene, visited scenes, selected choices, progress flags, faction trust, character states, evidence, quests, codex records, resources, route progress, public stability, side content outcomes, and save metadata.

Choice effects should be applied through one effect-resolution path, and route evaluation should be deterministic and inspectable.

## Consequences

This improves maintainability, validation, and story review. It makes content graph checks, route fixture tests, save/load round trips, and debug state inspection practical.

The tradeoff is more upfront schema and resolver design. Contributors will need to maintain content ids, condition names, effect names, and validation fixtures carefully. Nontechnical content authoring is not optimized by this choice; a future authoring workflow may require a superseding ADR.

This decision also constrains future implementation: UI components should render resolved state and content instead of containing bespoke story branching logic.

## Related Artifacts

- [Design: The Deep Vault MVP Game Architecture](../design/the-deep-vault-mvp-game-architecture.md)
- [Story: Story State and Choice Consequences](../stories/story-state-choice-consequences.md)
- [Story: Evidence, Codex, and Quest Records](../stories/evidence-codex-and-quest-records.md)
- [Story: Route Commitment and Ending Evaluation](../stories/route-commitment-and-ending-evaluation.md)
