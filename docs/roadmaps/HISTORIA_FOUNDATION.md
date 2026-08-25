# Historia: Historia Foundation Roadmap

Establishes Historia's core: a real MapLibre-rendered map of Britain 300–1066 CE with region-accurate kingdom boundaries, a full complement of events and artefacts, polished interaction, and an early live deployment.

**Critical path:** `1MF.0 → 1MF.1 → 1MF.4 → 2CN.3 → 3UX.2 → M3 → 5HD.1 → 5HD.2`; the reference kingdom validates the whole region-to-kingdom pipeline before boundary fixes, the uncertain-borders spike, and remaining content can proceed with confidence.

---

## Milestone 1: Map Fidelity

**Goal:** Get the MapLibre renderer and region data to a trustworthy, good-looking baseline

- [ ] **1MF.0**: Establish one fully correct reference kingdom (regions dissolved correctly + complete data) to validate the region-to-kingdom pipeline end to end
- [ ] **1MF.1**: Fix remaining region boundary gaps and mismatches across the topology using the reference kingdom as the validated pattern _(blocked: depends on 1MF.0)_
- [ ] **1MF.2**: Refine atlas-style colours and coastline rendering for visual fidelity
- [ ] **1MF.3**: Pass over kingdom fill and border treatment once boundaries are correct _(blocked: depends on 1MF.1)_
- [ ] **1MF.4**: Spike: decide how to represent kingdoms/borders for periods where the historical record only supports incomplete or contested boundaries (e.g. fuzzy-edge styling, confidence bands, omission vs approximation) _(blocked: depends on 1MF.0, 1MF.1)_
  - Note: Research/design spike, not implementation; output is a decision the rest of M1/M2 border work can follow

---

## Milestone 2: Content

**Goal:** Bring events, artifacts and kingdoms data to a depth that matches the timeline's 766-year span

- [ ] **2CN.1**: Expand events.ts (currently 13 events across 300-1066 CE) with a fuller set of key historical events
- [ ] **2CN.2**: Expand artifacts.ts with more artifacts/sites across all four eras
- [ ] **2CN.3**: Fill remaining kingdoms data gaps per era using the reference kingdom's region-assignment pattern _(blocked: depends on 1MF.0, 1MF.4)_

---

## Milestone 3: UX Polish

**Goal:** Tune interaction and information density now that content and map fidelity have real data to design against

- [ ] **3UX.1**: Tune timeline scrub/playback pacing and smoothness against the expanded event set _(blocked: depends on 2CN.1)_
- [ ] **3UX.2**: Pass over sidebar/panel interaction (KingdomPanel, ArtifactPanel, lists) against realistic data density _(blocked: depends on 2CN.2, 2CN.3)_
- [ ] **3UX.3**: Refine tooltip and legend styling and behaviour
- [ ] **3UX.4**: Evaluate map interaction (zoom/pan/click/hover/period transitions) against the reference kingdom's real region geometry _(blocked: depends on 1MF.0)_

---

## Milestone 4: Deploy

**Goal:** Get a live, shareable URL up early, independent of content completeness

- [ ] **4DP.1**: Pick deploy target (Vercel or GitHub Pages) and confirm it suits SvelteKit + static topology data
- [ ] **4DP.2**: Configure the matching SvelteKit adapter for the chosen target
- [ ] **4DP.3**: Verify the build passes (svelte-kit sync + svelte-check clean), then deploy and confirm the live URL renders the map

---

## Milestone 5: Hardening

**Goal:** Confirm the phase's work holds together before calling Historia Foundation done

- [ ] **5HD.1**: Run svelte-check clean across the full app once M1-M3 have landed _(blocked: depends on M1, M2, M3)_
- [ ] **5HD.2**: Manual QA pass scrubbing the full timeline across all four eras, checking map, panels and data consistency _(blocked: depends on 5HD.1)_

---

## Dependency Diagram

```mermaid
graph LR
	classDef todo fill:#f6f6f6,stroke:#6f6f6f,color:#6f6f6f
	classDef blocked fill:#fff8f6,stroke:#e0002b,color:#e0002b,stroke-width:2px
	classDef paused fill:#fdf4ff,stroke:#b01fe3,color:#b01fe3,stroke-dasharray:4 3
	classDef deferred fill:#fff8f3,stroke:#ac5c00,color:#ac5c00,stroke-dasharray:2 4,font-style:italic
	classDef done fill:#e0ffd9,stroke:#008217,color:#008217
	classDef outOfScope fill:#f6f6f6,stroke:#e2e2e2,color:#e2e2e2,stroke-dasharray:2 2
	classDef mile fill:#e3f7ff,stroke:#007590,color:#007590,font-weight:bold
	classDef external fill:#fff9e5,stroke:#7d6f00,color:#7d6f00,stroke-dasharray:4 3,font-style:italic
	1MF.0["1MF.0: Establish one fully correct reference ki…"]
	1MF.1["1MF.1: Fix remaining region boundary gaps and m…"]
	1MF.2["1MF.2: Refine atlas-style colours and coastline…"]
	1MF.3["1MF.3: Pass over kingdom fill and border treatm…"]
	1MF.4["1MF.4: Spike: decide how to represent kingdoms/…"]
	M1["M1: Map Fidelity"]:::mile
	2CN.1["2CN.1: Expand events.ts (currently 13 events ac…"]
	2CN.2["2CN.2: Expand artifacts.ts with more artifacts/…"]
	2CN.3["2CN.3: Fill remaining kingdoms data gaps per er…"]
	M2["M2: Content"]:::mile
	3UX.1["3UX.1: Tune timeline scrub/playback pacing and…"]
	3UX.2["3UX.2: Pass over sidebar/panel interaction (Kin…"]
	3UX.3["3UX.3: Refine tooltip and legend styling and be…"]
	3UX.4["3UX.4: Evaluate map interaction (zoom/pan/click…"]
	M3["M3: UX Polish"]:::mile
	4DP.1["4DP.1: Pick deploy target (Vercel or GitHub Pag…"]
	4DP.2["4DP.2: Configure the matching SvelteKit adapter…"]
	4DP.3["4DP.3: Verify the build passes (svelte-kit sync…"]
	M4["M4: Deploy"]:::mile
	5HD.1["5HD.1: Run svelte-check clean across the full a…"]
	5HD.2["5HD.2: Manual QA pass scrubbing the full timeli…"]
	M5["M5: Hardening"]:::mile
	1MF.0 --> 1MF.1
	1MF.0 --> 1MF.4
	1MF.0 --> 2CN.3
	1MF.0 --> 3UX.4
	1MF.1 --> 1MF.3
	1MF.1 --> 1MF.4
	1MF.2 --> M1
	1MF.3 --> M1
	1MF.4 --> M1
	1MF.4 --> 2CN.3
	M1 --> 5HD.1
	2CN.1 --> M2
	2CN.1 --> 3UX.1
	2CN.2 --> M2
	2CN.2 --> 3UX.2
	2CN.3 --> M2
	2CN.3 --> 3UX.2
	M2 --> 5HD.1
	3UX.1 --> M3
	3UX.2 --> M3
	3UX.3 --> M3
	3UX.4 --> M3
	M3 --> 5HD.1
	4DP.1 --> M4
	4DP.2 --> M4
	4DP.3 --> M4
	5HD.1 --> 5HD.2
	5HD.2 --> M5
	class 1MF.0,1MF.2,2CN.1,2CN.2,3UX.3,4DP.1,4DP.2,4DP.3 todo
	class 1MF.1,1MF.3,1MF.4,2CN.3,3UX.1,3UX.2,3UX.4,5HD.1,5HD.2 blocked
```
