import type { HistoricalPeriod } from './types.js';

// Region IDs map to geographic areas in static/data/british-isles.topo.json.
// At render time, a kingdom's regions are dissolved (merged) into a single polygon.
//
// England regions available:
//   cornwall, devon, somerset, dorset, wiltshire, hampshire,
//   sussex-west, sussex-east, kent, surrey, middlesex, berkshire,
//   buckinghamshire, oxford, hertfordshire, essex, suffolk, norfolk,
//   cambridgeshire, bedfordshire, northamptonshire, leicestershire,
//   lincolnshire, nottinghamshire, derbyshire, staffordshire, warwickshire,
//   worcestershire, herefordshire, gloucestershire, shropshire, cheshire,
//   merseyside, greater-manchester, lancashire,
//   yorkshire-south, yorkshire-west, yorkshire-east, yorkshire-north,
//   cumbria, durham, northumberland
//
// Wales regions:
//   monmouthshire, glamorgan-east, glamorgan-mid, glamorgan-vale,
//   swansea-area, carmarthenshire, pembrokeshire, ceredigion,
//   powys-historic, clwyd, gwynedd-historic
//
// Scotland regions:
//   dumfries-galloway, borders, lothian-east, lothian-west, edinburgh,
//   lanarkshire, glasgow, renfrewshire, ayrshire, falkirk, stirling,
//   fife, perth-kinross, dundee, angus, argyll, moray, aberdeen-city, highland
//
// Ireland: ireland

