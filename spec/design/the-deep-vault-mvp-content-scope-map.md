# Design: The Deep Vault MVP Content Scope Map

## Status

Accepted

## Context

The complete-game MVP targets a full beginning-to-end playthrough, not a vertical slice. The raw requirements input includes 22 main scenes, 8 side quests, 10 major NPCs, 20 locations, 12 key items, 15-20 global flags, 4 trust systems, 3-5 resource meters, and 4 endings.

This map classifies the raw narrative package so execution planning can preserve the complete-game MVP without turning every optional detail into uncontrolled scope.

## Source Artifacts

- [Requirement: The Deep Vault Text RPG](../requirements/the-deep-vault-text-rpg.md)
- [Raw requirements input: notes.md](../requirements/notes.md)
- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
- [Story: MVP Content Scope and Deferral Map](../stories/mvp-content-scope-and-deferral-map.md)
- [Design: The Deep Vault MVP Game Architecture](the-deep-vault-mvp-game-architecture.md)

## Goals

- Define what raw-note content is mandatory at MVP depth.
- Identify content that may be represented lightly without breaking the complete playthrough.
- Identify deferrals and rejected scope explicitly.
- Protect the four ending routes and the complete-game MVP target before execution planning.

## Proposed Design

### Classification Meanings

- Mandatory at MVP depth: required for the first complete-game MVP, but prose polish and optional variants may remain lean.
- Represented lightly: appears in the MVP as a summary, reference, short scene beat, small record, or reduced branch.
- Deferred: intentionally not part of the MVP, with rationale.
- Rejected: not aligned with current scope.

### Main Scenes

All 22 raw-note main scenes are mandatory at MVP depth because they form the complete-game spine and four-route ending structure.

| Content | Classification | MVP handling |
| --- | --- | --- |
| P1. Survival Notice | Mandatory at MVP depth | Intro doctrine, controls entry, and Tomas setup. |
| A1. Pressure Fault | Mandatory at MVP depth | Inciting maintenance failure, B-17 hint, first evidence. |
| A2. Routine Questions | Mandatory at MVP depth | Tovin introduction and first conceal/reveal consequence. |
| A3. Shift's End Market | Mandatory at MVP depth | First hub, Jun, rumors, Mira trail, objective context. |
| A4. Ash in the Furnace | Mandatory at MVP depth | Paper schematics, Ilya, Keeper trust path. |
| A5. Missing Shift | Mandatory at MVP depth | Mira workstation, Brant confrontation, Black Stair setup. |
| B1. A Clerk in Restricted Light | Mandatory at MVP depth | Nera, Keepers, archive redaction and orchard trail. |
| B2. Clinic Recycler | Mandatory at MVP depth | Mandatory systems test with side-content-style consequence. |
| B3. Orchard Numbers | Mandatory at MVP depth | Food fraud evidence and hidden population implication. |
| B4. The Black Stair | Mandatory at MVP depth | Access gate into Black Levels. |
| B5. First Descent | Mandatory at MVP depth | Descenders, Black Levels habitation, Cael. |
| B6. The Woman Who Refused to Die | Mandatory at MVP depth | Mira reveal and route tempo pressure. |
| C1. Nursery Ghosts | Mandatory at MVP depth | Population manipulation evidence. |
| C2. A Good Man With a Badge | Mandatory at MVP depth | Tovin alignment branch. |
| C3. The Boundary Technician | Mandatory at MVP depth | Alma and manipulated external feed evidence. |
| C4. The Price of Fire | Mandatory at MVP depth | Tempo ethics and route tendency. |
| C5. Brant's Line | Mandatory at MVP depth | Survival vs revolution consequence and Mechanical trust. |
| C6. Audience With Director Voss | Mandatory at MVP depth | Continuity argument and suppression path. |
| D1. Choosing the Coalition | Mandatory at MVP depth | Route commitment and ally availability. |
| D2. The Night of Open Speakers | Mandatory at MVP depth | Route-specific mission objective. |
| D3. Crisis Scene Variants | Mandatory at MVP depth | Branching crisis chains, implemented with limited variants. |
| D4. Final Choice Terminal | Mandatory at MVP depth | Final irreversible choice and route execution. |

### Endings

All four endings are mandatory at MVP depth.

| Content | Classification | MVP handling |
| --- | --- | --- |
| Controlled Truth | Mandatory at MVP depth | Base ending plus variants for support, evidence, Voss, and Mira. |
| Full Exposure | Mandatory at MVP depth | Base ending plus variants for Descender support and public stability. |
| Preserve Order | Mandatory at MVP depth | Base ending plus variants for evidence destruction and collaborator cost. |
| Exit Protocol | Mandatory at MVP depth | Base ending plus variants for Alma, raw feed, resources, and disclosure choice. |

### Side Quests

All 8 raw-note side quests are included at MVP depth, but each should stay small and consequence-driven. Optional prose branches and expanded scenes may be represented lightly.

