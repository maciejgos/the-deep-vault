# Story: Menu Choice Scene Flow

## Status

Accepted

## User Story

As a player, I want scenes to present clear menu-based choices, so that I can investigate, talk, repair, conceal, reveal, and escalate without using a free-text parser.

## Background

The requirement and feature both define a menu-based text RPG. This story makes the core interaction model concrete enough for design and implementation planning before deeper state, faction, and route systems are layered in.

## Source Artifacts

- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)

## Scope

- Define how MVP scenes present narrative text, available choices, selected outcomes, and transition options.
- Support investigation choices, dialogue choices, repair choices, risk choices, evidence-use choices, and route-driving choices.
- Include hub-like decision moments between major scenes where the player can review context and choose priorities.
- Ensure choices can express conceal vs reveal, caution vs escalation, survival vs idealism, individual loyalty vs public truth, and reform vs revolution vs continuity vs exit.
- Define how unavailable choices are hidden, disabled, or explained at MVP depth.

## Out of Scope

- Free-text input.
- Final visual UI design.
- Full accessibility specification.
- Detailed state engine design.
- Final content prose for all scenes.

## Acceptance Criteria

- Given a player reaches a scene, when choices are available, then each choice is presented as a selectable menu option.
- Given the player selects a choice, when the scene responds, then the result is observable through narrative text, state change, scene transition, or a new available option.
- Given a hub moment occurs, when the player reviews available actions, then the menu offers meaningful next steps rather than only a single forced continuation.
- Given a choice is unavailable because of missing evidence, trust, clearance, resource, or prior state, when the player sees or attempts that choice, then the MVP handles the unavailable state consistently.
- Given the game is menu-based, when a player completes the MVP, then no required progress depends on free-text parser input.

## Implementation Notes

Sequence: second. This story depends on the playthrough spine for scene context and enables later stories to attach state, evidence, and route logic to choices.

## Validation

Validate through a scene-flow review that samples opening, investigation, hub, faction dialogue, crisis, and route scenes and confirms each supports menu-based progression.

## Related Artifacts

- [Story: MVP Playthrough Spine](mvp-playthrough-spine.md)

