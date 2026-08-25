import type { HistoricalPeriod } from './types.js';

// Region IDs map to geographic areas in static/data/british-isles.topo.json.
// At render time, a kingdom's regions are dissolved (merged) into a single polygon.

export const heptarchyPeriods: Record<number, HistoricalPeriod> = {
	// =========================================================================
	// 600 CE — EARLY HEPTARCHY
	// =========================================================================
	600: {
		name: 'Early Heptarchy',
		description:
			'Anglo-Saxon kingdoms are expanding across lowland Britain. British kingdoms survive in the west and north. Northumbria is consolidating Bernicia and Deira. The Pictish confederacy dominates Scotland north of the Forth. Elmet and Gododdin persist as small British enclaves.',
		kingdoms: [
			{
				id: 'kent',
				name: 'Kent',
				type: 'saxon',
				center: [0.5, 51.3],
				territory: 'Kingdom of the Kentish — Kent and the SE coast',
				color: '#8FA4B8',
				regions: ['kent'],
			},
			{
				id: 'sussex',
				name: 'Sussex',
				type: 'saxon',
				center: [-0.2, 50.9],
				territory: 'Kingdom of the South Saxons — Sussex',
				color: '#7F94A8',
				regions: ['sussex-east', 'sussex-west', 'surrey'],
			},
			{
				id: 'wessex',
				name: 'Wessex',
				type: 'saxon',
				center: [-1.5, 51.2],
				territory: 'Kingdom of the West Saxons — Hampshire, Wiltshire, and Berkshire',
				color: '#9FB4C8',
				regions: ['hampshire', 'wiltshire', 'berkshire', 'dorset', 'somerset'],
			},
			{
				id: 'essex',
				name: 'Essex',
				type: 'saxon',
				center: [0.5, 51.8],
				territory: 'Kingdom of the East Saxons — Essex, Middlesex, and the London area',
				color: '#6F84A8',
				regions: ['essex', 'middlesex', 'hertfordshire', 'bedfordshire', 'oxford', 'buckinghamshire'],
			},
			{
				id: 'east-anglia',
				name: 'East Anglia',
				type: 'anglian',
				center: [1.0, 52.6],
				territory: 'Kingdom of the East Angles — Norfolk and Suffolk',
				color: '#9B8AAD',
				regions: ['suffolk', 'norfolk', 'cambridgeshire'],
			},
			// Elmet — British enclave in West Yorkshire (600 CE only)
			{
				id: 'elmet',
				name: 'Elmet',
				type: 'briton',
				center: [-1.5, 53.8],
				territory: 'British enclave kingdom in West Yorkshire',
				color: '#8AAB86',
				regions: ['yorkshire-west'],
			},
			{
				id: 'mercia',
				name: 'Mercia',
				type: 'anglian',
				center: [-1.5, 52.5],
				territory: 'Kingdom of the Midland Angles — central England',
				color: '#8B7A9D',
				regions: [
					'northamptonshire', 'warwickshire', 'leicestershire',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'staffordshire', 'worcestershire', 'herefordshire',
					'shropshire', 'cheshire', 'merseyside', 'greater-manchester',
					'gloucestershire', 'yorkshire-south'
				],
			},
			{
				id: 'northumbria',
				name: 'Northumbria',
				type: 'anglian',
				center: [-1.8, 54.5],
				territory: 'Anglian kingdom of Bernicia and Deira — NE England',
				color: '#AB9ABD',
				regions: [
					'lancashire', 'yorkshire-east', 'yorkshire-north',
					'durham', 'northumberland',
					// Lothians (absorbed Gododdin's territory to the north)
					'lothian-east', 'lothian-west', 'edinburgh', 'borders'
				],
			},
			{
				id: 'dumnonia',
				name: 'Dumnonia',
				type: 'briton',
				center: [-3.8, 50.8],
				territory: 'British kingdom of Devon and Cornwall',
				color: '#7A9B76',
				regions: ['cornwall', 'devon'],
			},
			{
				id: 'gwent',
				name: 'Gwent',
				type: 'briton',
				center: [-3.0, 51.7],
				territory: 'British kingdom of SE Wales — Gwent and Glamorgan',
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
				territory: 'British kingdom of SW Wales — Pembrokeshire and Carmarthenshire',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.2, 52.5],
				territory: 'British kingdom of Central Wales and the Marches',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory: 'British kingdom of NW Wales — Anglesey and Snowdonia',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},
			{
				id: 'strathclyde',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.2, 55.7],
				territory: 'British kingdom of the Clyde — SW Scotland',
				color: '#8AAB86',
				regions: [
					'dumfries-galloway', 'lanarkshire', 'glasgow',
					'renfrewshire', 'ayrshire', 'falkirk', 'stirling'
				],
			},
			{
				id: 'gododdin',
				name: 'Gododdin',
				type: 'briton',
				center: [-2.5, 55.85],
				territory: 'British kingdom of the Lothians — SE Scotland',
				color: '#6A8B66',
				regions: ['lothian-east', 'lothian-west', 'edinburgh', 'borders'],
			},
			{
				id: 'pictland',
				name: 'Pictland',
				type: 'pictish',
				center: [-3.5, 57.5],
				territory: 'Pictish confederacy — Scotland north of the Forth-Clyde line',
				color: '#6B8F8B',
				regions: [
					'fife', 'perth-kinross', 'dundee', 'angus',
					'moray', 'aberdeen-city', 'highland'
				],
			},
			{
				id: 'dal-riata',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.5, 56.3],
				territory: 'Gaelic kingdom of Argyll — straddling the North Channel',
				color: '#7FB5A0',
				regions: ['argyll'],
			},
		],
	},

	// =========================================================================
	// 700 CE — HIGH HEPTARCHY
	// =========================================================================
	700: {
		name: 'High Heptarchy',
		description:
			'Anglo-Saxon kingdoms dominate England. Mercia is the dominant power in the midlands. Northumbria has absorbed Elmet and the Gododdin and reaches its greatest extent. British kingdoms are confined to Wales and the far south-west. Pictland and Strathclyde hold Scotland.',
		kingdoms: [
			{
				id: 'kent',
				name: 'Kent',
				type: 'saxon',
				center: [0.5, 51.3],
				territory: 'Kingdom of the Kentish — Kent and the SE coast',
				color: '#8FA4B8',
				regions: ['kent'],
			},
			{
				id: 'sussex',
				name: 'Sussex',
				type: 'saxon',
				center: [-0.2, 50.9],
				territory: 'Kingdom of the South Saxons — Sussex',
				color: '#7F94A8',
				regions: ['sussex-east', 'sussex-west', 'surrey'],
			},
			// Wessex expanded — absorbed Dorset and Somerset from Dumnonia
			{
				id: 'wessex',
				name: 'Wessex',
				type: 'saxon',
				center: [-1.8, 51.1],
				territory: 'Kingdom of the West Saxons — expanded into Dorset and Somerset',
				color: '#9FB4C8',
				regions: ['hampshire', 'wiltshire', 'berkshire', 'dorset', 'somerset', 'gloucestershire'],
			},
			{
				id: 'essex',
				name: 'Essex',
				type: 'saxon',
				center: [0.5, 51.8],
				territory: 'Kingdom of the East Saxons — Essex and the London area',
				color: '#6F84A8',
				regions: ['essex', 'middlesex', 'hertfordshire', 'bedfordshire', 'oxford', 'buckinghamshire'],
			},
			{
				id: 'east-anglia',
				name: 'East Anglia',
				type: 'anglian',
				center: [1.0, 52.6],
				territory: 'Kingdom of the East Angles — Norfolk and Suffolk',
				color: '#9B8AAD',
				regions: ['suffolk', 'norfolk', 'cambridgeshire'],
			},
			{
				id: 'mercia',
				name: 'Mercia',
				type: 'anglian',
				center: [-1.5, 52.5],
				territory: 'Kingdom of the Midland Angles — dominant central England',
				color: '#8B7A9D',
				regions: [
					'northamptonshire', 'warwickshire', 'leicestershire',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'staffordshire', 'worcestershire', 'herefordshire',
					'shropshire', 'cheshire', 'merseyside', 'greater-manchester',
					'yorkshire-south', 'yorkshire-west'
				],
			},
			// Northumbria at peak — absorbs Elmet (no enclave) + Gododdin (Lothians)
			{
				id: 'northumbria',
				name: 'Northumbria',
				type: 'anglian',
				center: [-1.8, 54.5],
				territory: 'Anglian kingdom at its peak — NE England and the Lothians',
				color: '#AB9ABD',
				regions: [
					'lancashire', 'yorkshire-east', 'yorkshire-north',
					'durham', 'northumberland',
					'lothian-east', 'lothian-west', 'edinburgh', 'borders'
				],
			},
			// Dumnonia reduced to Devon and Cornwall
			{
				id: 'dumnonia',
				name: 'Dumnonia',
				type: 'briton',
				center: [-4.0, 50.7],
				territory: 'Remnant British kingdom — Devon and Cornwall',
				color: '#7A9B76',
				regions: ['cornwall', 'devon'],
			},
			{
				id: 'gwent',
				name: 'Gwent',
				type: 'briton',
				center: [-3.0, 51.7],
				territory: 'British kingdom of SE Wales — Gwent and Glamorgan',
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
				territory: 'British kingdom of SW Wales — Pembrokeshire and Carmarthenshire',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.4, 52.5],
				territory: 'British kingdom of Central Wales',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory: 'British kingdom of NW Wales — Anglesey and Snowdonia',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},
			{
				id: 'strathclyde',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.2, 55.7],
				territory: 'British kingdom of the Clyde — SW Scotland',
				color: '#8AAB86',
				regions: [
					'dumfries-galloway', 'lanarkshire', 'glasgow',
					'renfrewshire', 'ayrshire', 'falkirk', 'stirling'
				],
			},
			{
				id: 'pictland',
				name: 'Pictland',
				type: 'pictish',
				center: [-3.5, 57.5],
				territory: 'Pictish confederacy — Scotland north of the Forth, including former Gododdin',
				color: '#6B8F8B',
				regions: [
					'fife', 'perth-kinross', 'dundee', 'angus',
					'moray', 'aberdeen-city', 'highland'
				],
			},
			{
				id: 'dal-riata',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.5, 56.3],
				territory: 'Gaelic kingdom of Argyll',
				color: '#7FB5A0',
				regions: ['argyll'],
			},
		],
	},
};
