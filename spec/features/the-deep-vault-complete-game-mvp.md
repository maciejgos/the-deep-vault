# Feature: The Deep Vault Complete Game MVP

## Status

Accepted

## Summary

Deliver The Deep Vault as a complete-game MVP: a beginning-to-end menu-based text RPG where Tomas Vale uncovers Vault-9's curated lies, builds or loses trust with major factions, gathers evidence, manages pressure, and reaches one of four morally distinct ending routes.

The MVP should be complete enough for a player to finish the story, understand the major conspiracy, experience meaningful route consequences, and replay for different outcomes. It may implement content and systems at MVP depth, but it should not redefine the first product target as only a Prologue or Act I vertical slice.

## Source Requirements

- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
- [Raw requirements input: notes.md](../requirements/notes.md)

This feature is justified by the accepted requirement goals for a choice-based text RPG centered on investigation, dialogue, faction trust, evidence gathering, resource pressure, and branching endings. It reflects the human product direction that the first feature should target a complete-game MVP rather than a smaller vertical slice.

## Users and Use Cases

- Players need to complete a full playthrough as Tomas Vale, make meaningful choices across the whole story, and reach an ending that reflects evidence, trust, repair, concealment, disclosure, and route decisions.
- Replay-focused players need route and consequence differences that make controlled truth, full exposure, preserve order, and exit protocol feel meaningfully distinct.
- Narrative designers need a complete MVP content boundary for the main story, faction arcs, evidence reveals, character outcomes, side content, and endings.
- Game designers need enough end-to-end behavior to evaluate whether faction trust, pressure, resources, evidence, quest state, and ending evaluation create meaningful narrative consequences.
- Developers need a feature boundary that can later be broken into stories, designs, and implementation milestones without losing the full-game MVP target.
- Human reviewers need one coherent feature artifact they can approve, revise, or reject before story breakdown and solution design.

## Scope

- Provide a complete beginning-to-end story for Tomas Vale inside Vault-9, from initial maintenance-runner stakes through the final route and ending outcome.
- Include the major story structure from the requirement and raw notes at MVP depth, including the sealed habitat premise, public survival doctrine, hidden records, Black Levels, Boundary Ring evidence, exile truth, manipulated information, and the larger civic crisis.
- Support the four major moral routes: controlled truth, full exposure, preserve order, and exit protocol.
- Include the core cast at MVP depth, including Tomas Vale, Brant Hollow, Mira Senn, Nera Quill, Director Elian Voss, and other major NPCs needed for faction, evidence, and route consequences.
- Represent the major factions at MVP depth: Mechanical, Stability Office, Keepers, and Descenders.
- Include the five major zones at MVP depth: Upper Ring, Mid Commons, Lower Mechanica, Black Levels, and Boundary Ring.
- Provide menu-based choices for investigation, dialogue, repairs, concealment, disclosure, alliance-building, risk management, and final route decisions.
- Track story state needed for full-game MVP consequences, including faction trust, character states, progress flags, player resources, evidence count, clearance or access, and final route selection.
- Provide quest tracking or an equivalent player-facing objective record across the complete MVP.
- Provide a codex or logbook-style record for important evidence, documents, discoveries, locations, doctrine contradictions, and unresolved leads.
- Include save/load behavior sufficient for a player to complete and resume a full playthrough.
- Include side content at MVP depth where needed to support faction trust, evidence, resources, character outcomes, or route eligibility.
- Preserve a grounded tone where survival needs, political control, personal loyalty, and public truth remain in tension.
- Keep the game original and outside any licensed fictional canon.

## Out of Scope

- Free-text parser gameplay.
- Combat-heavy mechanics or combat-first route resolution.
- Polished final content volume beyond MVP depth for every optional side quest, ambient location, optional NPC exchange, codex entry, or replay variant.
- Final UI visual design, production art direction, source code architecture, content schema, dialogue file format, or implementation milestones.
- Complete localization.
- Fully finalized accessibility, content warning, sensitivity review, and platform policies before those decisions are approved in later artifacts.
- Post-MVP expansions, additional endings beyond the four major routes, downloadable content, multiplayer, live operations, or procedural content generation.

## Behavior

