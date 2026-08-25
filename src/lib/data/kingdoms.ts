import type { HistoricalPeriod, KingdomTypeInfo, KingdomType } from './types.js';
import { earlyPeriods } from './kingdoms-early.js';
import { heptarchyPeriods } from './kingdoms-heptarchy.js';
import { vikingPeriods } from './kingdoms-viking.js';
import { latePeriods } from './kingdoms-late.js';

export const historicalPeriods: Record<number, HistoricalPeriod> = {
	...earlyPeriods,
	...heptarchyPeriods,
	...vikingPeriods,
	...latePeriods,
};

export const typeColors: Record<KingdomType, KingdomTypeInfo> = {
	roman:   { bg: '#8B6F5E', label: 'Roman' },
	briton:  { bg: '#7A9B76', label: 'British' },
	saxon:   { bg: '#8FA4B8', label: 'Saxon' },
	anglian: { bg: '#9B8AAD', label: 'Anglian' },
	pictish: { bg: '#6B8F8B', label: 'Pictish' },
	gaelic:  { bg: '#7FB5A0', label: 'Gaelic/Scottish' },
	viking:  { bg: '#C4956A', label: 'Viking' },
	english: { bg: '#BFA85C', label: 'English' },
};

export const periodYears: number[] = Object.keys(historicalPeriods).map(Number).sort((a, b) => a - b);

export function findNearestPeriod(targetYear: number): number {
	return periodYears.reduce((nearest, year) => {
		return Math.abs(year - targetYear) < Math.abs(nearest - targetYear) ? year : nearest;
	});
}
