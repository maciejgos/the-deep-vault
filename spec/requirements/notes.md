Below is a **full original narrative package** for a text RPG in the same *kind* of mood you want, but **not set in the Silo canon**. It is designed to be detailed enough to serve as **requirements input before implementation**.

# The Deep Vault

## One-line pitch

A maintenance runner in a sealed underground habitat discovers that the society’s survival doctrine is built on curated lies, and must choose whether to reveal the truth, weaponize it, or preserve the system.

## Genre and shape

Choice-based text RPG with exploration, dialogue, faction trust, evidence gathering, and 4 major endings.

## Target playtime

One full playthrough: 5–7 hours.
Completionist run: 8–10 hours.

## Core fantasy

You are not “the chosen one.” You are a useful, low-ranking worker who gains access because systems fail, people disappear, and you learn how to listen.

---

# 1. Implementation-facing assumptions

This script assumes:

* menu-based interactions, not free-text parser
* chapter/scene structure with hubs between major scenes
* variable-driven branching
* moderate replayability through faction choices and endings
* save/load
* quest log
* codex/logbook for documents and discoveries

## Core systems needed

* location traversal
* inventory with key items
* dialogue tree engine
* quest/state flag tracking
* faction trust
* stress or pressure meter
* clearance level
* evidence count
* ending evaluation

---

# 2. World definition

## Setting

Humanity survives inside **Vault-9**, a massive underground settlement built into basalt below an ash-blasted surface. Citizens are told the surface remains lethal, history is the cause of collapse, and social order is the only protection from extinction.

## Public doctrine

Every citizen learns:

* the surface is death
* relics from before the Fall are destabilizing
* historical records are restricted for psychological safety
* obedience is civic duty
* exile is a humanitarian necessity for those who endanger the whole

## Social structure

Vault-9 is divided into five zones:

### Upper Ring

Administration, education, records, security, council chambers.

### Mid Commons

Housing, markets, clinics, ration offices, civic halls.

### Lower Mechanica

Pumps, filtration, turbines, power distribution, maintenance depots.

### Black Levels

Sealed or abandoned sectors, dead transit shafts, old storage, legacy systems.

### Boundary Ring

Outer maintenance corridor behind civic walls, sensor arrays, external relay hardware.

## Public myths

* there are no inhabitable sealed lower sectors
* no unauthorized population exists in the Black Levels
* orchard and food reports are accurate
* exile means surface release
* the outer view feed is live and unmodified

---

# 3. Player role

## Protagonist

**Tomas Vale**, age 29, Systems Runner, Lower Mechanica Liaison Route 62–70.

### Background

Raised in Mid Commons, assigned young to maintenance after aptitude testing. Knows ducts, stairwells, valves, and who pays for off-record repairs. Not politically active. Not brave by identity. Reliable under pressure.

### Initial personal stakes

* keep his job
* protect mentor Brant
* avoid Security attention
* survive the week

### Transformation

From obedient functionary to actor in a civilizational choice.

---

# 4. Core variables

These should exist as global story variables.

## Faction trust

* `trust_mechanical`
* `trust_stability`
* `trust_keepers`
* `trust_descenders`

Scale: -2 to +3 or 0 to 5.

## Character states

* `mira_state` = missing / ally / radical / estranged / dead
* `tovin_state` = hunter / doubtful / ally / dead
* `brant_state` = mentor / injured / arrested / dead
* `nera_state` = hidden / exposed / ally / arrested
* `alma_state` = hidden / cooperative / gone
* `voss_state` = untouchable / exposed / cornered / deposed

## Progress flags

* `found_b17`
* `paper_schematics`
* `orchard_truth`
* `nursery_truth`
* `boundary_truth`
* `exile_truth`
* `raw_feed_obtained`
* `broadcast_key`
* `black_stair_open`
* `riot_level`

## Player resources

* `clearance` 0–3
* `stress` 0–5
* `supplies` 0–5
* `evidence_count`

## Final route flag

* `ending_route` = controlled_truth / full_exposure / preserve_order / exit_protocol

---

# 5. Factions

## Mechanical

