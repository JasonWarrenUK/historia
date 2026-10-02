# Raw geo data

Source files for `bun run geo:prepare`. They are not committed; download them here first.

## Domesday hundreds (Brookes 2020)

```zsh
mkdir -p data/raw/brookes-2020 && cd data/raw/brookes-2020
curl -LO https://archaeologydataservice.ac.uk/catalogue/adsdata/arch-3676-1/dissemination/DBhundreds.zip
unzip DBhundreds.zip
```

- Dataset: Brookes, S. (2020) *Domesday Shires and Hundreds of England* [data-set]. York: Archaeology Data Service. <https://doi.org/10.5284/1058999>
- Licence: CC BY 4.0. The map credits it through the MapLibre attribution control (`HUNDREDS_ATTRIBUTION` in `src/lib/data/geo.ts`)
- Projection: British National Grid (OSGB36); the prep script reprojects to WGS84
- Fields used: `County_1` (Domesday shire), `LAYER` (hundred name), `TerrID`

## Legacy regions

`data/legacy/british-isles.legacy.topo.json` holds the hand-drawn regions and coastline that unmigrated kingdoms still use. The prep script copies them into the output unchanged.
