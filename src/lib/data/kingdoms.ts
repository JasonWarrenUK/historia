import type { HistoricalPeriod, KingdomTypeInfo, KingdomType } from './types.js';

export const historicalPeriods: Record<number, HistoricalPeriod> = {
	300: {
		name: 'Late Roman Britain',
		description:
			'Britannia remains a province of the Roman Empire, divided into four provinces. Roman authority is weakening but urban life continues.',
		kingdoms: [
			{
				id: 'britannia-prima',
				name: 'Britannia Prima',
				type: 'roman',
				center: [-2.58, 51.45],
				territory: 'Southwest Britain (capital: Cirencester)',
				color: '#8B0000',
				radius: 22
			},
			{
				id: 'britannia-secunda',
				name: 'Britannia Secunda',
				type: 'roman',
				center: [-1.08, 53.96],
				territory: 'Northern Britain (capital: York)',
				color: '#A52A2A',
				radius: 25
			},
			{
				id: 'maxima-caesariensis',
				name: 'Maxima Caesariensis',
				type: 'roman',
				center: [-0.12, 51.51],
				territory: 'Southeast Britain (capital: London)',
				color: '#CD5C5C',
				radius: 20
			},
			{
				id: 'flavia-caesariensis',
				name: 'Flavia Caesariensis',
				type: 'roman',
				center: [-1.13, 52.63],
				territory: 'Midlands (capital: Lincoln)',
				color: '#B22222',
				radius: 20
			},
			{
				id: 'caledonia',
				name: 'Caledonia',
				type: 'pictish',
				center: [-4.22, 56.82],
				territory: "Beyond Hadrian's Wall — unconquered",
				color: '#2F4F4F',
				radius: 30
			}
		]
	},
	410: {
		name: 'End of Roman Rule',
		description:
			'Emperor Honorius tells British cities to look to their own defence. Roman administration collapses, but Romano-British culture persists.',
		kingdoms: [
			{
				id: 'dumnonia',
				name: 'Dumnonia',
				type: 'briton',
				center: [-3.53, 50.72],
				territory: 'Cornwall, Devon & parts of Somerset',
				color: '#228B22',
				radius: 18
			},
			{
				id: 'dobunni',
				name: 'Dobunni Territory',
				type: 'briton',
				center: [-2.24, 51.86],
				territory: 'Cotswolds region',
				color: '#32CD32',
				radius: 12
			},
			{
				id: 'cornovii',
				name: 'Cornovii Territory',
				type: 'briton',
				center: [-2.76, 52.71],
				territory: 'Shropshire region',
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'brigantes',
				name: 'Brigantes Territory',
				type: 'briton',
				center: [-1.69, 54.23],
				territory: 'Pennines & Yorkshire',
				color: '#2E8B57',
				radius: 20
			},
			{
				id: 'votadini',
				name: 'Votadini',
				type: 'briton',
				center: [-2.78, 55.95],
				territory: 'Lothian & Borders',
				color: '#006400',
				radius: 14
			},
			{
				id: 'novantae',
				name: 'Novantae',
				type: 'briton',
				center: [-4.52, 54.9],
				territory: 'Galloway',
				color: '#228B22',
				radius: 10
			},
			{
				id: 'picts',
				name: 'Pictish Kingdoms',
				type: 'pictish',
				center: [-3.43, 56.95],
				territory: 'Scotland north of Forth-Clyde',
				color: '#2F4F4F',
				radius: 28
			},
			{
				id: 'dal-riata-early',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.48, 56.32],
				territory: 'Argyll — Gaelic settlers',
				color: '#FF6347',
				radius: 10
			}
		]
	},
	500: {
		name: 'The Age of Arthur?',
		description:
			'The legendary period. British kingdoms resist Saxon expansion. Battle of Badon Hill reportedly halts Saxon advance for a generation.',
		kingdoms: [
			{
				id: 'dumnonia-500',
				name: 'Dumnonia',
				type: 'briton',
				center: [-3.83, 50.72],
				territory: 'Cornwall, Devon, Somerset',
				color: '#228B22',
				radius: 18
			},
			{
				id: 'dyfed',
				name: 'Dyfed',
				type: 'briton',
				center: [-4.97, 51.87],
				territory: 'Southwest Wales — Irish dynasty',
				color: '#32CD32',
				radius: 12
			},
			{
				id: 'gwynedd-early',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.27, 53.14],
				territory: 'Northwest Wales',
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'powys-early',
				name: 'Powys',
				type: 'briton',
				center: [-3.38, 52.66],
				territory: 'Northeast Wales & borders',
				color: '#2E8B57',
				radius: 14
			},
			{
				id: 'rheged',
				name: 'Rheged',
				type: 'briton',
				center: [-2.95, 54.66],
				territory: 'Cumbria, Lancashire, Galloway',
				color: '#006400',
				radius: 16
			},
			{
				id: 'gododdin',
				name: 'Gododdin',
				type: 'briton',
				center: [-3.19, 55.95],
				territory: 'Lothian — capital at Din Eidyn',
				color: '#228B22',
				radius: 12
			},
			{
				id: 'strathclyde-early',
				name: 'Alt Clut',
				type: 'briton',
				center: [-4.56, 55.94],
				territory: 'Strathclyde — Dumbarton Rock',
				color: '#32CD32',
				radius: 14
			},
			{
				id: 'elmet',
				name: 'Elmet',
				type: 'briton',
				center: [-1.54, 53.79],
				territory: 'West Yorkshire',
				color: '#3CB371',
				radius: 9
			},
			{
				id: 'pengwern',
				name: 'Pengwern',
				type: 'briton',
				center: [-2.76, 52.71],
				territory: 'Shropshire',
				color: '#2E8B57',
				radius: 10
			},
			{
				id: 'kent-early',
				name: 'Cantwara',
				type: 'saxon',
				center: [0.87, 51.27],
				territory: "Kent — Hengist's heirs",
				color: '#4169E1',
				radius: 10
			},
			{
				id: 'sussex-early',
				name: 'Suth Seaxe',
				type: 'saxon',
				center: [-0.14, 50.92],
				territory: 'Sussex coast',
				color: '#6495ED',
				radius: 9
			},
			{
				id: 'gewisse',
				name: 'Gewisse',
				type: 'saxon',
				center: [-1.32, 51.44],
				territory: 'Upper Thames — proto-Wessex',
				color: '#4682B4',
				radius: 10
			},
			{
				id: 'picts-500',
				name: 'Pictish Kingdoms',
				type: 'pictish',
				center: [-3.43, 56.95],
				territory: 'Scotland north of Forth',
				color: '#2F4F4F',
				radius: 28
			},
			{
				id: 'dal-riata',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.48, 56.32],
				territory: 'Argyll & Antrim',
				color: '#FF6347',
				radius: 10
			}
		]
	},
	600: {
		name: 'The Heptarchy Emerges',
		description:
			'Anglo-Saxon kingdoms consolidate. Æthelberht of Kent converts to Christianity (597). Augustine establishes Canterbury.',
		kingdoms: [
			{
				id: 'dumnonia-600',
				name: 'Dumnonia',
				type: 'briton',
				center: [-4.45, 50.55],
				territory: 'Cornwall & Devon — shrinking',
				color: '#228B22',
				radius: 15
			},
			{
				id: 'dyfed-600',
				name: 'Dyfed',
				type: 'briton',
				center: [-4.97, 51.87],
				territory: 'Southwest Wales',
				color: '#32CD32',
				radius: 12
			},
			{
				id: 'gwynedd',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.27, 53.14],
				territory: "Northwest Wales — Cadwallon's realm",
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'powys',
				name: 'Powys',
				type: 'briton',
				center: [-3.38, 52.66],
				territory: 'Northeast Wales',
				color: '#2E8B57',
				radius: 13
			},
			{
				id: 'rheged-600',
				name: 'Rheged',
				type: 'briton',
				center: [-2.95, 54.66],
				territory: "Cumbria — Urien's kingdom",
				color: '#006400',
				radius: 14
			},
			{
				id: 'gododdin-600',
				name: 'Gododdin',
				type: 'briton',
				center: [-3.19, 55.95],
				territory: 'Lothian — doomed at Catraeth',
				color: '#228B22',
				radius: 10
			},
			{
				id: 'strathclyde',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.56, 55.94],
				territory: 'Clyde Valley',
				color: '#32CD32',
				radius: 13
			},
			{
				id: 'elmet-600',
				name: 'Elmet',
				type: 'briton',
				center: [-1.54, 53.79],
				territory: 'West Yorkshire — soon to fall',
				color: '#3CB371',
				radius: 8
			},
			{
				id: 'kent',
				name: 'Kent',
				type: 'saxon',
				center: [0.87, 51.27],
				territory: 'First Christian kingdom',
				color: '#4169E1',
				radius: 11
			},
			{
				id: 'sussex',
				name: 'Sussex',
				type: 'saxon',
				center: [-0.14, 50.92],
				territory: 'Sussex',
				color: '#6495ED',
				radius: 9
			},
			{
				id: 'wessex-early',
				name: 'Wessex',
				type: 'saxon',
				center: [-1.79, 51.06],
				territory: 'Hampshire, Wiltshire',
				color: '#4682B4',
				radius: 14
			},
			{
				id: 'essex',
				name: 'Essex',
				type: 'saxon',
				center: [0.47, 51.73],
				territory: 'Essex & Middlesex',
				color: '#5F9EA0',
				radius: 10
			},
			{
				id: 'east-anglia',
				name: 'East Anglia',
				type: 'anglian',
				center: [1.26, 52.41],
				territory: 'Norfolk & Suffolk — Wuffingas',
				color: '#9370DB',
				radius: 14
			},
			{
				id: 'mercia-early',
				name: 'Mercia',
				type: 'anglian',
				center: [-1.56, 52.77],
				territory: 'Midlands — "the March"',
				color: '#8A2BE2',
				radius: 18
			},
			{
				id: 'northumbria-early',
				name: 'Northumbria',
				type: 'anglian',
				center: [-1.69, 55.18],
				territory: 'United Bernicia & Deira',
				color: '#9932CC',
				radius: 20
			},
			{
				id: 'lindsey',
				name: 'Lindsey',
				type: 'anglian',
				center: [-0.19, 53.23],
				territory: 'Lincolnshire',
				color: '#BA55D3',
				radius: 9
			},
			{
				id: 'hwicce-early',
				name: 'Hwicce',
				type: 'anglian',
				center: [-2.16, 52.03],
				territory: 'Worcestershire area',
				color: '#DDA0DD',
				radius: 9
			},
			{
				id: 'picts-600',
				name: 'Pictish Kingdoms',
				type: 'pictish',
				center: [-3.43, 56.95],
				territory: 'Scotland',
				color: '#2F4F4F',
				radius: 25
			},
			{
				id: 'dal-riata-600',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.48, 56.32],
				territory: "Argyll — Columba's influence",
				color: '#FF6347',
				radius: 12
			}
		]
	},
	700: {
		name: 'Mercian Supremacy Begins',
		description:
			'Mercia under Æthelbald dominates. Bede writes his Ecclesiastical History (731). The Lindisfarne Gospels created.',
		kingdoms: [
			{
				id: 'dumnonia-700',
				name: 'Dumnonia',
				type: 'briton',
				center: [-5.05, 50.26],
				territory: 'Cornwall only — Devon lost',
				color: '#228B22',
				radius: 10
			},
			{
				id: 'dyfed-700',
				name: 'Dyfed',
				type: 'briton',
				center: [-4.97, 51.87],
				territory: 'Southwest Wales',
				color: '#32CD32',
				radius: 11
			},
			{
				id: 'gwynedd-700',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.27, 53.14],
				territory: 'Northwest Wales',
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'powys-700',
				name: 'Powys',
				type: 'briton',
				center: [-3.38, 52.66],
				territory: 'Northeast Wales',
				color: '#2E8B57',
				radius: 12
			},
			{
				id: 'glywysing',
				name: 'Glywysing',
				type: 'briton',
				center: [-3.18, 51.48],
				territory: 'Southeast Wales',
				color: '#006400',
				radius: 9
			},
			{
				id: 'brycheiniog',
				name: 'Brycheiniog',
				type: 'briton',
				center: [-3.38, 51.95],
				territory: 'Brecon area',
				color: '#228B22',
				radius: 8
			},
			{
				id: 'strathclyde-700',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.56, 55.94],
				territory: 'Clyde Valley',
				color: '#32CD32',
				radius: 13
			},
			{
				id: 'kent-700',
				name: 'Kent',
				type: 'saxon',
				center: [0.87, 51.27],
				territory: 'Kent — declining',
				color: '#4169E1',
				radius: 10
			},
			{
				id: 'sussex-700',
				name: 'Sussex',
				type: 'saxon',
				center: [-0.14, 50.92],
				territory: 'Sussex',
				color: '#6495ED',
				radius: 8
			},
			{
				id: 'wessex',
				name: 'Wessex',
				type: 'saxon',
				center: [-1.79, 51.06],
				territory: 'Southern England expanding',
				color: '#4682B4',
				radius: 19
			},
			{
				id: 'essex-700',
				name: 'Essex',
				type: 'saxon',
				center: [0.47, 51.73],
				territory: 'Essex',
				color: '#5F9EA0',
				radius: 9
			},
			{
				id: 'east-anglia-700',
				name: 'East Anglia',
				type: 'anglian',
				center: [1.26, 52.41],
				territory: 'Norfolk & Suffolk',
				color: '#9370DB',
				radius: 13
			},
			{
				id: 'mercia',
				name: 'Mercia',
				type: 'anglian',
				center: [-1.56, 52.77],
				territory: 'Midlands — DOMINANT',
				color: '#8A2BE2',
				radius: 23
			},
			{
				id: 'northumbria',
				name: 'Northumbria',
				type: 'anglian',
				center: [-1.69, 55.18],
				territory: 'North England & Lothian',
				color: '#9932CC',
				radius: 22
			},
			{
				id: 'hwicce',
				name: 'Hwicce',
				type: 'anglian',
				center: [-2.16, 52.03],
				territory: 'Mercian client',
				color: '#DDA0DD',
				radius: 9
			},
			{
				id: 'magonsaete',
				name: 'Magonsæte',
				type: 'anglian',
				center: [-2.72, 52.06],
				territory: 'Herefordshire',
				color: '#E6E6FA',
				radius: 8
			},
			{
				id: 'fortriu',
				name: 'Fortriu',
				type: 'pictish',
				center: [-3.43, 56.95],
				territory: 'Dominant Pictish kingdom',
				color: '#2F4F4F',
				radius: 24
			},
			{
				id: 'dal-riata-700',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.48, 56.32],
				territory: 'Argyll',
				color: '#FF6347',
				radius: 10
			}
		]
	},
	800: {
		name: "Offa's Legacy & Viking Dawn",
		description:
			"Offa's Dyke marks the Welsh border. In 793, Vikings raid Lindisfarne — the beginning of the end for the old order.",
		kingdoms: [
			{
				id: 'cornwall',
				name: 'Cornwall',
				type: 'briton',
				center: [-5.05, 50.26],
				territory: 'Last Dumnonian remnant',
				color: '#228B22',
				radius: 9
			},
			{
				id: 'dyfed-800',
				name: 'Dyfed',
				type: 'briton',
				center: [-4.97, 51.87],
				territory: 'Southwest Wales',
				color: '#32CD32',
				radius: 11
			},
			{
				id: 'gwynedd-800',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.27, 53.14],
				territory: 'Northwest Wales',
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'powys-800',
				name: 'Powys',
				type: 'briton',
				center: [-3.38, 52.66],
				territory: "Behind Offa's Dyke",
				color: '#2E8B57',
				radius: 11
			},
			{
				id: 'seisyllwg',
				name: 'Seisyllwg',
				type: 'briton',
				center: [-4.08, 52.13],
				territory: 'Ceredigion & Ystrad Tywi',
				color: '#006400',
				radius: 9
			},
			{
				id: 'glywysing-800',
				name: 'Glywysing',
				type: 'briton',
				center: [-3.18, 51.48],
				territory: 'Southeast Wales',
				color: '#228B22',
				radius: 9
			},
			{
				id: 'strathclyde-800',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.26, 55.64],
				territory: 'Southwest Scotland',
				color: '#32CD32',
				radius: 14
			},
			{
				id: 'wessex-800',
				name: 'Wessex',
				type: 'saxon',
				center: [-1.79, 51.06],
				territory: 'Southern England',
				color: '#4682B4',
				radius: 22
			},
			{
				id: 'mercia-800',
				name: 'Mercia',
				type: 'anglian',
				center: [-1.56, 52.77],
				territory: 'Post-Offa decline',
				color: '#8A2BE2',
				radius: 22
			},
			{
				id: 'northumbria-800',
				name: 'Northumbria',
				type: 'anglian',
				center: [-1.69, 55.18],
				territory: 'Weakening',
				color: '#9932CC',
				radius: 19
			},
			{
				id: 'east-anglia-800',
				name: 'East Anglia',
				type: 'anglian',
				center: [1.26, 52.41],
				territory: 'Norfolk & Suffolk',
				color: '#9370DB',
				radius: 13
			},
			{
				id: 'fortriu-800',
				name: 'Fortriu',
				type: 'pictish',
				center: [-3.43, 56.82],
				territory: 'Eastern Scotland',
				color: '#2F4F4F',
				radius: 22
			},
			{
				id: 'dal-riata-800',
				name: 'Dál Riata',
				type: 'gaelic',
				center: [-5.48, 56.32],
				territory: 'Western Scotland',
				color: '#FF6347',
				radius: 12
			}
		]
	},
	878: {
		name: 'Alfred & the Danelaw',
		description:
			'Treaty of Wedmore divides England. Alfred holds Wessex. The Great Heathen Army has conquered the north and east.',
		kingdoms: [
			{
				id: 'cornwall-878',
				name: 'Cornwall',
				type: 'briton',
				center: [-5.05, 50.26],
				territory: 'Absorbed into Wessex',
				color: '#228B22',
				radius: 8
			},
			{
				id: 'gwynedd-878',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.27, 53.14],
				territory: 'Northwest Wales',
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'powys-878',
				name: 'Powys',
				type: 'briton',
				center: [-3.38, 52.66],
				territory: 'Northeast Wales',
				color: '#2E8B57',
				radius: 10
			},
			{
				id: 'deheubarth',
				name: 'Deheubarth',
				type: 'briton',
				center: [-4.32, 52.06],
				territory: 'Southwest Wales — unified',
				color: '#006400',
				radius: 13
			},
			{
				id: 'morgannwg',
				name: 'Morgannwg',
				type: 'briton',
				center: [-3.42, 51.48],
				territory: 'Southeast Wales',
				color: '#228B22',
				radius: 9
			},
			{
				id: 'strathclyde-878',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.26, 55.64],
				territory: 'Surviving',
				color: '#32CD32',
				radius: 14
			},
			{
				id: 'wessex-878',
				name: 'Wessex',
				type: 'saxon',
				center: [-1.79, 51.06],
				territory: "Alfred's kingdom",
				color: '#4682B4',
				radius: 23
			},
			{
				id: 'western-mercia',
				name: 'Western Mercia',
				type: 'anglian',
				center: [-2.26, 52.52],
				territory: 'Rump Mercia',
				color: '#8A2BE2',
				radius: 13
			},
			{
				id: 'danelaw-york',
				name: 'Jórvík',
				type: 'viking',
				center: [-1.08, 53.96],
				territory: 'Viking Yorkshire',
				color: '#FF4500',
				radius: 16
			},
			{
				id: 'danelaw-five',
				name: 'Five Boroughs',
				type: 'viking',
				center: [-1.15, 52.95],
				territory: 'Derby, Leicester, Lincoln…',
				color: '#FF6347',
				radius: 14
			},
			{
				id: 'danelaw-ea',
				name: 'East Anglia',
				type: 'viking',
				center: [1.06, 52.41],
				territory: 'Danish East Anglia',
				color: '#FF7F50',
				radius: 13
			},
			{
				id: 'alba',
				name: 'Alba',
				type: 'gaelic',
				center: [-3.43, 56.47],
				territory: 'United Pict-Gaelic kingdom',
				color: '#20B2AA',
				radius: 25
			}
		]
	},
	950: {
		name: 'England United',
		description: "Æthelstan's descendants rule a united England. Eric Bloodaxe expelled from York in 954.",
		kingdoms: [
			{
				id: 'gwynedd-950',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.27, 53.14],
				territory: 'Northwest Wales',
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'powys-950',
				name: 'Powys',
				type: 'briton',
				center: [-3.38, 52.66],
				territory: 'Northeast Wales',
				color: '#2E8B57',
				radius: 10
			},
			{
				id: 'deheubarth-950',
				name: 'Deheubarth',
				type: 'briton',
				center: [-4.32, 52.06],
				territory: 'Southwest Wales',
				color: '#006400',
				radius: 12
			},
			{
				id: 'morgannwg-950',
				name: 'Morgannwg',
				type: 'briton',
				center: [-3.42, 51.48],
				territory: 'Southeast Wales',
				color: '#228B22',
				radius: 9
			},
			{
				id: 'strathclyde-950',
				name: 'Strathclyde',
				type: 'briton',
				center: [-4.26, 55.64],
				territory: 'Under Scottish influence',
				color: '#32CD32',
				radius: 13
			},
			{
				id: 'england',
				name: 'Kingdom of England',
				type: 'english',
				center: [-1.09, 52.48],
				territory: 'United English kingdom',
				color: '#DAA520',
				radius: 38
			},
			{
				id: 'alba-950',
				name: 'Alba',
				type: 'gaelic',
				center: [-3.73, 56.47],
				territory: 'Scotland',
				color: '#20B2AA',
				radius: 24
			},
			{
				id: 'orkney',
				name: 'Orkney',
				type: 'viking',
				center: [-2.96, 58.98],
				territory: 'Northern Isles',
				color: '#FF4500',
				radius: 10
			}
		]
	},
	1000: {
		name: 'Renewed Viking Terror',
		description: 'Sweyn Forkbeard raids relentlessly. The Danegeld bleeds England. Conquest looms.',
		kingdoms: [
			{
				id: 'gwynedd-1000',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.27, 53.14],
				territory: 'North Wales',
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'deheubarth-1000',
				name: 'Deheubarth',
				type: 'briton',
				center: [-4.32, 52.06],
				territory: 'South Wales',
				color: '#006400',
				radius: 14
			},
			{
				id: 'morgannwg-1000',
				name: 'Morgannwg',
				type: 'briton',
				center: [-3.42, 51.48],
				territory: 'Southeast Wales',
				color: '#228B22',
				radius: 8
			},
			{
				id: 'england-1000',
				name: 'Kingdom of England',
				type: 'english',
				center: [-1.09, 52.48],
				territory: 'Under attack',
				color: '#DAA520',
				radius: 37
			},
			{
				id: 'scotland',
				name: 'Kingdom of Scotland',
				type: 'gaelic',
				center: [-3.73, 56.47],
				territory: 'Expanding south',
				color: '#20B2AA',
				radius: 25
			},
			{
				id: 'orkney-1000',
				name: 'Orkney',
				type: 'viking',
				center: [-2.96, 58.98],
				territory: 'Northern Isles',
				color: '#FF4500',
				radius: 10
			}
		]
	},
	1066: {
		name: 'The End of an Era',
		description:
			'Harold defeats Harald Hardrada at Stamford Bridge, then falls to William at Hastings. The Norman era begins.',
		kingdoms: [
			{
				id: 'gwynedd-1066',
				name: 'Gwynedd',
				type: 'briton',
				center: [-4.27, 53.14],
				territory: 'North Wales',
				color: '#3CB371',
				radius: 12
			},
			{
				id: 'deheubarth-1066',
				name: 'Deheubarth',
				type: 'briton',
				center: [-4.32, 52.06],
				territory: 'South Wales',
				color: '#006400',
				radius: 13
			},
			{
				id: 'morgannwg-1066',
				name: 'Morgannwg',
				type: 'briton',
				center: [-3.42, 51.48],
				territory: 'Southeast Wales',
				color: '#228B22',
				radius: 8
			},
			{
				id: 'england-1066',
				name: 'Kingdom of England',
				type: 'english',
				center: [-1.09, 52.48],
				territory: 'Norman conquest begins',
				color: '#DAA520',
				radius: 37
			},
			{
				id: 'scotland-1066',
				name: 'Kingdom of Scotland',
				type: 'gaelic',
				center: [-3.73, 56.47],
				territory: 'Scotland',
				color: '#20B2AA',
				radius: 25
			}
		]
	}
};

export const typeColors: Record<KingdomType, KingdomTypeInfo> = {
	roman: { bg: '#8B0000', label: 'Roman' },
	briton: { bg: '#228B22', label: 'Brittonic' },
	saxon: { bg: '#4169E1', label: 'Saxon' },
	anglian: { bg: '#8A2BE2', label: 'Anglian' },
	pictish: { bg: '#2F4F4F', label: 'Pictish' },
	gaelic: { bg: '#20B2AA', label: 'Gaelic' },
	viking: { bg: '#FF4500', label: 'Norse/Danish' },
	english: { bg: '#DAA520', label: 'English' }
};

export const periodYears = Object.keys(historicalPeriods).map(Number).sort((a, b) => a - b);

export function findNearestPeriod(targetYear: number): number {
	let nearest = periodYears[0];
	for (const y of periodYears) {
		if (y <= targetYear) nearest = y;
		else break;
	}
	return nearest;
}