| Content | Classification | MVP handling |
| --- | --- | --- |
| S1. Cold Hands Clinic | Mandatory at MVP depth | Repair outcome affects sedatives, Keepers or Mechanical trust, and riot casualties. |
| S2. Family Ledger | Mandatory at MVP depth | Transfer record evidence supports nursery truth and emotional proof. |
| S3. Jun's Double Books | Mandatory at MVP depth | Expose, recruit, or ignore Jun; affects access and trust context. |
| S4. Broken Lesson | Mandatory at MVP depth | Help or betray Ilya; affects Keepers or Stability trust. |
| S5. Pump Six | Mandatory at MVP depth | Mechanical trust and Brant survivability support. |
| S6. Missing Watchman | Mandatory at MVP depth | Evidence path for Tovin doubt. |
| S7. Dead Garden | Mandatory at MVP depth | Orchard proof and hidden survival context. |
| S8. Last Message | Mandatory at MVP depth | Exile audio evidence and emotional route context. |

### NPCs

| Content | Classification | MVP handling |
| --- | --- | --- |
| Tomas Vale | Mandatory at MVP depth | Player character with practical voice and maintenance-driven access. |
| Brant Hollow | Mandatory at MVP depth | Mechanical anchor, survival pressure, ending stability variants. |
| Mira Senn | Mandatory at MVP depth | Missing truth-seeker, radical pressure, route tension. |
| Nera Quill | Mandatory at MVP depth | Keeper archive path and controlled truth support. |
| Director Elian Voss | Mandatory at MVP depth | Stability antagonist and preserve order path. |
| Tovin Reed | Mandatory at MVP depth | Security pursuit, doubt branch, crisis consequence. |
| Cael Dorn | Mandatory at MVP depth | Descender pressure and full exposure path. |
| Sister Ilya | Mandatory at MVP depth | Education/Keepers support and side content. |
| Jun Paret | Mandatory at MVP depth | Market hub, access broker, side content. |
| Alma Vey | Mandatory at MVP depth | Boundary evidence and Exit Protocol path. |

### Locations

All 20 raw-note locations are mandatory at MVP depth because they anchor the main scene sequence, side content, and route evidence.

| Content | Classification | MVP handling |
| --- | --- | --- |
| Level 62 manifold corridor | Mandatory at MVP depth | Opening maintenance failure. |
| Stability interview room | Mandatory at MVP depth | Tovin interrogation. |
| Mid Commons market | Mandatory at MVP depth | Hub, Jun, rumors, resources. |
| Tomas's pod | Represented lightly | Rest, notes, anonymous hooks, save context if useful. |
| Education incinerator shaft | Mandatory at MVP depth | Schematics and Ilya path. |
| Mechanical depot | Mandatory at MVP depth | Mira locker and Brant confrontation. |
| Restricted records annex | Mandatory at MVP depth | Nera and archive evidence. |
| Clinic recycler room | Mandatory at MVP depth | S1 and casualty modifier. |
| Orchard processing sublevel | Mandatory at MVP depth | Food fraud evidence. |
| Black Stair seal door | Mandatory at MVP depth | Black Levels access gate. |
| Upper Black Levels junction | Mandatory at MVP depth | Descender introduction and habitation evidence. |
| Hidden relay chamber | Mandatory at MVP depth | Mira reveal and coalition scene. |
| Nursery records ward | Mandatory at MVP depth | Population manipulation evidence. |
| Transit ambush junction | Mandatory at MVP depth | Tovin alignment. |
| Boundary service ring | Mandatory at MVP depth | Alma and raw external feed. |
| Descender assembly chamber | Mandatory at MVP depth | Route tempo conflict. |
| Pump substation | Mandatory at MVP depth | Brant survival and Mechanical trust. |
| Director Voss chamber | Mandatory at MVP depth | Stability moral confrontation. |
| Final relay core | Mandatory at MVP depth | Broadcast and final terminal. |
| External node / ending location | Mandatory at MVP depth | Exit Protocol outcome. |

### Key Items

| Content | Classification | MVP handling |
| --- | --- | --- |
| Maintenance multi-tool | Mandatory at MVP depth | Supports maintenance access and repair choices. |
| Contraband map scrap | Mandatory at MVP depth | Jun path and alternate access. |
| Paper schematics | Mandatory at MVP depth | Black Stair and Keeper proof. |
| Half override key A | Mandatory at MVP depth | Black Stair gate. |
| Half override key B | Mandatory at MVP depth | Black Stair gate. |
| Archive seal fragment | Mandatory at MVP depth | Records access and evidence credibility. |
| Orchard route ledger | Mandatory at MVP depth | Orchard truth proof. |
| Relay bypass coil | Mandatory at MVP depth | Broadcast or boundary route support. |
| Sedatives | Mandatory at MVP depth | Stress/casualty modifier from clinic path. |
| Raw sensor spool | Mandatory at MVP depth | Boundary truth and Exit Protocol support. |
| Broadcast cipher | Mandatory at MVP depth | Act IV broadcast access. |
| Exile audio file | Mandatory at MVP depth | Exile truth and emotional evidence. |