export const earlyPeriods: Record<number, HistoricalPeriod> = {

	// ═══════════════════════════════════════════════════════════════════════
	// 300 CE — Late Roman Britain
	// Four Roman provinces + Caledonia (S Scotland) + Pictland (N Scotland)
	// ═══════════════════════════════════════════════════════════════════════
	300: {
		name: 'Late Roman Britain',
		description:
			'Rome governs Britain as four provinces stretching from the Channel to Hadrian\'s Wall. Beyond the wall, Pictish tribes control Scotland.',
		kingdoms: [

			// BRITANNIA PRIMA — SW England + Wales
			{
				id: 'britannia-prima',
				name: 'Britannia Prima',
				type: 'roman',
				center: [-3.5, 51.8],
				territory: 'South-west England and Wales',
				color: '#8B6F5E',
				regions: [
					// Wales
					'gwynedd-historic', 'clwyd', 'powys-historic',
					'ceredigion', 'pembrokeshire', 'carmarthenshire',
					'swansea-area', 'glamorgan-vale', 'glamorgan-mid', 'glamorgan-east',
					'monmouthshire',
					// SW England
					'cornwall', 'devon', 'somerset', 'gloucestershire', 'herefordshire'
				],
			},

			// MAXIMA CAESARIENSIS — SE England + East Anglia
			{
				id: 'maxima-caesariensis',
				name: 'Maxima Caesariensis',
				type: 'roman',
				center: [-0.1, 51.8],
				territory: 'South-east England and East Anglia',
				color: '#9B7F6E',
				regions: [
					'kent', 'sussex-east', 'sussex-west', 'surrey', 'hampshire',
					'middlesex', 'essex', 'hertfordshire',
					'suffolk', 'norfolk', 'cambridgeshire', 'bedfordshire'
				],
			},

			// FLAVIA CAESARIENSIS — Midlands
			{
				id: 'flavia-caesariensis',
				name: 'Flavia Caesariensis',
				type: 'roman',
				center: [-1.0, 52.5],
				territory: 'Midlands of England',
				color: '#AB8F7E',
				regions: [
					'oxford', 'berkshire', 'wiltshire', 'buckinghamshire',
					'northamptonshire', 'warwickshire', 'leicestershire',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'staffordshire', 'worcestershire', 'shropshire', 'cheshire', 'dorset'
				],
			},

			// BRITANNIA SECUNDA — Northern England
			{
				id: 'britannia-secunda',
				name: 'Britannia Secunda',
				type: 'roman',
				center: [-1.5, 54.0],
				territory: 'Northern England from the Humber to Hadrian\'s Wall',
				color: '#7B5F4E',
				regions: [
					'merseyside', 'greater-manchester', 'lancashire',
					'yorkshire-south', 'yorkshire-west', 'yorkshire-east', 'yorkshire-north',
					'cumbria', 'durham', 'northumberland'
				],
			},

			// CALEDONIA — Southern Scotland (between the two walls)
			{
				id: 'caledonia',
				name: 'Caledonia',
				type: 'pictish',
				center: [-3.5, 55.5],
				territory: 'Southern Scotland between Hadrian\'s Wall and the Antonine Wall',
				color: '#5B7F7B',
				regions: [
					'dumfries-galloway', 'borders', 'lothian-east', 'lothian-west',
					'edinburgh', 'lanarkshire', 'glasgow', 'renfrewshire',
					'ayrshire', 'falkirk', 'stirling'
				],
			},

			// PICTLAND — Scotland north of the Antonine Wall
			{
				id: 'pictland',
				name: 'Pictland',
				type: 'pictish',
				center: [-3.5, 57.5],
				territory: 'Scotland north of the Antonine Wall',
				color: '#6B8F8B',
				regions: [
					'fife', 'perth-kinross', 'dundee', 'angus',
					'argyll', 'moray', 'aberdeen-city', 'highland'
				],
			},
		],
	},

	// ═══════════════════════════════════════════════════════════════════════
	// 410 CE — Roman Withdrawal
	// ═══════════════════════════════════════════════════════════════════════
	410: {
		name: 'Roman Withdrawal',
		description:
			'Rome abandons Britain. The four provinces dissolve into competing British successor kingdoms while Pictish power presses southward and Gaelic settlers from Ireland establish Dál Riata on the Argyll coast.',
		kingdoms: [

			// DUMNONIA — SW England (Devon, Cornwall, Somerset)
			{
				id: 'dumnonia',
				name: 'Dumnonia',
				type: 'briton',
				center: [-3.8, 50.8],
				territory: 'Devon, Cornwall, and Somerset',
				color: '#7A9B76',
				regions: ['cornwall', 'devon', 'somerset'],
			},

			// GWENT — SE Wales
			{
				id: 'gwent',
				name: 'Gwent',
				type: 'briton',
				center: [-3.0, 51.7],
				territory: 'South-east Wales and the Severn estuary',
				color: '#5A7B56',
				regions: [
					'monmouthshire', 'glamorgan-east', 'glamorgan-mid',
					'glamorgan-vale', 'swansea-area'
				],
			},

			// DYFED — SW Wales
			{
				id: 'dyfed',
				name: 'Dyfed',
				type: 'briton',
				center: [-4.8, 51.8],
				territory: 'South-west Wales',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},

			// GWYNEDD — NW Wales
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory: 'North-west Wales including Anglesey',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},

			// POWYS — Central Wales + Marches
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.4, 52.5],
				territory: 'Central Wales and the Welsh Marches',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},

			// SOUTH BRITAIN — SE England (post-Roman lowland)
			{
				id: 'south-britain',
				name: 'South Britain',
				type: 'briton',
				center: [-0.5, 51.8],
				territory: 'South-east England — the post-Roman lowland zone',
				color: '#8AAB86',
				regions: [
					'kent', 'sussex-east', 'sussex-west', 'surrey', 'hampshire',
					'middlesex', 'essex', 'hertfordshire', 'suffolk', 'norfolk',
					'cambridgeshire', 'bedfordshire', 'berkshire', 'oxford',
					'buckinghamshire', 'dorset', 'wiltshire', 'gloucestershire'
				],
			},

			// MIDLAND BRITAIN — Central England (future Mercia)
			{
				id: 'midland-britain',
				name: 'Midland Britain',
				type: 'briton',
				center: [-1.5, 52.5],
				territory: 'Central England, the future Mercian heartland',
				color: '#6A8B66',
				regions: [
					'northamptonshire', 'warwickshire', 'leicestershire',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'staffordshire', 'worcestershire', 'shropshire',
					'cheshire', 'herefordshire', 'merseyside', 'greater-manchester'
				],
			},

			// NORTH BRITAIN — Northern England (Brigantia)
			{
				id: 'north-britain',
				name: 'North Britain',
				type: 'briton',
				center: [-1.8, 54.2],
				territory: 'Northern England — the old Brigantian heartland',
				color: '#7A9B76',
				regions: [
					'lancashire',
					'yorkshire-south', 'yorkshire-west', 'yorkshire-east', 'yorkshire-north',
					'durham', 'northumberland'
				],
			},

			// RHEGED — Cumbria + Solway plain
			{
				id: 'rheged',
				name: 'Rheged',
				type: 'briton',
				center: [-3.0, 54.7],
				territory: 'Cumbria and the Solway plain',
				color: '#5A7B56',
				regions: ['cumbria'],
			},

			// GODODDIN — SE Scotland (Lothian)
			{
				id: 'gododdin',
				name: 'Gododdin',
				type: 'briton',
				center: [-3.0, 55.8],
				territory: 'Lothian and south-east Scotland',
				color: '#8AAB86',
				regions: [
					'lothian-east', 'lothian-west', 'edinburgh', 'borders'
				],
			},

			// STRATHCLYDE — SW Scotland (Clyde valley)
			{
				id: 'strathclyde',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.2, 55.7],
				territory: 'The Clyde valley and south-west Scotland',
				color: '#6A8B66',
				regions: [
					'dumfries-galloway', 'lanarkshire', 'glasgow',
					'renfrewshire', 'ayrshire', 'falkirk', 'stirling'
				],
			},

			// DÁL RIATA — Argyll coastal strip
			{
				id: 'dal-riata',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.5, 56.3],
				territory: 'The Argyll coastline — Gaelic settlers from Ireland',
				color: '#7FB5A0',
				regions: ['argyll'],
			},

			// PICTLAND — N Scotland
			{
				id: 'pictland',
				name: 'Pictland',
				type: 'pictish',
				center: [-3.5, 57.5],
				territory: 'Scotland north of the Antonine Wall',
				color: '#6B8F8B',
				regions: [
					'fife', 'perth-kinross', 'dundee', 'angus',
					'moray', 'aberdeen-city', 'highland'
				],
			},
		],
	},

	// ═══════════════════════════════════════════════════════════════════════
	// 500 CE — Sub-Roman / Early Post-Roman Britain
	// ═══════════════════════════════════════════════════════════════════════
	500: {
		name: 'Sub-Roman Britain',
		description:
			'British kingdoms consolidate across the highland west while the first Germanic settlements take root in Kent and Sussex. Elmet holds the Pennine valleys and Dál Riata grows on the Argyll coast.',
		kingdoms: [

			// DUMNONIA — SW England (unchanged from 410)
			{
				id: 'dumnonia',
				name: 'Dumnonia',
				type: 'briton',
				center: [-3.8, 50.8],
				territory: 'Devon, Cornwall, and Somerset',
				color: '#7A9B76',
				regions: ['cornwall', 'devon', 'somerset'],
			},

			// GWENT — SE Wales (unchanged)
			{
				id: 'gwent',
				name: 'Gwent',
				type: 'briton',
				center: [-3.0, 51.7],
				territory: 'South-east Wales',
				color: '#5A7B56',
				regions: [
					'monmouthshire', 'glamorgan-east', 'glamorgan-mid',
					'glamorgan-vale', 'swansea-area'
				],
			},

			// DYFED — SW Wales (unchanged)
			{
				id: 'dyfed',
				name: 'Dyfed',
				type: 'briton',
				center: [-4.8, 51.8],
				territory: 'South-west Wales',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},

			// GWYNEDD — NW Wales (unchanged)
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory: 'North-west Wales including Anglesey',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},

			// POWYS — Central Wales (unchanged)
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.2, 52.5],
				territory: 'Central Wales and the Welsh Marches',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},

			// KENT — First Saxon kingdom
			{
				id: 'kent',
				name: 'Kent',
				type: 'saxon',
				center: [0.5, 51.3],
				territory: 'The kingdom of Kent — the first Germanic realm in Britain',
				color: '#9BB4C8',
				regions: ['kent', 'sussex-east'],
			},

			// AELLE'S SOUTH SAXONS — Sussex + Surrey
			{
				id: 'aelle-saxons',
				name: "Ælle's South Saxons",
				type: 'saxon',
				center: [-0.5, 50.9],
				territory: 'The South Saxon settlement — Sussex and Surrey',
				color: '#8FA4B8',
				regions: ['sussex-west', 'surrey', 'hampshire'],
			},

			// SOUTH BRITAIN BRITON — SE England not yet Saxon
			{
				id: 'south-britain-briton',
				name: 'South Britain',
				type: 'briton',
				center: [0.3, 52.0],
				territory: 'British-held south-east England — Essex, East Anglia, and the Thames valley',
				color: '#8AAB86',
				regions: [
					'middlesex', 'essex', 'hertfordshire',
					'suffolk', 'norfolk', 'cambridgeshire', 'bedfordshire',
					'berkshire', 'oxford', 'buckinghamshire',
					'dorset', 'wiltshire', 'gloucestershire'
				],
			},

			// CENTRAL BRITAIN — Central England (future Mercia)
			{
				id: 'central-britain',
				name: 'Central Britain',
				type: 'briton',
				center: [-1.5, 52.5],
				territory: 'Central England — the future Mercian heartland',
				color: '#6A8B66',
				regions: [
					'northamptonshire', 'warwickshire', 'leicestershire',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'staffordshire', 'worcestershire', 'herefordshire',
					'shropshire', 'cheshire', 'merseyside', 'greater-manchester'
				],
			},

			// ELMET — West Yorkshire (British enclave)
			{
				id: 'elmet',
				name: 'Elmet',
				type: 'briton',
				center: [-1.5, 53.7],
				territory: 'The British kingdom of West Yorkshire',
				color: '#8AAB86',
				regions: ['yorkshire-west', 'yorkshire-south'],
			},

			// RHEGED — Cumbria
			{
				id: 'rheged',
				name: 'Rheged',
				type: 'briton',
				center: [-3.0, 54.7],
				territory: 'Cumbria and the Solway plain',
				color: '#5A7B56',
				regions: ['cumbria', 'lancashire'],
			},

			// BERNICIA — NE England
			{
				id: 'bernicia',
				name: 'Bernicia',
				type: 'briton',
				center: [-1.8, 55.3],
				territory: 'North-east England between Hadrian\'s Wall and the Humber plain',
				color: '#7A9B76',
				regions: ['yorkshire-east', 'yorkshire-north', 'durham', 'northumberland'],
			},

			// GODODDIN — SE Scotland (Lothian)
			{
				id: 'gododdin',
				name: 'Gododdin',
				type: 'briton',
				center: [-3.0, 55.8],
				territory: 'Lothian and the Firth of Forth region',
				color: '#7A9B76',
				regions: ['lothian-east', 'lothian-west', 'edinburgh', 'borders'],
			},

			// STRATHCLYDE — SW Scotland
			{
				id: 'strathclyde',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.2, 55.7],
				territory: 'The Clyde valley and south-west Scotland',
				color: '#6A8B66',
				regions: [
					'dumfries-galloway', 'lanarkshire', 'glasgow',
					'renfrewshire', 'ayrshire', 'falkirk', 'stirling'
				],
			},

			// PICTLAND — N Scotland
			{
				id: 'pictland',
				name: 'Pictland',
				type: 'pictish',
				center: [-3.5, 57.0],
				territory: 'Scotland north of the Antonine Wall',
				color: '#6B8F8B',
				regions: [
					'fife', 'perth-kinross', 'dundee', 'angus',
					'moray', 'aberdeen-city', 'highland'
				],
			},

			// DÁL RIATA — Argyll
			{
				id: 'dal-riata',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.5, 56.3],
				territory: 'The Argyll coastline — growing Gaelic power',
				color: '#7FB5A0',
				regions: ['argyll'],
			},
		],
	},
};