- The player starts as Tomas Vale, a low-ranking maintenance runner whose access comes from repairs, observation, relationships, evidence, choices, and system failures rather than special destiny.
- The game presents choices through menus rather than free-text input.
- Scene progression supports authored scenes, hub-like decision moments, investigation, dialogue, inventory or key-item use, evidence review, and route-driving choices.
- Player choices affect observable state across the full game, including faction trust, stress or pressure, supplies or resources, evidence count, clearance, character attitude, character survival or availability, scene access, route eligibility, public stability, and final ending variants.
- Evidence discoveries are stored in a player-facing record and can unlock dialogue, justify choices, increase pressure, change trust, or influence ending evaluation.
- Dialogue and investigation choices repeatedly express the requirement-level tensions: conceal vs reveal, caution vs escalation, survival vs idealism, individual loyalty vs public truth, and reform vs revolution vs continuity vs exit.
- Faction interactions present competing motives without reducing any faction to a single-note moral position.
- Voss and the Stability Office are presented with a continuity argument while still exposing abuse, manipulation, disappearance, coercion, and information control.
- The final route is evaluated from accumulated choices and state rather than a single isolated endgame selection.
- Each ending route produces an observable story outcome that distinguishes controlled truth, full exposure, preserve order, and exit protocol.

## Acceptance Criteria

- Given a new player starts the complete-game MVP, when they complete a playthrough, then they experience a coherent beginning, middle, climax, route resolution, and ending.
- Given the player makes choices across investigation, dialogue, repairs, faction alignment, evidence handling, and public disclosure, when later scenes and the ending are reached, then those choices are reflected in route availability, character state, public stability, and ending variants.
- Given the game uses four major endings, when the final route is evaluated, then the outcome distinguishes controlled truth, full exposure, preserve order, and exit protocol through observable story consequences.
- Given the game centers on Vault-9's curated lies, when core scenes reveal hidden records, false public data, inhabited lower levels, manipulated exterior feeds, or exile practices, then each reveal adds usable evidence, pressure, route context, or meaningful player choice.
- Given the protagonist is a low-ranking maintenance runner, when progression opens new areas or information, then access comes through maintenance competence, relationships, evidence, choices, or system failures rather than unexplained special status.
- Given a route involves public disclosure, suppression, reform, revolt, continuity, or exit, when the player reaches the climax, then prior support from Mechanical, Stability, Keepers, Descenders, and key NPCs visibly alters crisis handling or consequences.
- Given the player returns after leaving the game, when they load a saved state, then they can continue the full MVP playthrough without losing tracked choices, evidence, quest state, route progress, or character state.
- Given the player reviews their current situation, when they open the quest log, codex, or equivalent record, then they can identify active objectives, gathered evidence, important discoveries, and unresolved questions.
- Given the complete-game MVP includes side content at MVP depth, when the player completes or skips that content, then it can influence trust, evidence, resources, character outcomes, or route context without being required for every ending.
- Given human reviewers compare the feature to the accepted requirement, when they inspect scope and out-of-scope boundaries, then they can confirm the feature targets a complete-game MVP rather than a vertical slice.
- Given downstream stories remain Draft, when Codex recommends readiness, then story status is not changed to Approved without explicit human approval.

## Related Stories

- [Story: MVP Playthrough Spine](../stories/mvp-playthrough-spine.md)
- [Story: Menu Choice Scene Flow](../stories/menu-choice-scene-flow.md)
- [Story: Story State and Choice Consequences](../stories/story-state-choice-consequences.md)
- [Story: Evidence, Codex, and Quest Records](../stories/evidence-codex-and-quest-records.md)
- [Story: Vault Zones and Access Progression](../stories/vault-zones-access-progression.md)
- [Story: Faction Trust and Character Arcs](../stories/faction-trust-and-character-arcs.md)
- [Story: MVP Side Content Consequences](../stories/mvp-side-content-consequences.md)
- [Story: Route Commitment and Ending Evaluation](../stories/route-commitment-and-ending-evaluation.md)
- [Story: Save and Load Playthrough Continuity](../stories/save-load-playthrough-continuity.md)
- [Story: MVP Content Scope and Deferral Map](../stories/mvp-content-scope-and-deferral-map.md)

## Related Artifacts

- [Feature template](TEMPLATE.md)
- [Requirements template](../requirements/TEMPLATE.md)
