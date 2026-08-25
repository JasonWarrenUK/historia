<script lang="ts">
	interface Props {
		periodName: string;
		year: number;
	}
	let { periodName, year }: Props = $props();
</script>

<!--
	Atlas-style decorative overlays for the map.
	All decorations use pointer-events: none so they don't interfere
	with map interaction. Colours are warm parchment tones to match
	a historical cartographic aesthetic.
-->
<div class="absolute inset-0 pointer-events-none z-10" aria-hidden="true">

	<!-- ============================================================
		 Compass Rose — bottom-left corner
		 Classic 8-point cartographic compass in warm parchment tones
	============================================================ -->
	<div style="position: absolute; bottom: 24px; left: 16px;">
		<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">

			<!-- Outer decorative ring -->
			<circle cx="32" cy="32" r="30" fill="none" stroke="#5C3A1E" stroke-width="0.75" opacity="0.6" />

			<!-- North point — elongated cardinal diamond (gold) -->
			<polygon
				points="32,4 35.5,28 32,31 28.5,28"
				fill="#8B6914"
				stroke="#5C3A1E"
				stroke-width="0.6"
			/>
			<!-- South point — elongated cardinal diamond (gold) -->
			<polygon
				points="32,60 35.5,36 32,33 28.5,36"
				fill="#8B6914"
				stroke="#5C3A1E"
				stroke-width="0.6"
			/>
			<!-- East point — elongated cardinal diamond (gold, narrower) -->
			<polygon
				points="60,32 36,28.5 33,32 36,35.5"
				fill="#8B6914"
				stroke="#5C3A1E"
				stroke-width="0.6"
			/>
			<!-- West point — elongated cardinal diamond (gold, narrower) -->
			<polygon
				points="4,32 28,28.5 31,32 28,35.5"
				fill="#8B6914"
				stroke="#5C3A1E"
				stroke-width="0.6"
			/>

			<!-- NE intercardinal triangle (lighter gold) -->
			<polygon
				points="52,12 36,29 29,36"
				fill="#C8A96E"
				stroke="#5C3A1E"
				stroke-width="0.5"
			/>
			<!-- SW intercardinal triangle (lighter gold) -->
			<polygon
				points="12,52 28,35 35,28"
				fill="#C8A96E"
				stroke="#5C3A1E"
				stroke-width="0.5"
			/>
			<!-- NW intercardinal triangle (lighter gold) -->
			<polygon
				points="12,12 29,29 36,36"
				fill="#C8A96E"
				stroke="#5C3A1E"
				stroke-width="0.5"
			/>
			<!-- SE intercardinal triangle (lighter gold) -->
			<polygon
				points="52,52 35,35 28,28"
				fill="#C8A96E"
				stroke="#5C3A1E"
				stroke-width="0.5"
			/>

			<!-- Centre dot -->
			<circle cx="32" cy="32" r="2.5" fill="#5C3A1E" />
			<circle cx="32" cy="32" r="1.2" fill="#F4E8C1" />

			<!-- Cardinal labels — serif-style positioning -->
			<!-- N label -->
			<text
				x="32"
				y="3"
				text-anchor="middle"
				font-family="Georgia, 'Times New Roman', serif"
				font-size="8"
				font-weight="bold"
				fill="#2C1810"
			>N</text>

			<!-- S label -->
			<text
				x="32"
				y="64"
				text-anchor="middle"
				font-family="Georgia, 'Times New Roman', serif"
				font-size="8"
				font-weight="bold"
				fill="#2C1810"
			>S</text>

			<!-- E label -->
			<text
				x="63"
				y="34.5"
				text-anchor="end"
				font-family="Georgia, 'Times New Roman', serif"
				font-size="8"
				font-weight="bold"
				fill="#2C1810"
			>E</text>

			<!-- W label -->
			<text
				x="1"
				y="34.5"
				text-anchor="start"
				font-family="Georgia, 'Times New Roman', serif"
				font-size="8"
				font-weight="bold"
				fill="#2C1810"
			>W</text>

		</svg>
	</div>

	<!-- ============================================================
		 Scale Bar — bottom-right corner
		 Graduated bar showing 0–100 km at approximately zoom 4.8,
		 based on ~65 km per degree longitude at latitude 54°N.
		 Two alternating 50px segments each representing ~50 km.
	============================================================ -->
	<div style="position: absolute; bottom: 24px; right: 16px; background: rgba(244,232,193,0.85); padding: 4px 8px; border: 1px solid #C8A96E; border-radius: 2px;">
		<!-- Tick marks above the bar -->
		<div style="display: flex; align-items: flex-end; height: 10px; width: 100px; margin-bottom: 1px;">
			<!-- Left tick (0) -->
			<div style="width: 1px; height: 6px; background: #5C3A1E; flex-shrink: 0;"></div>
			<!-- Mid-point spacer -->
			<div style="flex: 1;"></div>
			<!-- Mid tick (50 km) -->
			<div style="width: 1px; height: 4px; background: #5C3A1E; flex-shrink: 0;"></div>
			<!-- Right spacer -->
			<div style="flex: 1;"></div>
			<!-- Right tick (100 km) -->
			<div style="width: 1px; height: 6px; background: #5C3A1E; flex-shrink: 0;"></div>
		</div>
		<!-- Two alternating bar segments, each 50px wide -->
		<div style="display: flex; width: 100px; height: 5px; border: 1px solid #5C3A1E; overflow: hidden;">
			<div style="width: 50px; height: 100%; background: #5C3A1E;"></div>
			<div style="width: 50px; height: 100%; background: #F4E8C1;"></div>
		</div>
		<!-- Label row: 0 on the left, 100 km on the right -->
		<div style="display: flex; justify-content: space-between; width: 100px; margin-top: 2px;">
			<span style="font-family: Georgia, 'Times New Roman', serif; font-size: 8px; color: #5C3A1E; line-height: 1;">0</span>
			<span style="font-family: Georgia, 'Times New Roman', serif; font-size: 8px; color: #5C3A1E; line-height: 1;">100 km</span>
		</div>
	</div>

	<!-- ============================================================
		 Cartouche — top-centre
		 Decorative framed label showing the current period name
		 and approximate year. Double-line border with warm parchment
		 background for an authentic atlas cartouche appearance.
	============================================================ -->
	<div style="
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(244,232,193,0.92);
		border: 2px solid #8B6914;
		outline: 1px solid #C8A96E;
		outline-offset: -5px;
		padding: 6px 16px;
		text-align: center;
		min-width: 180px;
		white-space: nowrap;
		box-shadow: 0 1px 4px rgba(0,0,0,0.2);
	">
		<!-- Corner flourish marks rendered via a small SVG overlay -->
		<svg
			style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible;"
			preserveAspectRatio="none"
		>
			<!-- Top-left corner flourish -->
			<line x1="2" y1="8"  x2="2"  y2="2"  stroke="#8B6914" stroke-width="1.5" />
			<line x1="2" y1="2"  x2="8"  y2="2"  stroke="#8B6914" stroke-width="1.5" />
			<!-- Top-right corner flourish -->
			<line x1="calc(100% - 2px)" y1="8"  x2="calc(100% - 2px)" y2="2"  stroke="#8B6914" stroke-width="1.5" />
			<line x1="calc(100% - 2px)" y1="2"  x2="calc(100% - 8px)" y2="2"  stroke="#8B6914" stroke-width="1.5" />
			<!-- Bottom-left corner flourish -->
			<line x1="2" y1="calc(100% - 8px)" x2="2"  y2="calc(100% - 2px)" stroke="#8B6914" stroke-width="1.5" />
			<line x1="2" y1="calc(100% - 2px)" x2="8"  y2="calc(100% - 2px)" stroke="#8B6914" stroke-width="1.5" />
			<!-- Bottom-right corner flourish -->
			<line x1="calc(100% - 2px)" y1="calc(100% - 8px)" x2="calc(100% - 2px)" y2="calc(100% - 2px)" stroke="#8B6914" stroke-width="1.5" />
			<line x1="calc(100% - 2px)" y1="calc(100% - 2px)" x2="calc(100% - 8px)" y2="calc(100% - 2px)" stroke="#8B6914" stroke-width="1.5" />
		</svg>
		<!-- Period name -->
		<div style="font-family: Georgia, 'Times New Roman', serif; font-size: 13px; font-weight: bold; color: #2C1810; position: relative;">
			{periodName}
		</div>
		<!-- Approximate year -->
		<div style="font-family: Georgia, 'Times New Roman', serif; font-size: 10px; color: #6B4C2A; margin-top: 1px; position: relative;">
			c. {year} CE
		</div>
	</div>

</div>
