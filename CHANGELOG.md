<!-- doc-changelog: generated 2026-10-03. Delete this line once you hand-edit this file. -->
# Changelog

All notable changes to this project are recorded here, in the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

## [Unreleased]

## [0.1.0] - 2026-10-02

First tagged release.

### Added

- Interactive map of the British Isles from 300 to 1066 CE, with a timeline, kingdom and artefact panels and event and artefact lists
- Kingdom borders drawn from region boundaries, with kingdoms split by historical era
- East Anglia in 700 CE as the reference kingdom, drawn from Domesday hundreds (Brookes 2020, CC BY 4.0), with dates, royal centre, rulers, description and sources in its panel
- Map attribution crediting the Domesday boundary dataset
- Vitest suite that checks every period's region data and the East Anglia reference kingdom in detail
- `bun run geo:prepare` rebuilds the map data from the Domesday shapefiles

### Changed

- Map renderer moved from D3 SVG to MapLibre GL, with a parchment theme
- Each kingdom now gets one map label, placed at its centre, where a kingdom drawn in several pieces used to get one per piece

[Unreleased]: https://github.com/JasonWarrenUK/historia/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/JasonWarrenUK/historia/releases/tag/v0.1.0
