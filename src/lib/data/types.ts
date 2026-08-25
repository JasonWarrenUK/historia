export type KingdomType =
	| 'roman'
	| 'briton'
	| 'saxon'
	| 'anglian'
	| 'pictish'
	| 'gaelic'
	| 'viking'
	| 'english';

export interface Kingdom {
	id: string;
	name: string;
	type: KingdomType;
	center: [number, number];
	territory: string;
	color: string;
	regions: string[];
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