Workers, fixers, medics, logistics.
Primary concern: keep people alive.
Not revolutionary by instinct.
Best represented by Brant Hollow.

## Stability Office

Security and administration.
Primary concern: prevent panic and maintain continuity.
Best represented by Director Elian Voss and Investigator Tovin Reed.

## The Keepers

Quiet reformists inside archives, clinics, logistics, education.
Primary concern: preserve truth and reveal it gradually.
Best represented by Nera Quill and Sister Ilya.

## The Descenders

Radical network operating through abandoned levels.
Primary concern: tear the system open regardless of cost.
Best represented by Cael Dorn and later Mira depending on choices.

---

# 6. Main cast

## Tomas Vale

Player character. Practical, observant, initially apolitical.

## Brant Hollow

Chief mechanic for route district 60–72. Mentor figure. Blunt, protective, tired.

## Mira Senn

Former repair lead, officially missing. Smart, relentless, increasingly willing to burn the system down.

## Nera Quill

Restricted records clerk. Quiet, brilliant, anxious, morally brave in private.

## Director Elian Voss

Head of Stability. Calm, paternal, deeply manipulative, not cartoonishly evil.

## Tovin Reed

Security investigator assigned to Tomas. Severe, perceptive, capable of doubt.

## Cael Dorn

Leader among the Descenders. Charismatic, angry, strategic, believes history proves moderation fails.

## Sister Ilya

Civic educator. Publicly loyal, privately burdened by old knowledge.

## Jun Paret

Trader, smuggler, rumor-broker. Comedic relief with real value.

## Alma Vey

Boundary technician living half-off-grid in the outer ring. Knows too much about the external systems.

---

# 7. Game structure

## Prologue

1 scene.

## Act I — Fault Lines

5 core scenes.

## Act II — Hidden Records

6 core scenes.

## Act III — Black Levels

6 core scenes.

## Act IV — The Broadcast

4 core scenes plus ending.

Total main scenes: 22.

Add 8 side quests for replayability and resource/faction shaping.

---

# 8. Main scenario and playable script

## PROLOGUE

## P1. Survival Notice

**Location:** Title screen / intro
**Purpose:** Set tone and doctrine

### Intro text

“Order is life.
History is hazard.
The surface is death.
Trust the Vault.
Obey the signal.
Preserve the whole.”

### Final intro line

“You are Tomas Vale, Systems Runner, Level Route 62–70. At 06:14, a coolant manifold bursts. By the end of shift, you will hear a voice from a level that does not exist.”

Player selects:

* Begin shift
* Read civic doctrine
* Review controls

---

## ACT I — FAULT LINES

## A1. Pressure Fault

**Location:** Level 62 coolant manifold corridor
**Goal:** Inciting incident

### Scene setup

Emergency lights pulse. Steam vents. Brant is already at the panel.

### Script

**BRANT:**
“Mask on. Tools up. I don’t care what the panel says, that leak gets fixed before the pumps start coughing rust into the intake.”

**TOMAS:**
“Wasn’t Kessel team assigned?”

**BRANT:**
“Kessel team is late, missing, or lying. Move.”

Player choices:

1. Seal main leak first
2. Inspect irregular bolts on wall seam
3. Ask Brant who modified the panel
4. Call central maintenance

### Outcomes

* Choice 1: safe, low suspicion, miss first hint until later
* Choice 2: discover hidden conduit and audio fragment immediately
* Choice 3: Brant deflects; small `trust_mechanical+`
* Choice 4: Security awareness +1

If player inspects seam:

**SYSTEM:** Hidden cavity exposed. One live line detected.

Audio fragment plays:

**UNKNOWN VOICE:**
“—if anyone hears this, B-17 exists. The maps are false. Do not trust orchard totals—”

Transmission cuts.

**TOMAS:**
“Brant… did you hear that?”

**BRANT:**
“Hear what?”

Player response:

* “A voice.”
* “Nothing.”
* “What is B-17?”
* “You’re lying.”

Key flags:

* `found_b17 = true`
* `evidence_count +1`

### End beat

Security siren changes tone. Scene ends with notice:
“Incident logged as unauthorized access anomaly.”

---

## A2. Routine Questions

