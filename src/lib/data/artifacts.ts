import type { Artifact } from './types.js';

export const artifacts: Artifact[] = [
	{
		id: 'sutton-hoo',
		name: 'Sutton Hoo Helmet',
		year: 625,
		location: [1.34, 52.09],
		kingdom: 'East Anglia',
		description: 'The iconic helmet from the Sutton Hoo ship burial, likely belonging to King Rædwald.',
		image: '🪖',
		type: 'artifact'
	},
	{
		id: 'lindisfarne',
		name: 'Lindisfarne Gospels',
		year: 715,
		location: [-1.8, 55.67],
		kingdom: 'Northumbria',
		description: 'Created at Lindisfarne monastery, the pinnacle of Insular art.',
		image: '📖',
		type: 'artifact'
	},
	{
		id: 'staffordshire-hoard',
		name: 'Staffordshire Hoard',
		year: 650,
		location: [-1.93, 52.65],
		kingdom: 'Mercia',
		description: 'Largest hoard of Anglo-Saxon gold — over 5kg of war gear.',
		image: '⚔️',
		type: 'artifact'
	},
	{
		id: 'book-of-kells',
		name: 'Book of Kells',
		year: 800,
		location: [-5.47, 56.33],
		kingdom: 'Dál Riata',
		description: 'Likely begun on Iona before Viking raids.',
		image: '📜',
		type: 'artifact'
	},
	{
		id: 'alfred-jewel',
		name: 'Alfred Jewel',
		year: 880,
		location: [-2.94, 51.01],
		kingdom: 'Wessex',
		description: '"Alfred ordered me made" — probably an æstel for reading.',
		image: '💎',
		type: 'artifact'
	},
	{
		id: 'ruthwell-cross',
		name: 'Ruthwell Cross',
		year: 730,
		location: [-3.41, 54.99],
		kingdom: 'Northumbria',
		description: 'Stone cross with "Dream of the Rood" runic inscriptions.',
		image: '✝️',
		type: 'artifact'
	},
	{
		id: 'pictish-stones',
		name: 'Pictish Symbol Stones',
		year: 600,
		location: [-2.47, 56.71],
		kingdom: 'Pictish',
		description: 'Mysterious carved stones with undeciphered symbols.',
		image: '🗿',
		type: 'artifact'
	},
	{
		id: 'gododdin',
		name: 'Y Gododdin',
		year: 600,
		location: [-3.19, 55.95],
		kingdom: 'Gododdin',
		description: 'Elegiac poem with the earliest reference to Arthur.',
		image: '📝',
		type: 'literature'
	},
	{
		id: 'beowulf',
		name: 'Beowulf',
		year: 750,
		location: [1.3, 52.63],
		kingdom: 'East Anglia',
		description: 'The great Old English epic.',
		image: '🐲',
		type: 'literature'
	},
	{
		id: 'wild-hunt',
		name: 'The Wild Hunt',
		year: 700,
		location: [-1.71, 52.19],
		kingdom: 'Anglo-Saxon',
		description: 'Woden leading souls across the night sky.',
		image: '🌙',
		type: 'folklore'
	},
	{
		id: 'wayland',
		name: "Wayland's Smithy",
		year: 500,
		location: [-1.6, 51.57],
		kingdom: 'Wessex',
		description: 'Germanic myth mapped onto Neolithic landscape.',
		image: '🔨',
		type: 'folklore'
	}
];
