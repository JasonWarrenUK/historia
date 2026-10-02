import type { Kingdom } from './types.js';

// Reference kingdom for the region-to-kingdom pipeline (roadmap 1MF.0).
// Regions are Domesday hundreds from Brookes (2020); every other kingdom
// still uses the legacy hand-drawn regions until the migration lands.
export const eastAnglia700: Kingdom = {
	id: 'east-anglia',
	name: 'East Anglia',
	type: 'anglian',
	center: [1.0, 52.6],
	territory: 'Kingdom of the East Angles: Norfolk, Suffolk and the Isle of Ely',
	color: '#9B8AAD',
	regions: [
		// Norfolk
		'hd-norfolk-blofield',
		'hd-norfolk-brothercross',
		'hd-norfolk-clackclose',
		'hd-norfolk-clavering',
		'hd-norfolk-depwade',
		'hd-norfolk-diss',
		'hd-norfolk-docking',
		'hd-norfolk-earsham',
		'hd-norfolk-east-flegg',
		'hd-norfolk-eynesford',
		'hd-norfolk-forehoe',
		'hd-norfolk-freebridge',
		'hd-norfolk-gallow',
		'hd-norfolk-grimshoe',
		'hd-norfolk-guiltcross',
		'hd-norfolk-happing',
		'hd-norfolk-henstead',
		'hd-norfolk-holt',
		'hd-norfolk-humbleyard',
		'hd-norfolk-laundich',
		'hd-norfolk-lodding',
		'hd-norfolk-mitford',
		'hd-norfolk-north-erpingham',
		'hd-norfolk-north-greenhoe',
		'hd-norfolk-norwich',
		'hd-norfolk-shropham',
		'hd-norfolk-smethdon',
		'hd-norfolk-south-erpingham',
		'hd-norfolk-south-greenhoe',
		'hd-norfolk-taverham',
		'hd-norfolk-thetford',
		'hd-norfolk-tunstead',
		'hd-norfolk-walsham',
		'hd-norfolk-wayland',
		'hd-norfolk-west-flegg',
		// Suffolk
		'hd-suffolk-babergh',
		'hd-suffolk-bishops',
		'hd-suffolk-blackbourn',
		'hd-suffolk-blything',
		'hd-suffolk-bosmere',
		'hd-suffolk-brademere',
		'hd-suffolk-bury',
		'hd-suffolk-carlford',
		'hd-suffolk-claydon',
		'hd-suffolk-colnes',
		'hd-suffolk-cosford',
		'hd-suffolk-hartismere',
		'hd-suffolk-ipswich',
		'hd-suffolk-lackford',
		'hd-suffolk-loose',
		'hd-suffolk-lothing',
		'hd-suffolk-lothingland',
		'hd-suffolk-parham',
		'hd-suffolk-plomesgate',
		'hd-suffolk-risbridge',
		'hd-suffolk-sandford',
		'hd-suffolk-stowmarket',
		'hd-suffolk-thedwastre',
		'hd-suffolk-thingoe',
		'hd-suffolk-wangford',
		'hd-suffolk-wilford',
		// Isle of Ely: also covers Thorney and Whittlesey (Middle Anglian), a
		// known approximation until parish-level boundaries are available
		'hd-cambridgeshire-ely-1',
		'hd-cambridgeshire-ely-2'
	],
	// East of the Devil's Dyke
	contestedRegions: ['hd-cambridgeshire-staploe', 'hd-cambridgeshire-cheveley'],
	founded: 571,
	ended: 869,
	capital: { name: 'Rendlesham', location: [1.414, 52.13] },
	rulers: [
		{ name: 'Wuffa', reign: '571 to 578' },
		{ name: 'Tytila', reign: 'from 578' },
		{ name: 'Rædwald', reign: 'c. 616 to before 627' },
		{ name: 'Eorpwald', reign: 'died 627 or 628' },
		{ name: 'Ricberht', reign: 'c. 627 to c. 630' },
		{ name: 'Sigeberht', reign: 'from c. 630' },
		{ name: 'Ecgric', reign: 'from c. 630; slain by early 640s' },
		{ name: 'Anna', reign: 'early 640s to c. 653' },
		{ name: 'Æthelhere', reign: 'c. 653 to 655' },
		{ name: 'Æthelwold', reign: '655 to 663' },
		{ name: 'Ealdwulf', reign: '663 to 713' }
	],
	description:
		"Ruled by the Wuffingas from the later sixth century until 749, and independent until the Great Army killed King Edmund in 869. Bede places Ely \"in the province of the East Angles\", so by his day the southern fen had been absorbed; the River Stour divided the kingdom from the East Saxons. Its western edge moved over time, and the land east of the Devil's Dyke (Staploe and Cheveley hundreds) is disputed. Boundaries follow Domesday hundreds of 1086, the closest open dataset to the period. Known approximation: the Isle of Ely hundreds also take in Thorney and Whittlesey, which lay with the Middle Angles or Mercia.",
	sources: [
		{
			citation: 'Bede, Ecclesiastical History of the English People, III.22 (Rendlesham) and IV.19 (Ely)',
			url: 'https://www.gutenberg.org/files/38326/38326-h/38326-h.html'
		},
		{
			citation: 'East of England Research Framework: Middle and Late Anglo-Saxon resource assessment',
			url: 'https://researchframeworks.org/eoe/resource-assessments/middle-and-late-anglo-saxon/'
		},
		{
			citation: 'Victoria County History, Cambridgeshire and the Isle of Ely vol. 4, pp. 4-8',
			url: 'https://www.british-history.ac.uk/vch/cambs/vol4/pp4-8'
		},
		{
			citation: 'Fryde, Greenway, Porter and Roy (1986) Handbook of British Chronology, 3rd edn, p. 8'
		},
		{
			citation: 'Wikipedia, List of monarchs of East Anglia (regnal dates)',
			url: 'https://en.wikipedia.org/wiki/List_of_monarchs_of_East_Anglia'
		},
		{
			citation:
				'Brookes, S. (2020) Domesday Shires and Hundreds of England [data-set]. York: Archaeology Data Service',
			url: 'https://doi.org/10.5284/1058999'
		}
	]
};
