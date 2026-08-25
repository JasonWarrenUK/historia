import type { HistoricalPeriod } from './types.js';

// Region IDs map to geographic areas in static/data/british-isles.topo.json.
// At render time, a kingdom's regions are dissolved (merged) into a single polygon.

export const latePeriods: Record<number, HistoricalPeriod> = {
	1000: {
		name: 'Late Anglo-Saxon England',
		description:
			'England is united under Æthelred the Unready, a single kingdom of the English. The Welsh kingdoms remain independent under their own rulers, and Alba (Scotland) grows in strength under Máel Coluim II. Cornwall retains a distinct Brittonic identity in the far southwest.',
		kingdoms: [
			{
				id: 'scotland',
				name: 'Kingdom of Alba',
				type: 'gaelic',
				center: [-4.0, 57.0],
				territory: 'Scotland — the kingdom of the Scots and Picts united under the House of Alpin',
				color: '#7FB5A0',
				regions: [
					'dumfries-galloway', 'borders', 'lothian-east', 'lothian-west', 'edinburgh',
					'lanarkshire', 'glasgow', 'renfrewshire', 'ayrshire', 'falkirk', 'stirling',
					'fife', 'perth-kinross', 'dundee', 'angus',
					'argyll', 'moray', 'aberdeen-city', 'highland'
				],
			},
			{
				id: 'england',
				name: 'Kingdom of England',
				type: 'english',
				center: [-1.0, 52.5],
				territory:
					'All of England under Æthelred the Unready — from the Tweed–Solway border with Alba to the Tamar and the Severn estuary',
				color: '#BFA85C',
				regions: [
					'northumberland', 'durham', 'cumbria',
					'lancashire', 'merseyside', 'greater-manchester',
					'yorkshire-north', 'yorkshire-east', 'yorkshire-west', 'yorkshire-south',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'cheshire', 'staffordshire', 'warwickshire', 'leicestershire',
					'shropshire', 'worcestershire', 'herefordshire', 'northamptonshire',
					'gloucestershire', 'oxford', 'buckinghamshire', 'bedfordshire',
					'hertfordshire', 'essex', 'middlesex', 'surrey',
					'berkshire', 'wiltshire', 'hampshire',
					'kent', 'sussex-east', 'sussex-west',
					'somerset', 'dorset', 'devon',
					'suffolk', 'norfolk', 'cambridgeshire',
					'monmouthshire'
				],
			},
			{
				id: 'cornwall',
				name: 'Cornwall',
				type: 'briton',
				center: [-4.8, 50.4],
				territory:
					'The ancient Brittonic kingdom of Kernow — the westernmost peninsula, culturally and linguistically distinct from Saxon England',
				color: '#7A9B76',
				regions: ['cornwall'],
			},
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory:
					'The dominant kingdom of north-west Wales, centred on Snowdonia and Anglesey',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.3, 52.7],
				territory:
					'The kingdom of mid-Wales and the Welsh Marches',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},
			{
				id: 'deheubarth',
				name: 'Deheubarth',
				type: 'briton',
				center: [-4.0, 52.0],
				territory:
					'The great kingdom of south-west Wales, forged from Dyfed, Ceredigion and Ystrad Tywi by Hywel Dda',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},
			{
				id: 'morgannwg',
				name: 'Morgannwg',
				type: 'briton',
				center: [-3.4, 51.6],
				territory:
					'South-east Wales (Glamorgan), a coastal kingdom across the Severn estuary from England',
				color: '#5A7B56',
				regions: [
					'glamorgan-east', 'glamorgan-mid', 'glamorgan-vale', 'swansea-area'
				],
			},
		],
	},

	1066: {
		name: 'Norman Conquest Eve',
		description:
			'Harold Godwinson holds England as its last Anglo-Saxon king. Scotland under Máel Coluim III now rules all the way to the Tweed–Solway line, having absorbed Lothian and Strathclyde. The Welsh kingdoms remain independent. This is Britain on the eve of the Norman invasion.',
		kingdoms: [
			{
				id: 'scotland-1066',
				name: 'Kingdom of Scotland',
				type: 'gaelic',
				center: [-4.0, 57.0],
				territory:
					'Alba under Máel Coluim III — now including Lothian and Strathclyde, with borders roughly matching the modern Scotland/England border',
				color: '#7FB5A0',
				regions: [
					'dumfries-galloway', 'borders', 'lothian-east', 'lothian-west', 'edinburgh',
					'lanarkshire', 'glasgow', 'renfrewshire', 'ayrshire', 'falkirk', 'stirling',
					'fife', 'perth-kinross', 'dundee', 'angus',
					'argyll', 'moray', 'aberdeen-city', 'highland'
				],
			},
			{
				id: 'england-1066',
				name: "Harold's England",
				type: 'english',
				center: [-1.0, 52.3],
				territory:
					'England under Harold Godwinson, the last Anglo-Saxon king — a unified realm from the Tweed–Solway border to the Channel',
				color: '#BFA85C',
				regions: [
					'northumberland', 'durham', 'cumbria',
					'lancashire', 'merseyside', 'greater-manchester',
					'yorkshire-north', 'yorkshire-east', 'yorkshire-west', 'yorkshire-south',
					'lincolnshire', 'nottinghamshire', 'derbyshire',
					'cheshire', 'staffordshire', 'warwickshire', 'leicestershire',
					'shropshire', 'worcestershire', 'herefordshire', 'northamptonshire',
					'gloucestershire', 'oxford', 'buckinghamshire', 'bedfordshire',
					'hertfordshire', 'essex', 'middlesex', 'surrey',
					'berkshire', 'wiltshire', 'hampshire',
					'kent', 'sussex-east', 'sussex-west',
					'somerset', 'dorset', 'devon',
					'suffolk', 'norfolk', 'cambridgeshire',
					'monmouthshire'
				],
			},
			{
				id: 'cornwall-1066',
				name: 'Cornwall',
				type: 'briton',
				center: [-4.8, 50.4],
				territory:
					'Cornwall — still culturally and linguistically distinct, though nominally within the English earldom of Wessex',
				color: '#7A9B76',
				regions: ['cornwall'],
			},
			{
				id: 'gwynedd-1066',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.1, 53.1],
				territory:
					'Gwynedd — the kingdom now reverts to its northern heartland after Gruffudd ap Llywelyn\'s unification attempt',
				color: '#6A8B66',
				regions: ['gwynedd-historic', 'clwyd'],
			},
			{
				id: 'powys-1066',
				name: 'Powys',
				type: 'briton',
				center: [-3.3, 52.7],
				territory:
					'Powys — the mid-Wales kingdom, its eastern borders contested with England along the Marches',
				color: '#7A9B76',
				regions: ['powys-historic'],
			},
			{
				id: 'deheubarth-1066',
				name: 'Deheubarth',
				type: 'briton',
				center: [-4.0, 52.0],
				territory:
					'Deheubarth — the kingdom of south-west Wales, weakened after Gruffudd ap Llywelyn\'s defeat',
				color: '#8AAB86',
				regions: ['pembrokeshire', 'carmarthenshire', 'ceredigion'],
			},
			{
				id: 'morgannwg-1066',
				name: 'Morgannwg',
				type: 'briton',
				center: [-3.4, 51.6],
				territory:
					'Morgannwg (Glamorgan) — south-east Wales, increasingly subject to Norman pressure',
				color: '#5A7B56',
				regions: [
					'glamorgan-east', 'glamorgan-mid', 'glamorgan-vale', 'swansea-area'
				],
			},
		],
	},
};