**Location:** Stability interview room
**Goal:** Introduce Tovin and first conceal/reveal choice

### Scene setup

A metal table, a recorder, a water cup untouched.

**TOVIN REED:**
“Routine questions. You were present during an unregistered cavity breach. Tell me what you found.”

Player choices:

1. “A damaged line and nothing else.”
2. “A hidden live conduit.”
3. “A voice recording.”
4. “Why does a nonexistent level have wiring?”

### Branching

If 1:

* `trust_stability +1`
* Tovin unconvinced
* hidden suspicion stays

If 2:
**TOVIN:**
“That is already more than your report says.”

If 3:
**TOVIN:**
“You should understand curiosity is one of the ways people volunteer to disappear.”

If 4:
**TOVIN:**
“That sounded prepared. Which means someone has already reached out to you.”

Player can press:

* “What is B-17?”
* “What happens to missing workers?”
* “Am I in trouble?”
* Stay silent

### End beat

Tovin dismisses Tomas but says:
“You are free to return to duty. That is not the same as being unwatched.”

Flags:

* Security awareness set
* Tovin begins tracking player

---

## A3. Shift’s End Market

**Location:** Mid Commons market
**Goal:** Open hub play, rumors, Jun introduction

### Scene content

Player can visit:

* Jun’s stall
* ration window
* clinic bench
* stairwell notice board
* home pod

### Jun scene

**JUN PARET:**
“You look like a man who heard a thing he shouldn’t. Lucky for you, I specialize in both forgetting and remembering.”

Choices:

* ask about missing workers
* ask about forbidden levels
* buy contraband map scrap
* ignore him

Buying map scrap gives partial route to archive furnace chute.

### Clinic bench

Overhear two workers mention **Mira Senn**, missing repair lead, last seen arguing over orchard intake figures.

### Notice board

Report about “temporary instructional shortage” in education and “recalibration of orchard yields.”

Flags:

* clue trail toward Mira
* `supplies` adjustments possible

---

## A4. Ash in the Furnace

**Location:** School waste incinerator shaft
**Goal:** Recover paper schematics

### Hook

Anonymous note appears under Tomas’s door:
“If you heard B-17, check what the children were told to burn.”

### Scene

Player sneaks to education sector at night.

Obstacles:

* avoid patrol
* persuade Sister Ilya
* brute-force grate
* bribe janitor via Jun

### If Sister Ilya confronted

**SISTER ILYA:**
“You should not be here. Which means someone decided you should.”

Player choices:

* “Help me.”
* “What are they burning?”
* “Mira sent me.”
* “I’m leaving.”

If helped, Ilya gives access and warning:
“Paper exists when records are meant to vanish quietly.”

Player recovers:

* hand-drawn maintenance route
* annotation: `B-17 / Black Stair / intake mismatch / don’t trust orchard`

Flags:

* `paper_schematics = true`
* `trust_keepers +1` if Ilya assisted

---

## A5. Missing Shift

**Location:** Mechanical depot and Mira’s former workstation
**Goal:** Move mystery from abstract to personal

### Scene

Tomas searches Mira’s locker.

Findings:

* disassembled relay
* half of an override key
* list of food totals vs ration allocations
* note: “Brant knows enough to be afraid.”

### Brant confrontation

**TOMAS:**
“You knew Mira was digging into this.”

**BRANT:**
“I knew she stopped acting like a worker and started acting like a martyr.”

Player choices:

1. “Tell me what she found.”
2. “You let her disappear.”
3. “Help me finish what she started.”
4. “I’m done.”

If 1 or 3:
**BRANT:**
“She thought orchard numbers were fiction. Thought sealed levels weren’t empty. Thought too much, too loudly.”

If 2:
**BRANT:**
“In this place, there are only two kinds of people who say ‘let.’ The powerful and the naive. I was neither.”

End beat:
Brant hands over the second half of the override key if trust is sufficient; otherwise it must be stolen later.

Flags:

* route to Black Stair unlocked
* deeper commitment begins

---

## ACT II — HIDDEN RECORDS

## B1. A Clerk in Restricted Light

