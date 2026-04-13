import type { NamedContentEntry } from "../game";

export const locations: Record<string, NamedContentEntry> = {
  "location.level-62": {
    id: "location.level-62",
    name: "Level 62 Maintenance Run",
    summary: "Tomas Vale's assigned route through the pressure and coolant systems."
  },
  "location.level-17": {
    id: "location.level-17",
    name: "B-17 Archive Access",
    summary: "A level that public doctrine says cannot exist."
  }
};

export const factions: Record<string, NamedContentEntry> = {
  mechanical: {
    id: "mechanical",
    name: "Mechanical",
    summary: "Vault workers who keep the pressure, heat, and water systems alive."
  },
  stability: {
    id: "stability",
    name: "Stability Office",
    summary: "The civic order apparatus that controls doctrine and public calm."
  },
  keepers: {
    id: "keepers",
    name: "Keepers",
    summary: "Archivists who preserve forbidden records behind obedient faces."
  },
  descenders: {
    id: "descenders",
    name: "Descenders",
    summary: "Black Levels contacts who believe the vault is built on a lie."
  }
};

export const characters: Record<string, NamedContentEntry> = {
  tomas: {
    id: "tomas",
    name: "Tomas Vale",
    summary: "A systems runner whose maintenance route exposes the first contradiction."
  },
  brant: {
    id: "brant",
    name: "Brant Hollow",
    summary: "Mechanical anchor and practical survival voice."
  },
  cael: {
    id: "cael",
    name: "Cael Dorn",
    summary: "A Descender contact tied to the full exposure path."
  }
};

export const items: Record<string, NamedContentEntry> = {
  "item.b17-sensor-spool": {
    id: "item.b17-sensor-spool",
    name: "B-17 Sensor Spool",
    summary: "A maintenance component carrying impossible level telemetry."
  }
};

