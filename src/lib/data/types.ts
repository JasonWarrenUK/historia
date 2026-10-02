export type KingdomType =
	| 'roman'
	| 'briton'
	| 'saxon'
	| 'anglian'
	| 'pictish'
	| 'gaelic'
	| 'viking'
	| 'english';

export interface Ruler {
	name: string;
	// Free text, since early regnal dates are often approximate ("c. 627 to c. 630")
	reign: string;
}

export interface Source {
	citation: string;
	url?: string;
}

export interface Capital {
	name: string;
	location: [number, number];
}

export interface Kingdom {
	id: string;
	name: string;
	type: KingdomType;
	center: [number, number];
	territory: string;
	color: string;
	// Legacy region IDs or Domesday hundred IDs (`hd-<shire>-<hundred>`)
	regions: string[];
	// Disputed ground: recorded here, not rendered until roadmap 1MF.4 settles the styling
	contestedRegions?: string[];
	founded?: number;
	ended?: number;
	capital?: Capital;
	rulers?: Ruler[];
	description?: string;
	sources?: Source[];
}

export interface HistoricalPeriod {
	name: string;
	description: string;
	kingdoms: Kingdom[];
}

export type ArtifactType = 'artifact' | 'literature' | 'folklore';

export interface Artifact {
	id: string;
	name: string;
	year: number;
	location: [number, number];
	kingdom: string;
	description: string;
	image: string;
	type: ArtifactType;
}

export interface HistoricalEvent {
	year: number;
	text: string;
}

export interface KingdomTypeInfo {
	bg: string;
	label: string;
}
