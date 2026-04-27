# Release Notes

## v0.1.0 Playability Iteration

### Highlights

- Improved the game UI with a denser desktop layout, stronger choice affordance, route pressure display, richer records, and a lower-left version badge.
- Added clearer choice consequence feedback for stress, supplies, stability, evidence, items, codex, and route commitment.
- Prevented early ending spoilers by showing route pressure during play and reserving ending outcomes for terminal scenes.
- Locked final route execution to the coalition route committed earlier in Act IV.
- Prevented repeat-farming of optional side choices.

### Narrative And Playability

- Added early Act I branching for cautious repair, anomaly inspection, central reporting, denial, partial truth, and direct B-17 escalation.
- Expanded Jun's side quest with recruit, expose, and ignore outcomes.
- Expanded Ilya's side quest with protect and report outcomes.
- Replaced the generic D3 crisis with route-specific crisis scenes for Controlled Truth, Full Exposure, Preserve Order, and Exit Protocol.
- Added an ending report that summarizes evidence, public stability, stress, supplies, and remembered allies.

### Validation

- Added regression coverage for side-choice farming, ending spoiler prevention, final route locking, early Act I branching, side quest resolutions, route-specific crisis scenes, and New Game reset.
- Latest validation command: `docker compose run --rm workspace pnpm validate`.
- Latest result: lint passed, 27 unit/app/content tests passed, and 12 Playwright tests passed.

### Known Follow-Ups

- Add deeper divergent route fixtures that include more skipped side quests and low-support outcomes.
- Add route-specific ending variants based on ally survival, casualty pressure, and evidence integrity.
- Decide whether future releases should use `CHANGELOG.md`, GitHub Releases, or both.
