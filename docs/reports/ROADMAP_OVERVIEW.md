# Historia: Historia Foundation Roadmap Overview

**17 tasks across 5 milestones.** Files: `.claude/roadmaps.json` (machine-readable), `docs/roadmaps/HISTORIA_FOUNDATION.md` (full task list with Mermaid dependency diagram).

---

## What we're building

Historia is an interactive map of Britain from 300 to 1066 CE, tracking kingdoms, events and artefacts from the end of Roman rule through the Norman Conquest. The renderer was recently migrated from a hand-rolled D3 SVG map to MapLibre GL over real TopoJSON boundary data, with kingdoms now defined by region IDs dissolved into polygons rather than fixed radii on a stylised map. This phase, Historia Foundation, takes that migration from "wired up" to "trustworthy and complete": correct region boundaries, real historical content across all four eras, polished interaction, and a live deployment.

The milestone structure follows a dependency the codebase itself imposes. The region-to-kingdom data pipeline (topology → region dissolve → kingdom geometry) is new and unproven at scale; before fixing it everywhere or filling in the remaining three eras of kingdom data, one kingdom is taken end to end as a reference. Content work (events, artifacts, kingdom data) and map fidelity work interleave rather than sitting in a strict sequence, so the dependency graph is wired at the task level, not the milestone level.

## Milestone sequence and the reasoning behind it

**M1 Map Fidelity** starts with a seed task (1MF.0): get one kingdom's regions and data fully correct, proving the pipeline before applying it everywhere. Region boundary fixes (1MF.1) and the visual pass on kingdom fill/borders (1MF.3) build on that proof. Atlas-style colour and coastline refinement (1MF.2) is independent, since it touches rendering rather than region data. A spike (1MF.4) sits after the reference kingdom and the boundary fixes: some kingdoms in the historical record genuinely can't be drawn with confident borders, and this phase needs a deliberate decision (confidence bands, fuzzy edges, or omission) rather than an implicit one made kingdom-by-kingdom.

**M2 Content** expands events and artifacts (independent of map work) and fills remaining kingdoms data gaps, which depends on both the reference kingdom pattern and the uncertain-borders decision from the M1 spike, since filling in kingdoms without contested borders would need redoing once that decision lands.

**M3 UX Polish** is where content and map fidelity visibly interleave: timeline pacing depends on having enough events to pace against, panel/list interaction depends on having enough artifacts and kingdom data to design against realistic density, and map interaction evaluation depends on the reference kingdom existing so there's real geometry to test zoom/pan/click against. Tooltip and legend work is independent and can proceed any time.

**M4 Deploy** is deliberately early and mostly independent: picking a target and configuring the adapter don't need to wait on content or polish. The final deploy step depends on the build passing, not on the rest of the phase being finished.

**M5 Hardening** is the closing gate: a full svelte-check pass once M1-M3 have landed, then a manual QA scrub across all four eras before calling the phase done.

## Decisions that shaped the structure

- **Reference-kingdom seed task (1MF.0).** Region boundary fixes and kingdom data gaps each want the other done first, a genuine cycle. Splitting out a small seed task, one kingdom done correctly end to end, breaks the cycle and gives both downstream tasks (and the M3 map-interaction evaluation) something real to validate against.
- **Uncertain-borders spike (1MF.4).** Some early and heptarchy-era kingdoms don't have confidently known borders in the historical record. Rather than let each content task improvise an answer, this is called out as its own research/design spike with a note marking it as non-implementation work, positioned after the tasks that establish what a "correct" border even looks like in this codebase.
- **Deploy decoupled from content completeness.** The deploy milestone was explicitly requested to run early rather than as a final gate, so a shareable live link exists well before the data and polish work is finished.

## External blockers (flag early)

None identified. All milestones depend only on other tasks within this roadmap; no external parties, unconfirmed decisions, or third-party services block the critical path.