**Location:** Records annex, Upper Ring
**Goal:** Meet Nera Quill and learn about the Keepers

### Setup

Using forged or borrowed clearance, Tomas reaches restricted records.

**NERA QUILL:**
“You are either very brave or very badly informed.”

**TOMAS:**
“I’m looking for B-17.”

**NERA:**
“Then you are badly informed.”

Player choices:

* show paper schematics
* mention Mira
* lie and ask about orchard reports
* threaten exposure

Best route: show schematics.

**NERA:**
“That should not exist.”

She explains:

* map indices have been altered for years
* certain level references vanish between record generations
* orchard reports are summarized, not auditable
* someone in Stability signs archival redactions personally

Flags:

* `trust_keepers +1`
* receive archive seal fragment
* quest to compare orchard and ration data

---

## B2. Clinic Recycler

**Location:** Mid Commons clinic
**Goal:** First major side-choice with lasting impact

The clinic recycler fails. Player can:

* repair it immediately
* prioritize investigation elsewhere
* demand payment/bribe
* use failure to create distraction

If repaired:

* `trust_mechanical +1`
* Sister Ilya approves
* clinic gives sedatives lowering `stress`
* later riot casualties reduced

This doubles as side quest but works well as mandatory early systems test.

---

## B3. Orchard Numbers

**Location:** Food processing sublevel
**Goal:** Confirm public data is false

### Scene

Player infiltrates processing ledgers.

Possible approaches:

* technical route through vents
* social route via ration clerk
* forged order from Security
* Descender contact sabotage

Documents reveal:

* public orchard yield is inflated
* extra allocation goes somewhere unlisted
* hidden population support or reserve program exists

### Script fragment

**TOMAS (reading):**
“Output: 14,200 units. Public issue: 11,800. Reserve routing: redacted.”

**WORKER NPC:**
“Don’t stare at totals too long. That’s how your face starts showing up in closed files.”

Flags:

* `orchard_truth = true`
* `evidence_count +1`

---

## B4. The Black Stair

**Location:** sealed stairwell shaft
**Goal:** open route to Black Levels

### Mechanics

Player needs:

* both key halves
* power routing
* optional helper

Possible allies:

* Brant
* Jun
* Nera
* Descender contact

### Script

As the door opens:

**SYSTEM:**
Access corridor not listed in current route index.

**JUN (if present):**
“Nothing makes me feel alive like opening a door the government swears isn’t there.”

**BRANT (if present):**
“If this kills us, I want it noted somewhere official that I objected.”

Flags:

* `black_stair_open = true`

### End beat

A radio whisper:
“Turn back if you still belong to the upper maps.”

---

## B5. First Descent

**Location:** upper Black Levels
**Goal:** introduce Descenders and environmental storytelling

### Environment

Cold corridors, dead signs, hand-painted arrows, improvised lamps.

Player encounters signs of life:

* repaired bunks
* hidden school wall
* fungus farm trays
* names etched into steel

### Cael introduction

**CAEL DORN:**
“You climbed down from the lie. Good. Now decide whether you came for truth or permission.”

Choices:

* “I came for Mira.”
* “I came for answers.”
* “I came by mistake.”
* “I’m not joining anything.”

Cael reveals:

* Black Levels are inhabited by unofficial descendants of vanished citizens
* Stability selectively erases people and repurposes labor
* Mira passed through and went deeper

Flags:

* `trust_descenders` starts based on tone
* player receives route to lower cache

---

## B6. The Woman Who Refused to Die

**Location:** hidden relay chamber
**Goal:** meet Mira

### Scene

Mira appears while Tomas studies a hacked wall display.

**MIRA SENN:**
“You took longer than I hoped and less time than I feared.”

**TOMAS:**
“You were declared dead.”

**MIRA:**
“That made meetings easier.”

Player choices:

1. “Start explaining.”
2. “You used me.”
3. “I need proof.”
4. “Come back with me.”

### Mira’s main reveal

* she found evidence of false food reports and altered maps
* exile is not always surface release
* some “disappearances” were rerouted below
* there may be functioning outer systems not shown to the public

### Core dialogue

**MIRA:**
“Everything here is engineered twice. Once for survival, once for obedience.”

