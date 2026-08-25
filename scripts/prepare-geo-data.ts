/**
 * prepare-geo-data.ts
 *
 * Downloads real UK administrative boundary data from public sources and
 * converts it to the TopoJSON file used by the Historia map renderer.
 *
 * Run: bun run scripts/prepare-geo-data.ts
 *
 * Data sources:
 *   England/Wales: ONS Open Geography Portal (OGL v3)
 *   Scotland:      Scottish Government WFS (OGL Scotland)
 *   Ireland:       Natural Earth 1:10m cultural vectors (public domain)
 *
 * Output: static/data/british-isles.topo.json
 */

// See the ENGLAND_WALES_REGIONS and SCOTLAND_REGIONS maps below for the
// authority-name → region-ID dissolve mappings used to aggregate modern
// administrative units into historical region IDs.

export {};
