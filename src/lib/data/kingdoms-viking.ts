import type { HistoricalPeriod } from './types.js';

// Region IDs map to geographic areas in static/data/british-isles.topo.json.
// At render time, a kingdom's regions are dissolved (merged) into a single polygon.

export const vikingPeriods: Record<number, HistoricalPeriod> = {

	// ================================================================
	// 800 CE — PRE-VIKING / LATE HEPTARCHY
	// ================================================================
	800: {
		name: 'Pre-Viking England',
		description:
			'The Anglo-Saxon heptarchy at its peak, with Mercia dominant after Offa. ' +
			'Vikings have not yet invaded in force. Wales remains divided among Briton kingdoms, ' +
			'and Scotland is split between Pictland in the north and Dál Riata on the western coast.',
		kingdoms: [
			{
				id: 'kent',
				name: 'Kent',
				type: 'saxon',
				center: [0.5, 51.3],
				territory: 'Kingdom of Kent — the original Jutish kingdom of the south-east',
				color: '#8FA4B8',
				regions: ['kent', 'sussex-east'],
			},
			{
				id: 'sussex',
				name: 'Sussex & Surrey',
				type: 'saxon',
				center: [-0.2, 50.9],
				territory: 'Kingdom of Sussex and Surrey — South Saxon territory and Surrey hinterland',
				color: '#7F94A8',
				regions: ['sussex-west', 'surrey'],
			},
			{
				id: 'essex',
				name: 'Essex & Middlesex',
				type: 'saxon',
				center: [0.5, 51.8],
				territory: 'Kingdom of Essex and Middlesex — East Saxon lands north of the Thames',
				color: '#6F84A8',
				regions: ['essex', 'middlesex', 'hertfordshire', 'bedfordshire', 'buckinghamshire'],
			},
			{
				id: 'wessex',
				name: 'Wessex',
				type: 'saxon',
				center: [-1.8, 51.1],
				territory: 'Kingdom of Wessex — West Saxon heartland from Thames to the south coast',
				color: '#9FB4C8',
				regions: [
					'hampshire', 'wiltshire', 'berkshire', 'oxford',
					'dorset', 'somerset', 'gloucestershire'
				],
			},
			{
				id: 'dumnonia',
				name: 'Dumnonia',
				type: 'briton',
				center: [-4.0, 50.7],
				territory: 'Kingdom of Dumnonia — Briton rump state in Devon and Cornwall',
				color: '#7A9B76',
				regions: ['cornwall', 'devon'],
			},
			{
				id: 'gwent',
				name: 'Gwent',
				type: 'briton',
				center: [-3.0, 51.7],
				territory: 'Kingdom of Gwent — south-eastern Wales, Monmouthshire region',
				color: '#5A7B56',
				regions: [
					'monmouthshire', 'glamorgan-east', 'glamorgan-mid',
					'glamorgan-vale', 'swansea-area'
				],
			},
			{
				id: 'dyfed',
				name: 'Dyfed',
				type: 'briton',
				center: [-4.8, 51.8],
				territory: 'Kingdom of Dyfed — south-western Wales',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.4, 52.5],
				territory: 'Kingdom of Powys — central Wales, successor to the Cornovii',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory: 'Kingdom of Gwynedd — north-western Wales, dominant Welsh kingdom',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},
			{
				id: 'mercia',
				name: 'Mercia',
				type: 'anglian',
				center: [-1.5, 52.5],
				territory: 'Kingdom of Mercia — the dominant Anglo-Saxon kingdom after Offa',
				color: '#8B7A9D',
				regions: [
					'northamptonshire', 'warwickshire', 'leicestershire',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'staffordshire', 'worcestershire', 'herefordshire',
					'shropshire', 'cheshire', 'merseyside', 'greater-manchester',
					'yorkshire-south', 'yorkshire-west'
				],
			},
			{
				id: 'east-anglia',
				name: 'East Anglia',
				type: 'anglian',
				center: [1.0, 52.6],
				territory: 'Kingdom of East Anglia — Norfolk and Suffolk, the East Anglian Angles',
				color: '#9B8AAD',
				regions: ['suffolk', 'norfolk', 'cambridgeshire'],
			},
			{
				id: 'northumbria',
				name: 'Northumbria',
				type: 'anglian',
				center: [-1.8, 54.5],
				territory: 'Kingdom of Northumbria — from the Humber to the Firth of Forth',
				color: '#AB9ABD',
				regions: [
					'lancashire', 'yorkshire-east', 'yorkshire-north',
					'durham', 'northumberland',
					'lothian-east', 'lothian-west', 'edinburgh', 'borders'
				],
			},
			{
				id: 'strathclyde',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.2, 55.7],
				territory: 'Kingdom of Strathclyde — Briton kingdom of the Clyde valley and Galloway',
				color: '#8AAB86',
				regions: [
					'dumfries-galloway', 'lanarkshire', 'glasgow',
					'renfrewshire', 'ayrshire', 'falkirk', 'stirling'
				],
			},
			{
				id: 'dal-riata',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.5, 56.3],
				territory: 'Kingdom of Dál Riata — Gaelic kingdom of Argyll and the western isles',
				color: '#7FB5A0',
				regions: ['argyll'],
			},
			{
				id: 'pictland',
				name: 'Pictland',
				type: 'pictish',
				center: [-3.5, 57.0],
				territory: 'Kingdom of Pictland — the Pictish heartland from Forth to Cape Wrath',
				color: '#6B8F8B',
				regions: [
					'fife', 'perth-kinross', 'dundee', 'angus',
					'moray', 'aberdeen-city', 'highland'
				],
			},
		],
	},

	// ================================================================
	// 878 CE — THE GREAT DANELAW DIVISION
	// ================================================================
	878: {
		name: 'The Danelaw',
		description:
			'Following Alfred\'s victory at Ethandun and the Treaty of Wedmore, England is ' +
			'divided along Watling Street. Viking settlers control the east and north as the ' +
			'Danelaw, while Alfred\'s Wessex and the rump of English Mercia hold the west. ' +
			'In Scotland, Kenneth MacAlpin\'s united Pictish-Scottish kingdom (Alba) consolidates.',
		kingdoms: [
			// The Danelaw — E Anglia + E Mercia + Northumbria (Watling Street boundary)
			// Watling Street runs roughly NW from London through the Midlands to Chester.
			// East of/north of Watling Street = Danelaw.
			// Region split: yorkshire-north, yorkshire-east = Danelaw; yorkshire-west, yorkshire-south = English Mercia
			// lincolnshire, nottinghamshire, leicestershire, norfolk, suffolk, cambridgeshire = Danelaw
			// northamptonshire, derbyshire (east) = Danelaw side
			// staffordshire, cheshire, shropshire, warwickshire = English Mercia side
			{
				id: 'danelaw',
				name: 'The Danelaw',
				type: 'viking',
				center: [-0.5, 53.5],
				territory:
					'Viking-controlled England — East Anglia, Lincolnshire, Yorkshire and ' +
					'eastern Mercia, established by the Treaty of Wedmore (878)',
				color: '#C4956A',
				regions: [
					// Northumbria (all of it under Danelaw 878)
					'lancashire', 'yorkshire-east', 'yorkshire-north', 'yorkshire-west', 'yorkshire-south',
					'durham', 'northumberland',
					// East Anglia
					'suffolk', 'norfolk', 'cambridgeshire', 'essex', 'hertfordshire', 'bedfordshire',
					// East Midlands (Danelaw side)
					'lincolnshire', 'nottinghamshire', 'leicestershire', 'northamptonshire',
					'derbyshire',
					// Kent and Sussex (Viking influenced but technically within Danelaw sphere here)
					'kent', 'sussex-east', 'middlesex'
				],
			},
			{
				id: 'wessex-alfred',
				name: "Alfred's Wessex",
				type: 'saxon',
				center: [-1.8, 51.3],
				territory:
					'Kingdom of Wessex under Alfred the Great — the Saxon heartland south of the Thames, ' +
					'west of Watling Street, the bulwark against the Viking advance',
				color: '#9FB4C8',
				regions: [
					'hampshire', 'wiltshire', 'berkshire', 'oxford',
					'dorset', 'somerset', 'gloucestershire',
					'surrey', 'sussex-west', 'buckinghamshire'
				],
			},
			{
				id: 'english-mercia',
				name: 'English Mercia',
				type: 'anglian',
				center: [-2.0, 52.5],
				territory:
					'Rump Kingdom of English Mercia — the western portion surviving under ' +
					'Æthelred of Mercia, allied with Alfred, west of Watling Street',
				color: '#8B7A9D',
				regions: [
					'staffordshire', 'worcestershire', 'herefordshire',
					'warwickshire', 'shropshire', 'cheshire', 'merseyside', 'greater-manchester'
				],
			},
			{
				id: 'dumnonia',
				name: 'Dumnonia',
				type: 'briton',
				center: [-4.0, 50.7],
				territory: 'Kingdom of Dumnonia — Devon and Cornwall, under pressure from Wessex',
				color: '#7A9B76',
				regions: ['cornwall', 'devon'],
			},
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory: 'Kingdom of Gwynedd — north-western Wales',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.4, 52.5],
				territory: 'Kingdom of Powys — central Wales',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},
			{
				id: 'dyfed',
				name: 'Dyfed',
				type: 'briton',
				center: [-4.8, 51.8],
				territory: 'Kingdom of Dyfed — south-western Wales',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},
			{
				id: 'gwent',
				name: 'Gwent',
				type: 'briton',
				center: [-3.0, 51.7],
				territory: 'Kingdom of Gwent — south-eastern Wales',
				color: '#5A7B56',
				regions: [
					'monmouthshire', 'glamorgan-east', 'glamorgan-mid',
					'glamorgan-vale', 'swansea-area'
				],
			},
			{
				id: 'strathclyde',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.2, 55.7],
				territory: 'Kingdom of Strathclyde — Briton kingdom of the Clyde, resisting Viking pressure',
				color: '#8AAB86',
				regions: [
					'dumfries-galloway', 'lanarkshire', 'glasgow',
					'renfrewshire', 'ayrshire', 'falkirk', 'stirling'
				],
			},
			// Alba — Kenneth MacAlpin's united kingdom (founded 843)
			{
				id: 'alba',
				name: 'Alba',
				type: 'pictish',
				center: [-4.0, 57.0],
				territory:
					'Kingdom of Alba — Kenneth MacAlpin\'s united Pictish-Scottish kingdom, ' +
					'covering all of Scotland north of the Firth of Forth and Clyde',
				color: '#6B8F8B',
				regions: [
					'borders', 'lothian-east', 'lothian-west', 'edinburgh',
					'fife', 'perth-kinross', 'dundee', 'angus',
					'argyll', 'moray', 'aberdeen-city', 'highland'
				],
			},
		],
	},

	// ================================================================
	// 950 CE — ENGLISH RECONQUEST
	// ================================================================
	950: {
		name: 'English Reconquest',
		description:
			'The descendants of Alfred the Great have reconquered most of the Danelaw. ' +
			'Æthelstan (d. 939) unified England; by 950 it is largely one kingdom under Eadred. ' +
			'Only northern Northumbria retains Viking character. Alba (Scotland) has expanded ' +
			'southward. Wales remains divided among its four kingdoms.',
		kingdoms: [
			// Unified England — most of England south of the Tees
			{
				id: 'england',
				name: 'England',
				type: 'english',
				center: [-1.0, 52.5],
				territory:
					'Unified Kingdom of England — Alfred\'s descendants have reconquered the Danelaw; ' +
					'England stretches from the Thames to the Tees, excluding Celtic peripheries',
				color: '#BFA85C',
				regions: [
					'kent', 'sussex-east', 'sussex-west', 'surrey', 'hampshire',
					'middlesex', 'essex', 'hertfordshire', 'bedfordshire', 'buckinghamshire',
					'suffolk', 'norfolk', 'cambridgeshire',
					'oxford', 'berkshire', 'wiltshire', 'gloucestershire',
					'dorset', 'devon', 'somerset',
					'northamptonshire', 'warwickshire', 'leicestershire',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'staffordshire', 'worcestershire', 'herefordshire',
					'shropshire', 'cheshire', 'merseyside', 'greater-manchester',
					'lancashire', 'yorkshire-south', 'yorkshire-west',
					'yorkshire-east', 'yorkshire-north'
				],
			},
			// Northern Northumbria — Viking kingdom of York, contested
			{
				id: 'northumbria-north',
				name: 'Northern Northumbria',
				type: 'english',
				center: [-1.5, 54.5],
				territory:
					'Northern Northumbria — the old Viking kingdom, now contested between ' +
					'English kings and Norse settlers; roughly Durham and Northumberland',
				color: '#C4956A',
				regions: ['durham', 'northumberland'],
			},
			// Cornwall still semi-independent
			{
				id: 'dumnonia',
				name: 'Cornwall (Dumnonia)',
				type: 'briton',
				center: [-4.3, 50.6],
				territory: 'Cornwall — the last remnant of Dumnonia; Devon absorbed into England by 950',
				color: '#7A9B76',
				regions: ['cornwall'],
			},
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory: 'Kingdom of Gwynedd — north-western Wales, leading Welsh kingdom of the era',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.4, 52.5],
				territory: 'Kingdom of Powys — central Wales',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},
			{
				id: 'dyfed',
				name: 'Dyfed (Deheubarth)',
				type: 'briton',
				center: [-4.8, 51.8],
				territory: 'Kingdom of Dyfed / early Deheubarth — south-western Wales',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},
			{
				id: 'morgannwg',
				name: 'Morgannwg',
				type: 'briton',
				center: [-3.3, 51.6],
				territory: 'Kingdom of Morgannwg — south-eastern Wales (Glamorgan)',
				color: '#5A7B56',
				regions: [
					'monmouthshire', 'glamorgan-east', 'glamorgan-mid',
					'glamorgan-vale', 'swansea-area'
				],
			},
			{
				id: 'strathclyde',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.2, 55.7],
				territory: 'Kingdom of Strathclyde — the last great Briton kingdom, declining under pressure from Alba',
				color: '#8AAB86',
				regions: [
					'dumfries-galloway', 'lanarkshire', 'glasgow',
					'renfrewshire', 'ayrshire', 'falkirk', 'stirling'
				],
			},
			{
				id: 'alba',
				name: 'Alba',
				type: 'pictish',
				center: [-4.0, 57.0],
				territory:
					'Kingdom of Alba — expanded Pictish-Scottish kingdom; Constantine II and his ' +
					'successors have extended Scottish power southward toward the Tweed and Solway',
				color: '#6B8F8B',
				regions: [
					'borders', 'lothian-east', 'lothian-west', 'edinburgh',
					'fife', 'perth-kinross', 'dundee', 'angus',
					'argyll', 'moray', 'aberdeen-city', 'highland'
				],
			},
		],
	},
};