**TOMAS:**
“So what do you want?”

**MIRA:**
“The truth in the open. All of it.”

Player can respond:

* “Carefully.”
* “Immediately.”
* “Not without proof.”
* “You sound like Cael.”

This sets future `mira_state`.

---

## ACT III — BLACK LEVELS

## C1. Nursery Ghosts

**Location:** sealed childcare records ward
**Goal:** discover population manipulation

### Setup

Mira or Nera directs Tomas to a buried records bank.

Player finds:

* birth allocation lists
* reassignment notes
* “psychological continuity” directives
* names of children transferred without family consent

This reveals a controlled population program and that some families were split deliberately.

### Script

**TOMAS (reading):**
“Infant placement variance approved under continuity provisions…”

**MIRA:**
“They didn’t just ration food. They rationed inheritance.”

Flags:

* `nursery_truth = true`
* large emotional escalation
* `stress +1`

---

## C2. A Good Man With a Badge

**Location:** transit junction ambush
**Goal:** resolve Tovin’s alignment

Tovin tracks Tomas to the lower access.

**TOVIN:**
“You keep walking into closed spaces and somehow expect them not to close behind you.”

Player choices:

1. hand over one piece of evidence
2. lie and stall
3. accuse him of knowing already
4. ask about his sister

If asked about sister, he reveals:

* she vanished after filing a grievance about transfer records
* official record contradicts witness testimony

This is the key to turning him.

**TOMAS:**
“If you want the truth, stop hunting me and start reading what they buried.”

**TOVIN:**
“If I do that, there may be no road back.”

Possible outcomes:

* Tovin remains hunter
* Tovin becomes doubtful
* Tovin becomes ally if enough evidence shared

Flags:

* `tovin_state`

---

## C3. The Boundary Technician

**Location:** outer relay service ring
**Goal:** meet Alma and uncover manipulated external feed

### Setup

Through dead corridors and pressure doors, Tomas reaches the boundary service ring. Alma threatens him first.

**ALMA VEY:**
“One more step and I vent this corridor and let history keep its distance.”

Player choices:

* identify as maintenance
* mention Mira
* mention raw signal
* lie as Stability courier

Best route is honesty plus proof.

Alma reveals:

* public exterior imagery is filtered
* not every official “surface view” is live
* atmospheric status is more complicated than doctrine allows
* the system can display hope, terror, or static depending on policy

She gives access to raw external sensor spool if trust gained.

**ALMA:**
“They don’t just hide the world. They edit what fear is allowed to look like.”

Flags:

* `boundary_truth = true`
* `raw_feed_obtained = true`

---

## C4. The Price of Fire

**Location:** Descender assembly
**Goal:** force player to choose tempo and ethics

Cael demands immediate action. Mira leans toward him unless previously moderated.

**CAEL:**
“Enough archives. Enough whispers. We break the screens, flood the speakers, open the sealed stairs, and let the lie drown in daylight.”

**NERA** or **ILYA** if present:
“And then what? Panic, shortages, stampedes?”

Player choices:

1. support gradual release
2. support full broadcast
3. delay decision and gather more
4. secretly report meeting to Voss

This determines faction paths and possible scene variants.

Flags:

* `ending_route` tendency
* `riot_level` base

---

## C5. Brant’s Line

**Location:** Mechanical substation during sabotage threat
**Goal:** make survival vs revolution tangible

A sabotage attempt hits a power relay. Could be Descenders, false flag, or panicked citizens based on prior choices.

Brant is trying to keep the pumps alive.

**BRANT:**
“I don’t care who wins the argument if the air dies first.”

Player actions:

* help Brant stabilize relay
* chase saboteur
* use crisis to steal access
* broadcast local warning

If player helps:

* Brant survives and supports final plan
* riot casualties reduced

If player leaves:

* Brant may be injured or die
* Mechanical trust drops

This scene is key for emotional grounding.

---

## C6. Audience With Director Voss

**Location:** private administrative chamber
**Goal:** central moral confrontation

Voss invites Tomas, meaning he knows enough and still prefers conversation to force.

### Script core