### Flags, Trust Systems, and Resources

| Content | Classification | MVP handling |
| --- | --- | --- |
| `found_b17` | Mandatory at MVP depth | Opening mystery and B-17 evidence trail. |
| `paper_schematics` | Mandatory at MVP depth | Keeper trust and Black Stair access. |
| `orchard_truth` | Mandatory at MVP depth | Food fraud evidence and route context. |
| `nursery_truth` | Mandatory at MVP depth | Population manipulation evidence. |
| `boundary_truth` | Mandatory at MVP depth | External feed truth and Exit Protocol. |
| `exile_truth` | Mandatory at MVP depth | Exile evidence and ending variants. |
| `raw_feed_obtained` | Mandatory at MVP depth | Boundary proof and route eligibility. |
| `broadcast_key` | Mandatory at MVP depth | Act IV access gate. |
| `black_stair_open` | Mandatory at MVP depth | Main progression gate. |
| `riot_level` | Mandatory at MVP depth | Crisis severity and ending cost. |
| `trust_mechanical` | Mandatory at MVP depth | System stability, Brant, crisis support. |
| `trust_stability` | Mandatory at MVP depth | Tovin/Voss access, crackdown delay, preserve order. |
| `trust_keepers` | Mandatory at MVP depth | Archive access and controlled truth support. |
| `trust_descenders` | Mandatory at MVP depth | Black Levels access and full exposure support. |
| Character states | Mandatory at MVP depth | Named states for Mira, Tovin, Brant, Nera, Alma, and Voss. |
| `clearance` | Mandatory at MVP depth | Restricted access and alternate route gating. |
| `stress` | Mandatory at MVP depth | Pressure feedback and crisis risk. |
| `supplies` | Mandatory at MVP depth | Repair, bribe, and Exit Protocol support. |
| `evidence_count` | Mandatory at MVP depth | Route gating and ending context. |
| Additional optional flavor flags | Represented lightly | Add only when needed by a required branch or validation fixture. |

### Deferred Content

| Content | Classification | Rationale |
| --- | --- | --- |
| Expanded ambient text for every location | Deferred | The MVP needs each location to function, but not exhaustive prose variants. |
| Full bespoke epilogues for every variable combination | Deferred | Endings should summarize major state groups to avoid combinatorial explosion. |
| Complex inventory management beyond key items | Deferred | Key items and evidence are enough for MVP route logic. |
| Searchable codex archive | Deferred | A simple codex/logbook satisfies MVP records. |
| Multiple save slots, autosave, rewind, chapter replay | Deferred | Single manual local save is the approved MVP assumption unless superseded. |
| Cloud saves, accounts, analytics, telemetry, hosted authoring | Deferred | Not required by the single-player static MVP. |
| Post-MVP endings beyond the four major routes | Rejected for MVP | Current accepted scope requires exactly the four route families. |
| Procedural content generation or AI-generated prose | Rejected for MVP | The MVP is authored, deterministic, and validation-driven. |
| Combat-first mechanics | Rejected for MVP | Climaxes resolve through branching scene chains and prior state. |

## Alternatives Considered

- Include all raw content at full prose depth: protects completeness, but makes the first implementation too large and risks delaying validation.
- Reduce to only the main spine and four endings: faster, but conflicts with the complete-game MVP direction and weakens faction, resource, and replay consequences.
- Defer the scope map to execution planning: rejected because architecture review identified it as a blocker for planning readiness.

## Risks and Tradeoffs

- Classifying all 22 main scenes and 8 side quests as mandatory creates a large MVP. Execution planning must still break delivery into milestones.
- MVP depth must be enforced during implementation. A mandatory item means it must exist and matter, not that every optional prose branch is complete.
- Deferrals should not be treated as approved product cuts unless a human accepts this map.

## Validation

- Check every raw-note main scene appears in the map.
- Check all 8 side quests appear in the map.
- Check all 10 major NPCs, 20 locations, 12 key items, core flags, 4 trust systems, and player resources appear in the map.
- Check every deferred item has a rationale.
- Check the four ending routes remain mandatory at MVP depth.
- Check no deferred item breaks a complete playthrough or route eligibility.

## Related Artifacts

- [Design: The Deep Vault MVP Game Architecture](the-deep-vault-mvp-game-architecture.md)
- [ExecPlan: Implement The Deep Vault Complete Game MVP](../plans/the-deep-vault-complete-game-mvp-implementation.md)
- [Validation: The Deep Vault MVP Design Validation](../validation/the-deep-vault-mvp-design-validation.md)
