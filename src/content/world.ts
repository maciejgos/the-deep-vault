import type { NamedContentEntry } from "../game";

function entry(id: string, name: string, summary: string): NamedContentEntry {
  return { id, name, summary };
}

export const locations: Record<string, NamedContentEntry> = {
  "location.level-62-manifold": entry("location.level-62-manifold", "Level 62 Manifold Corridor", "Opening maintenance failure and B-17 pressure clue."),
  "location.stability-interview": entry("location.stability-interview", "Stability Interview Room", "Tovin's first attempt to contain Tomas's report."),
  "location.mid-commons-market": entry("location.mid-commons-market", "Mid Commons Market", "Hub for rumors, Jun, resources, and route hooks."),
  "location.tomas-pod": entry("location.tomas-pod", "Tomas's Pod", "Lightly represented rest and save context."),
  "location.education-incinerator": entry("location.education-incinerator", "Education Incinerator Shaft", "Paper schematics and Sister Ilya's lesson path."),
  "location.mechanical-depot": entry("location.mechanical-depot", "Mechanical Depot", "Mira's locker and Brant's survival pressure."),
  "location.restricted-records": entry("location.restricted-records", "Restricted Records Annex", "Nera's archive redactions and Keeper proof."),
  "location.clinic-recycler": entry("location.clinic-recycler", "Clinic Recycler Room", "Cold Hands Clinic consequence and sedatives."),
  "location.orchard-processing": entry("location.orchard-processing", "Orchard Processing Sublevel", "Food fraud and hidden population evidence."),
  "location.black-stair-door": entry("location.black-stair-door", "Black Stair Seal Door", "Main access gate into the Black Levels."),
  "location.upper-black-levels": entry("location.upper-black-levels", "Upper Black Levels Junction", "Descender habitation and Cael's introduction."),
  "location.hidden-relay": entry("location.hidden-relay", "Hidden Relay Chamber", "Mira reveal and coalition pressure."),
  "location.nursery-records": entry("location.nursery-records", "Nursery Records Ward", "Population manipulation evidence."),
  "location.transit-ambush": entry("location.transit-ambush", "Transit Ambush Junction", "Tovin's alignment branch."),
  "location.boundary-ring": entry("location.boundary-ring", "Boundary Service Ring", "Alma and manipulated external feed evidence."),
  "location.descender-assembly": entry("location.descender-assembly", "Descender Assembly Chamber", "Tempo conflict over fire and exposure."),
  "location.pump-substation": entry("location.pump-substation", "Pump Substation", "Brant survival and Mechanical trust."),
  "location.voss-chamber": entry("location.voss-chamber", "Director Voss Chamber", "Continuity argument and suppression path."),
  "location.final-relay-core": entry("location.final-relay-core", "Final Relay Core", "Broadcast and final terminal."),
  "location.external-node": entry("location.external-node", "External Node", "Exit Protocol outcome location.")
};

export const factions: Record<string, NamedContentEntry> = {
  mechanical: entry("mechanical", "Mechanical", "Vault workers who keep pressure, heat, and water systems alive."),
  stability: entry("stability", "Stability Office", "The civic order apparatus that controls doctrine and public calm."),
  keepers: entry("keepers", "Keepers", "Archivists who preserve forbidden records behind obedient faces."),
  descenders: entry("descenders", "Descenders", "Black Levels contacts who believe the vault is built on a lie.")
};

export const characters: Record<string, NamedContentEntry> = {
  tomas: entry("tomas", "Tomas Vale", "A systems runner whose maintenance route exposes the first contradiction."),
  brant: entry("brant", "Brant Hollow", "Mechanical anchor, survival pressure, and ending stability variant."),
  mira: entry("mira", "Mira Senn", "Missing truth-seeker whose survival drives route tension."),
  nera: entry("nera", "Nera Quill", "Keeper archivist who can support controlled truth."),
  voss: entry("voss", "Director Elian Voss", "Stability antagonist and preserve order path."),
  tovin: entry("tovin", "Tovin Reed", "Security officer with a doubt branch and crisis consequence."),
  cael: entry("cael", "Cael Dorn", "Descender pressure and full exposure advocate."),
  ilya: entry("ilya", "Sister Ilya", "Education worker tied to Keeper support and side content."),
  jun: entry("jun", "Jun Paret", "Market access broker with double books."),
  alma: entry("alma", "Alma Vey", "Boundary technician tied to Exit Protocol evidence.")
};

export const items: Record<string, NamedContentEntry> = {
  "item.maintenance-multitool": entry("item.maintenance-multitool", "Maintenance Multi-Tool", "Supports maintenance access and repair choices."),
  "item.contraband-map-scrap": entry("item.contraband-map-scrap", "Contraband Map Scrap", "Jun's alternate access route."),
  "item.paper-schematics": entry("item.paper-schematics", "Paper Schematics", "Keeper proof and Black Stair support."),
  "item.override-key-a": entry("item.override-key-a", "Half Override Key A", "First Black Stair gate half."),
  "item.override-key-b": entry("item.override-key-b", "Half Override Key B", "Second Black Stair gate half."),
  "item.archive-seal-fragment": entry("item.archive-seal-fragment", "Archive Seal Fragment", "Credibility marker for restricted records."),
  "item.orchard-route-ledger": entry("item.orchard-route-ledger", "Orchard Route Ledger", "Food fraud and orchard proof."),
  "item.relay-bypass-coil": entry("item.relay-bypass-coil", "Relay Bypass Coil", "Broadcast or boundary route support."),
  "item.sedatives": entry("item.sedatives", "Sedatives", "Stress and casualty modifier from clinic work."),
  "item.raw-sensor-spool": entry("item.raw-sensor-spool", "Raw Sensor Spool", "Boundary truth and Exit Protocol support."),
  "item.broadcast-cipher": entry("item.broadcast-cipher", "Broadcast Cipher", "Act IV broadcast access gate."),
  "item.exile-audio-file": entry("item.exile-audio-file", "Exile Audio File", "Emotional proof of the external lie.")
};