**VOSS:**
“You think truth is oxygen. It isn’t. Truth is fire. Useful in the furnace. Fatal in a crowded room.”

**TOMAS:**
“So the answer was to build a civilization on edited memory?”

**VOSS:**
“No. The answer was sequence. Timing. Containment. A frightened population does not become free. It becomes violent.”

Player choices:

1. “People deserve the choice.”
2. “How many died for your timing?”
3. “What is the surface really like?”
4. “Maybe you’re right.”

Voss reveals:

* several unrest cycles nearly destroyed Vault-9 before the current doctrine
* exile practices varied over generations
* sealed levels house those the system could not publicly justify
* the outside may be survivable in limited ways, but uncertainty alone could collapse order

This is not full absolution; it is his best case.

Possible secret route:
If player aligns with him, he offers Tomas a place in a new continuity office.

Flags:

* `voss_state = cornered` or alliance path
* sets stage for final act

---

## ACT IV — THE BROADCAST

## D1. Choosing the Coalition

**Location:** hidden relay chamber / safe room
**Goal:** lock route to ending

Depending on trust and prior choices, available allies differ.

Possible allies:

* Brant
* Mira
* Nera
* Tovin
* Sister Ilya
* Alma
* Jun

Unavailable or hostile based on previous actions:

* Cael if betrayed
* Tovin if deceived repeatedly
* Mira if player supported Voss too openly
* Nera if archives exposed recklessly

Player must choose primary strategy:

1. controlled release through multiple channels
2. full system-wide exposure
3. suppress evidence and restore order
4. route power to boundary launch/external contact system

Set `ending_route` definitively.

---

## D2. The Night of Open Speakers

**Location:** Vault-wide emergency state
**Goal:** execution mission

Each route has a different mission objective.

### Route A — Controlled Truth

Objectives:

* secure broadcast hub
* protect food distribution
* publish curated archive package
* keep Cael from detonating panic charges

### Route B — Full Exposure

Objectives:

* seize tower uplink
* defeat or bypass Security
* upload raw feed, nursery files, orchard data, exile records
* physically open Black Stair to public

### Route C — Preserve Order

Objectives:

* locate and destroy raw sensor spool
* arrest or expose Mira/Cael/Nera
* lock Black Stair
* broadcast calming false continuity message

### Route D — Exit Protocol

Objectives:

* route power to dormant outer communications node
* bypass both Stability and Descenders
* choose what to tell the Vault before leaving or signaling out

---

## D3. Crisis Scene Variants

This is the action-heavy climax. It should be implemented as branching scene chains, not combat-heavy mechanics.

### Example beats

* crowd surge at ration hall
* Security sealing stairwells
* Mechanical threatens shutdown unless civilians moved
* Descenders trying to arm workers
* children trapped in education block
* Voss ordering controlled blackout
* Tovin choosing side publicly
* Mira making a point-of-no-return decision

### Key use of prior variables

* high `trust_mechanical` keeps systems stable
* high `trust_keepers` enables calm public messaging
* high `trust_descenders` enables access to lower routes
* high `trust_stability` gives codes and delays crackdown
* clinic repaired earlier reduces deaths
* Brant alive prevents total pump failure
* Tovin ally avoids massacre in one corridor
* Alma cooperative enables raw feed validation

---

## D4. Final Choice Terminal

**Location:** central relay / tower / boundary node
**Goal:** last irreversible choice

The player stands at the terminal with evidence and allies.

Possible present characters differ by route. Example for mixed route:

**MIRA:**
“If you hesitate now, they take it back.”

**NERA:**
“If you rush, we lose people who never chose this.”

**VOSS:**
“If you press that, you do not free them. You abandon them.”

**TOVIN:**
“No more abstractions. Pick.”

Final options:

* Broadcast summary + phased disclosure plan
* Broadcast everything raw
* Erase evidence and restore official doctrine
* Trigger boundary contact / open external protocol

---

# 9. Endings

## ENDING A — Controlled Truth

**Theme:** Reform, compromise, burden

### Conditions

* route selected
* Keepers and Mechanical sufficiently supportive
* Brant or Tovin alive helps stability

### Ending script

