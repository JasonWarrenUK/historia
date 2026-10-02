// Places whose kingdom c.700 is well attested; [lon, lat]
export const insideEastAnglia700: Record<string, [number, number]> = {
	Norwich: [1.2974, 52.6309],
	Ipswich: [1.1555, 52.0567],
	Ely: [0.2627, 52.399],
	Dunwich: [1.626, 52.277],
	Thetford: [0.75, 52.413],
	Rendlesham: [1.414, 52.13],
	KingsLynn: [0.3956, 52.7517]
};

export const outsideEastAnglia700: Record<string, [number, number]> = {
	Cambridge: [0.1218, 52.2053],
	Colchester: [0.9014, 51.8959],
	Peterborough: [-0.2402, 52.5695],
	// Contested: east of the Devil's Dyke, so recorded but not drawn
	Newmarket: [0.4078, 52.2446]
};

// Legacy hand-drawn regions that sit in two kingdoms of one period.
// Roadmap 1MF.1 migrates these to hundreds and empties this list.
export const knownLegacyDoubleAssignments: Record<number, string[]> = {
	600: ['lothian-east', 'lothian-west', 'edinburgh', 'borders']
};
