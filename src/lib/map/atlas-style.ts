// Atlas colour palette — early 20th century cartographic aesthetic
export const ATLAS_COLORS = {
	ocean: '#c8d8e8',
	land: '#f2e8d5',
	landShadow: 'rgba(100, 80, 50, 0.15)',
	coastStroke: '#8B7355',
	coastInnerHighlight: 'rgba(255,250,240,0.4)',
	riverBlue: '#7BA7BC',
	kingdomOutline: '#5C4A2A',
	kingdomLabel: '#3C2A1A',
	labelHalo: 'rgba(242, 232, 213, 0.85)',
	selectionRing: '#8B4513',
	landTexture: 'rgba(180, 140, 80, 0.04)',
} as const;

// Atlas stroke widths
export const ATLAS_WIDTHS = {
	coastStroke: 1.5,
	coastInnerHighlight: 0.5,
	coastShadow: 3.0,
	river: 0.8,
	kingdomOutline: 1.0,
	selectionDash: 2.5,
} as const;

// Atlas opacity values
export const ATLAS_OPACITIES = {
	river: 0.6,
	kingdomFill: 0.35,
	kingdomOutline: 0.7,
	coastShadow: 0.4,
	selectionRing: 0.9,
} as const;