Archive excerpts, orchard fraud, transfer abuses, and map falsifications are released in phases across civic channels. Public trust shatters but does not collapse at once. Emergency councils form. Ration lines are guarded by mechanics, not soldiers. The Black Stair is opened under watch.

**NERA (broadcast):**
“This record was hidden from you. Not because you were weak, but because someone feared what choice would cost.”

**MIRA** may stay and argue the release is too slow, or leave in disgust if highly radicalized.

**VOSS** is arrested, resigns, or disappears depending on prior confrontation.

### Final tone

Difficult hope. Truth as institution-building, not explosion.

---

## ENDING B — Full Exposure

**Theme:** Freedom, rupture, consequence

### Conditions

* route selected
* strong Descender support
* raw feed and archive package intact

### Ending script

All hidden records flood the Vault at once: falsified yields, population directives, transfer files, altered maps, filtered external feeds. Crowds seize stairs. Security fractures. Fires break out in Mid Commons. The Black Levels emerge into public history in a single night.

**MIRA (broadcast):**
“No more guardians. No more timing. No more edited memory. Let every citizen decide what kind of world this is.”

**CAEL** is triumphant, but the aftermath is chaotic. Depending on support systems, the cost may be catastrophic.

### Final tone

Violent liberation. History returned all at once.

---

## ENDING C — Preserve Order

**Theme:** Continuity, guilt, self-betrayal

### Conditions

* player sides with Voss or chooses suppression late
* destroys or seals critical evidence

### Ending script

The public receives a calm message about sabotage, misinformation, and anti-civic agitation. The Black Stair is resealed. Witnesses vanish. Tomas is offered a continuity role or returns silently to maintenance with a better apartment and a worse conscience.

**VOSS:**
“You have done an ugly thing for a beautiful reason. That is governance.”

**TOMAS narration:**
“The pumps ran. The lights held. The children slept. Somewhere below, memory learned to stay quiet again.”

### Final tone

Stable and morally corrosive.

---

## ENDING D — Exit Protocol

**Theme:** Discovery, uncertainty, transcendence

### Conditions

* raw feed + boundary access + Alma cooperation
* route selected
* enough power/resources to trigger node

### Ending script

Instead of centering the internal regime, Tomas routes power to an ancient boundary communications system and receives a reply, or opens a path suggesting other habitats or survivable surface zones may exist. He can broadcast this to everyone, tell only a small circle, or go alone with one companion.

Possible variants:

* Tomas and Mira leave
* Tomas and Alma stay at boundary
* Tomas broadcasts existence of others
* Tomas keeps it secret to avoid immediate collapse

**ALMA:**
“The cruelest prison is the one that convinces itself it is the last room in existence.”

### Final tone

Open future. The truth becomes larger than Vault-9’s politics.

---

# 10. Full side quest pack

These should shape resources, trust, and ending variants.

## S1. Cold Hands Clinic

Repair recycler in clinic.
Reward: sedatives, Keepers trust, lower riot casualties.

## S2. Family Ledger

Recover a hidden family transfer record for an old woman in Mid Commons.
Reward: evidence, emotional proof of reassigned children.

## S3. Jun’s Double Books

Discover Jun sells to both Security and Descenders.
Choice: expose, recruit, or ignore.
Reward: access or cleaner conscience.

## S4. Broken Lesson

Help Sister Ilya hide banned teaching material or turn her in.
Reward: Keepers trust or Stability trust.

## S5. Pump Six

Stabilize lower pump under time pressure.
Reward: Mechanical trust, Brant survives later more easily.

## S6. Missing Watchman

Find body or logs of a vanished security watchman.
Reward: Tovin doubt +1.

## S7. Dead Garden

Visit an abandoned hydroponics block in Black Levels and learn hidden population survived on scraps.
Reward: orchard proof.

## S8. Last Message

Recover an old exile audio file.
Reward: `exile_truth = true`, major emotional evidence.

---

# 11. NPC arc details

## Brant Hollow

### Arc

Pragmatic survivor -> reluctant witness -> moral anchor

### Best ending role

Leads life-support stabilization during transition

### Worst ending role

Dies maintaining systems while ideologues argue

## Mira Senn

### Arc

Missing truth-seeker -> ally -> possible radical foil

### Best ending role

Public investigator or co-founder of truth commission

### Worst ending role

Martyr or extremist whose methods taint the cause

## Nera Quill

### Arc

Fearful archivist -> active reformist

### Best ending role

Keeper of the restored public archive

### Worst ending role

Arrested and erased before the truth lands

## Elian Voss

### Arc

Composed steward -> exposed architect of managed reality

### Best ending role

Publicly judged, not simplistically demonized

### Worst ending role

Escapes into another continuity apparatus

## Tovin Reed

### Arc

Pursuer -> truth-seeking skeptic -> ally or execution arm

### Best ending role

Prevents civil massacre by refusing illegal order

### Worst ending role

Kills or arrests key allies in the climax

## Alma Vey

### Arc

Ghost on the boundary -> witness of the wider world

### Best ending role

Opens the future

### Worst ending role

Disappears with the only raw truth left

---

# 12. Location list for implementation

Minimum set:

1. Level 62 manifold corridor
2. Stability interview room
3. Mid Commons market
4. Tomas’s pod
5. Education incinerator shaft
6. Mechanical depot
7. Restricted records annex
8. Clinic recycler room
9. Orchard processing sublevel
10. Black Stair seal door
11. Upper Black Levels junction
12. Hidden relay chamber
13. Nursery records ward
14. Transit ambush junction
15. Boundary service ring
16. Descender assembly chamber
17. Pump substation
18. Director Voss chamber
19. Final relay core
20. External node / ending location

---

# 13. Key items

1. Maintenance multi-tool
2. Contraband map scrap
3. Paper schematics
4. Half override key A
5. Half override key B
6. Archive seal fragment
7. Orchard route ledger
8. Relay bypass coil
9. Sedatives
10. Raw sensor spool
11. Broadcast cipher
12. Exile audio file

---

# 14. Dialogue voice guide

## Tomas

Short, practical, more observant than eloquent.

## Brant

Dry, blunt, labor-first.

## Mira

Precise, sharp, intense, little patience for cowardice.

## Nera

Careful, analytical, slightly breathless when stressed.

## Voss

Elegant, controlled, persuasive, never theatrical.

## Tovin

Spare, formal, increasingly human once he trusts.

## Cael

Charged, rhetorical, revolutionary.

## Ilya

Warm, sorrowful, ethically alert.

## Jun

Playful, evasive, unexpectedly sincere in flashes.

## Alma

Hard-edged, isolated, technically exact.

---

# 15. Scene-by-scene requirement summary

This is the compact version you can hand to implementation planning.

## Required main content

* 22 main scenes
* 8 side quests
* 10 major NPCs
* 4 endings
* 20 locations
* 12 key items
* 15–20 global flags
* 4 trust systems
* 3–5 resource meters

## Required choice patterns

* conceal vs reveal
* caution vs escalation
* survival vs idealism
* individual loyalty vs public truth
* reform vs revolution vs continuity vs exit

## Required branch logic

* early lies change Tovin route
* clinic/pump repairs change casualty outcomes
* Mira alignment changes radical pressure
* Brant survival changes system stability
* Nera trust changes archive access
* Alma access changes Exit Protocol availability
* Jun/Ilya side quests alter route access and trust

---

# 16. Recommended chapter packaging for build

## Milestone 1

Prologue + Act I
Goal: playable 60–90 minute vertical slice

## Milestone 2

Act II with Nera, orchard data, Black Stair
Goal: full midgame investigation loop

## Milestone 3

Act III with boundary and Voss confrontation
Goal: all truth pillars discovered

## Milestone 4

Act IV and all endings
Goal: complete replayable release

---

# 17. What this gives you as requirements

This narrative package defines:

* protagonist, stakes, and world
* chapter flow
* all major locations
* all major NPCs
* main quest line
* side content
* player variables
* branching logic
* ending conditions
* tone and dialogue style

So from here you can derive:

* content schema
* quest/state machine
* dialogue JSON
* location graph
* save model
* UI requirements
* playtest checklist

---