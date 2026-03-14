import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import {
  Play,
  Pause,
  X,
  MapPin,
  BookOpen,
  Scroll,
  Layers,
  Info,
} from "lucide-react";

// Simplified but accurate GeoJSON for British Isles coastline
// Coordinates are [longitude, latitude]
const britishIslesGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Great Britain" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            // Starting from Cornwall, going clockwise
            [-5.71, 50.07],
            [-5.54, 50.12],
            [-5.04, 50.04],
            [-4.79, 50.23],
            [-4.54, 50.32],
            [-4.19, 50.36],
            [-3.86, 50.23],
            [-3.53, 50.45],
            [-3.17, 50.69],
            [-2.98, 50.72],
            [-2.56, 50.63],
            [-1.95, 50.72],
            [-1.58, 50.66],
            [-1.31, 50.79],
            [-1.11, 50.84],
            [-0.75, 50.76],
            [-0.25, 50.83],
            [0.23, 50.93],
            [0.67, 50.88],
            [0.96, 51.36],
            [1.35, 51.18],
            [1.43, 51.33],
            [1.19, 51.38],
            [0.95, 51.52],
            [0.7, 51.52],
            [0.5, 51.73],
            [0.87, 51.88],
            [1.06, 52.01],
            [1.62, 52.38],
            [1.73, 52.53],
            [1.68, 52.74],
            [1.55, 52.85],
            [0.34, 52.91],
            [0.16, 52.88],
            [0.09, 53.01],
            [0.07, 53.26],
            [0.01, 53.52],
            [-0.19, 53.62],
            [-0.34, 53.73],
            [-0.43, 54.01],
            [-0.08, 54.13],
            [-0.17, 54.51],
            [-0.71, 54.53],
            [-1.16, 54.62],
            [-1.22, 54.76],
            [-1.59, 55.07],
            [-1.62, 55.3],
            [-1.69, 55.6],
            [-1.81, 55.65],
            [-2.03, 55.81],
            [-2.21, 55.9],
            [-2.35, 55.97],
            [-2.5, 56.01],
            [-2.67, 56.05],
            [-2.84, 56.05],
            [-2.86, 56.22],
            [-2.64, 56.33],
            [-2.52, 56.43],
            [-2.69, 56.46],
            [-2.9, 56.45],
            [-3.04, 56.45],
            [-3.26, 56.36],
            [-3.55, 56.05],
            [-3.78, 56.11],
            [-3.83, 56.08],
            [-4.09, 56.02],
            [-4.33, 55.9],
            [-4.59, 55.93],
            [-4.75, 55.85],
            [-4.89, 55.97],
            [-5.04, 56.02],
            [-5.19, 55.9],
            [-5.29, 55.96],
            [-5.33, 56.14],
            [-5.46, 56.28],
            [-5.63, 56.25],
            [-5.66, 56.41],
            [-5.95, 56.49],
            [-6.14, 56.51],
            [-5.88, 56.66],
            [-5.77, 56.77],
            [-5.67, 56.88],
            [-5.65, 57.09],
            [-5.83, 57.25],
            [-5.81, 57.36],
            [-5.62, 57.44],
            [-5.56, 57.54],
            [-5.72, 57.57],
            [-5.79, 57.64],
            [-5.66, 57.69],
            [-5.54, 57.88],
            [-5.35, 58.01],
            [-5.01, 58.02],
            [-5.01, 58.24],
            [-4.71, 58.51],
            [-4.35, 58.55],
            [-3.96, 58.56],
            [-3.39, 58.59],
            [-3.1, 58.45],
            [-3.05, 58.63],
            [-2.86, 58.68],
            [-3.39, 58.87],
            [-3.23, 59.05],
            [-3.09, 58.97],
            [-2.93, 58.78],
            [-2.65, 58.75],
            [-2.5, 58.73],
            [-2.3, 58.74],
            [-2.07, 58.6],
            [-1.87, 58.56],
            [-1.79, 58.46],
            [-1.61, 58.37],
            [-1.62, 58.22],
            [-1.78, 58.07],
            [-2.07, 57.94],
            [-2.09, 57.7],
            [-1.87, 57.47],
            [-2.08, 57.27],
            [-2.26, 57.09],
            [-2.04, 56.9],
            [-1.95, 56.79],
            [-2.23, 56.67],
            [-2.42, 56.54],
            [-2.57, 56.5],
            [-2.66, 56.37],
            [-2.92, 56.21],
            [-3.23, 56.08],
            [-3.51, 56.0],
            [-3.78, 55.94],
            [-4.03, 55.96],
            [-4.32, 55.9],
            [-4.62, 55.87],
            [-4.85, 55.78],
            [-4.87, 55.7],
            [-4.85, 55.55],
            [-4.55, 55.58],
            [-4.47, 55.48],
            [-4.69, 55.37],
            [-4.87, 55.15],
            [-4.97, 55.04],
            [-5.18, 54.98],
            [-5.12, 54.84],
            [-4.97, 54.76],
            [-5.15, 54.63],
            [-5.04, 54.47],
            [-4.72, 54.22],
            [-4.39, 54.19],
            [-4.05, 54.41],
            [-3.64, 54.51],
            [-3.44, 54.48],
            [-3.27, 54.11],
            [-3.17, 54.08],
            [-2.93, 54.15],
            [-2.81, 54.22],
            [-2.82, 54.11],
            [-2.96, 53.95],
            [-3.05, 53.75],
            [-2.9, 53.73],
            [-2.93, 53.54],
            [-3.05, 53.44],
            [-3.1, 53.34],
            [-3.0, 53.26],
            [-2.93, 53.1],
            [-2.73, 53.03],
            [-2.83, 52.94],
            [-3.01, 52.98],
            [-3.1, 52.9],
            [-3.11, 52.79],
            [-3.02, 52.57],
            [-3.09, 52.48],
            [-2.99, 52.33],
            [-3.11, 52.25],
            [-3.07, 52.15],
            [-3.12, 52.07],
            [-2.98, 51.91],
            [-3.27, 51.69],
            [-3.15, 51.45],
            [-2.74, 51.58],
            [-2.66, 51.55],
            [-2.64, 51.44],
            [-2.42, 51.19],
            [-3.02, 51.21],
            [-3.28, 51.18],
            [-3.5, 51.21],
            [-3.72, 51.23],
            [-4.0, 51.2],
            [-4.14, 51.19],
            [-4.29, 51.25],
            [-4.53, 51.18],
            [-4.79, 51.23],
            [-4.96, 51.22],
            [-5.11, 51.23],
            [-5.18, 51.1],
            [-5.08, 50.94],
            [-5.0, 50.79],
            [-5.04, 50.55],
            [-5.14, 50.41],
            [-5.24, 50.29],
            [-5.45, 50.13],
            [-5.51, 50.1],
            [-5.71, 50.07],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Ireland" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-6.03, 52.93],
            [-6.25, 52.8],
            [-6.35, 52.59],
            [-6.54, 52.22],
            [-6.6, 52.04],
            [-6.5, 51.92],
            [-6.95, 51.9],
            [-7.31, 51.82],
            [-7.83, 51.7],
            [-8.26, 51.8],
            [-8.58, 51.57],
            [-9.02, 51.52],
            [-9.42, 51.48],
            [-9.91, 51.58],
            [-10.17, 51.76],
            [-10.37, 51.9],
            [-10.28, 52.04],
            [-9.97, 52.23],
            [-9.91, 52.34],
            [-9.67, 52.52],
            [-9.46, 52.55],
            [-9.36, 52.63],
            [-9.48, 52.78],
            [-9.84, 53.06],
            [-9.93, 53.16],
            [-10.1, 53.3],
            [-10.16, 53.42],
            [-10.06, 53.54],
            [-9.88, 53.5],
            [-9.56, 53.5],
            [-9.3, 53.51],
            [-9.1, 53.53],
            [-8.93, 53.65],
            [-8.73, 53.79],
            [-8.53, 53.88],
            [-8.48, 54.01],
            [-8.21, 54.02],
            [-8.15, 54.11],
            [-8.04, 54.25],
            [-8.13, 54.33],
            [-8.27, 54.35],
            [-8.42, 54.47],
            [-8.32, 54.58],
            [-8.36, 54.66],
            [-8.18, 54.66],
            [-7.96, 54.71],
            [-7.78, 54.72],
            [-7.58, 54.76],
            [-7.34, 54.77],
            [-7.18, 54.83],
            [-7.26, 54.95],
            [-7.35, 55.04],
            [-7.52, 55.04],
            [-7.64, 55.13],
            [-7.56, 55.27],
            [-7.69, 55.34],
            [-7.86, 55.37],
            [-8.1, 55.27],
            [-8.25, 55.23],
            [-8.35, 55.18],
            [-8.17, 55.05],
            [-8.05, 54.99],
            [-7.86, 54.95],
            [-7.71, 55.07],
            [-7.5, 54.95],
            [-7.23, 54.84],
            [-7.16, 54.76],
            [-6.98, 54.65],
            [-6.66, 54.58],
            [-6.36, 54.51],
            [-6.23, 54.42],
            [-6.04, 54.37],
            [-5.88, 54.32],
            [-5.75, 54.25],
            [-5.66, 54.22],
            [-5.57, 54.07],
            [-5.54, 53.93],
            [-5.7, 53.82],
            [-5.77, 53.73],
            [-5.92, 53.61],
            [-6.02, 53.52],
            [-6.05, 53.42],
            [-5.99, 53.29],
            [-6.05, 53.18],
            [-6.04, 53.08],
            [-6.03, 52.93],
          ],
        ],
      },
    },
  ],
};

// Historical data for kingdoms across different periods
const historicalPeriods = {
  300: {
    name: "Late Roman Britain",
    description:
      "Britannia remains a province of the Roman Empire, divided into four provinces. Roman authority is weakening but urban life continues.",
    kingdoms: [
      {
        id: "britannia-prima",
        name: "Britannia Prima",
        type: "roman",
        center: [-2.58, 51.45],
        territory: "Southwest Britain (capital: Cirencester)",
        color: "#8B0000",
        radius: 22,
      },
      {
        id: "britannia-secunda",
        name: "Britannia Secunda",
        type: "roman",
        center: [-1.08, 53.96],
        territory: "Northern Britain (capital: York)",
        color: "#A52A2A",
        radius: 25,
      },
      {
        id: "maxima-caesariensis",
        name: "Maxima Caesariensis",
        type: "roman",
        center: [-0.12, 51.51],
        territory: "Southeast Britain (capital: London)",
        color: "#CD5C5C",
        radius: 20,
      },
      {
        id: "flavia-caesariensis",
        name: "Flavia Caesariensis",
        type: "roman",
        center: [-1.13, 52.63],
        territory: "Midlands (capital: Lincoln)",
        color: "#B22222",
        radius: 20,
      },
      {
        id: "caledonia",
        name: "Caledonia",
        type: "pictish",
        center: [-4.22, 56.82],
        territory: "Beyond Hadrians Wall - unconquered",
        color: "#2F4F4F",
        radius: 30,
      },
    ],
  },
  410: {
    name: "End of Roman Rule",
    description:
      "Emperor Honorius tells British cities to look to their own defence. Roman administration collapses, but Romano-British culture persists.",
    kingdoms: [
      {
        id: "dumnonia",
        name: "Dumnonia",
        type: "briton",
        center: [-3.53, 50.72],
        territory: "Cornwall, Devon & parts of Somerset",
        color: "#228B22",
        radius: 18,
      },
      {
        id: "dobunni",
        name: "Dobunni Territory",
        type: "briton",
        center: [-2.24, 51.86],
        territory: "Cotswolds region",
        color: "#32CD32",
        radius: 12,
      },
      {
        id: "cornovii",
        name: "Cornovii Territory",
        type: "briton",
        center: [-2.76, 52.71],
        territory: "Shropshire region",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "brigantes",
        name: "Brigantes Territory",
        type: "briton",
        center: [-1.69, 54.23],
        territory: "Pennines & Yorkshire",
        color: "#2E8B57",
        radius: 20,
      },
      {
        id: "votadini",
        name: "Votadini",
        type: "briton",
        center: [-2.78, 55.95],
        territory: "Lothian & Borders",
        color: "#006400",
        radius: 14,
      },
      {
        id: "novantae",
        name: "Novantae",
        type: "briton",
        center: [-4.52, 54.9],
        territory: "Galloway",
        color: "#228B22",
        radius: 10,
      },
      {
        id: "picts",
        name: "Pictish Kingdoms",
        type: "pictish",
        center: [-3.43, 56.95],
        territory: "Scotland north of Forth-Clyde",
        color: "#2F4F4F",
        radius: 28,
      },
      {
        id: "dal-riata-early",
        name: "Dál Riata",
        type: "gaelic",
        center: [-5.48, 56.32],
        territory: "Argyll - Gaelic settlers",
        color: "#FF6347",
        radius: 10,
      },
    ],
  },
  500: {
    name: "The Age of Arthur?",
    description:
      "The legendary period. British kingdoms resist Saxon expansion. Battle of Badon Hill reportedly halts Saxon advance for a generation.",
    kingdoms: [
      {
        id: "dumnonia-500",
        name: "Dumnonia",
        type: "briton",
        center: [-3.83, 50.72],
        territory: "Cornwall, Devon, Somerset",
        color: "#228B22",
        radius: 18,
      },
      {
        id: "dyfed",
        name: "Dyfed",
        type: "briton",
        center: [-4.97, 51.87],
        territory: "Southwest Wales - Irish dynasty",
        color: "#32CD32",
        radius: 12,
      },
      {
        id: "gwynedd-early",
        name: "Gwynedd",
        type: "briton",
        center: [-4.27, 53.14],
        territory: "Northwest Wales",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "powys-early",
        name: "Powys",
        type: "briton",
        center: [-3.38, 52.66],
        territory: "Northeast Wales & borders",
        color: "#2E8B57",
        radius: 14,
      },
      {
        id: "rheged",
        name: "Rheged",
        type: "briton",
        center: [-2.95, 54.66],
        territory: "Cumbria, Lancashire, Galloway",
        color: "#006400",
        radius: 16,
      },
      {
        id: "gododdin",
        name: "Gododdin",
        type: "briton",
        center: [-3.19, 55.95],
        territory: "Lothian - capital at Din Eidyn",
        color: "#228B22",
        radius: 12,
      },
      {
        id: "strathclyde-early",
        name: "Alt Clut",
        type: "briton",
        center: [-4.56, 55.94],
        territory: "Strathclyde - Dumbarton Rock",
        color: "#32CD32",
        radius: 14,
      },
      {
        id: "elmet",
        name: "Elmet",
        type: "briton",
        center: [-1.54, 53.79],
        territory: "West Yorkshire",
        color: "#3CB371",
        radius: 9,
      },
      {
        id: "pengwern",
        name: "Pengwern",
        type: "briton",
        center: [-2.76, 52.71],
        territory: "Shropshire",
        color: "#2E8B57",
        radius: 10,
      },
      {
        id: "kent-early",
        name: "Cantwara",
        type: "saxon",
        center: [0.87, 51.27],
        territory: "Kent - Hengists heirs",
        color: "#4169E1",
        radius: 10,
      },
      {
        id: "sussex-early",
        name: "Suth Seaxe",
        type: "saxon",
        center: [-0.14, 50.92],
        territory: "Sussex coast",
        color: "#6495ED",
        radius: 9,
      },
      {
        id: "gewisse",
        name: "Gewisse",
        type: "saxon",
        center: [-1.32, 51.44],
        territory: "Upper Thames - proto-Wessex",
        color: "#4682B4",
        radius: 10,
      },
      {
        id: "picts-500",
        name: "Pictish Kingdoms",
        type: "pictish",
        center: [-3.43, 56.95],
        territory: "Scotland north of Forth",
        color: "#2F4F4F",
        radius: 28,
      },
      {
        id: "dal-riata",
        name: "Dál Riata",
        type: "gaelic",
        center: [-5.48, 56.32],
        territory: "Argyll & Antrim",
        color: "#FF6347",
        radius: 10,
      },
    ],
  },
  600: {
    name: "The Heptarchy Emerges",
    description:
      "Anglo-Saxon kingdoms consolidate. Æthelberht of Kent converts to Christianity (597). Augustine establishes Canterbury.",
    kingdoms: [
      {
        id: "dumnonia-600",
        name: "Dumnonia",
        type: "briton",
        center: [-4.45, 50.55],
        territory: "Cornwall & Devon - shrinking",
        color: "#228B22",
        radius: 15,
      },
      {
        id: "dyfed-600",
        name: "Dyfed",
        type: "briton",
        center: [-4.97, 51.87],
        territory: "Southwest Wales",
        color: "#32CD32",
        radius: 12,
      },
      {
        id: "gwynedd",
        name: "Gwynedd",
        type: "briton",
        center: [-4.27, 53.14],
        territory: "Northwest Wales - Cadwallons realm",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "powys",
        name: "Powys",
        type: "briton",
        center: [-3.38, 52.66],
        territory: "Northeast Wales",
        color: "#2E8B57",
        radius: 13,
      },
      {
        id: "rheged-600",
        name: "Rheged",
        type: "briton",
        center: [-2.95, 54.66],
        territory: "Cumbria - Uriens kingdom",
        color: "#006400",
        radius: 14,
      },
      {
        id: "gododdin-600",
        name: "Gododdin",
        type: "briton",
        center: [-3.19, 55.95],
        territory: "Lothian - doomed at Catraeth",
        color: "#228B22",
        radius: 10,
      },
      {
        id: "strathclyde",
        name: "Strathclyde",
        type: "briton",
        center: [-4.56, 55.94],
        territory: "Clyde Valley",
        color: "#32CD32",
        radius: 13,
      },
      {
        id: "elmet-600",
        name: "Elmet",
        type: "briton",
        center: [-1.54, 53.79],
        territory: "West Yorkshire - soon to fall",
        color: "#3CB371",
        radius: 8,
      },
      {
        id: "kent",
        name: "Kent",
        type: "saxon",
        center: [0.87, 51.27],
        territory: "First Christian kingdom",
        color: "#4169E1",
        radius: 11,
      },
      {
        id: "sussex",
        name: "Sussex",
        type: "saxon",
        center: [-0.14, 50.92],
        territory: "Sussex",
        color: "#6495ED",
        radius: 9,
      },
      {
        id: "wessex-early",
        name: "Wessex",
        type: "saxon",
        center: [-1.79, 51.06],
        territory: "Hampshire, Wiltshire",
        color: "#4682B4",
        radius: 14,
      },
      {
        id: "essex",
        name: "Essex",
        type: "saxon",
        center: [0.47, 51.73],
        territory: "Essex & Middlesex",
        color: "#5F9EA0",
        radius: 10,
      },
      {
        id: "east-anglia",
        name: "East Anglia",
        type: "anglian",
        center: [1.26, 52.41],
        territory: "Norfolk & Suffolk - Wuffingas",
        color: "#9370DB",
        radius: 14,
      },
      {
        id: "mercia-early",
        name: "Mercia",
        type: "anglian",
        center: [-1.56, 52.77],
        territory: 'Midlands - "the March"',
        color: "#8A2BE2",
        radius: 18,
      },
      {
        id: "northumbria-early",
        name: "Northumbria",
        type: "anglian",
        center: [-1.69, 55.18],
        territory: "United Bernicia & Deira",
        color: "#9932CC",
        radius: 20,
      },
      {
        id: "lindsey",
        name: "Lindsey",
        type: "anglian",
        center: [-0.19, 53.23],
        territory: "Lincolnshire",
        color: "#BA55D3",
        radius: 9,
      },
      {
        id: "hwicce-early",
        name: "Hwicce",
        type: "anglian",
        center: [-2.16, 52.03],
        territory: "Worcestershire area",
        color: "#DDA0DD",
        radius: 9,
      },
      {
        id: "picts-600",
        name: "Pictish Kingdoms",
        type: "pictish",
        center: [-3.43, 56.95],
        territory: "Scotland",
        color: "#2F4F4F",
        radius: 25,
      },
      {
        id: "dal-riata-600",
        name: "Dál Riata",
        type: "gaelic",
        center: [-5.48, 56.32],
        territory: "Argyll - Columbas influence",
        color: "#FF6347",
        radius: 12,
      },
    ],
  },
  700: {
    name: "Mercian Supremacy Begins",
    description:
      "Mercia under Æthelbald dominates. Bede writes his Ecclesiastical History (731). The Lindisfarne Gospels created.",
    kingdoms: [
      {
        id: "dumnonia-700",
        name: "Dumnonia",
        type: "briton",
        center: [-5.05, 50.26],
        territory: "Cornwall only - Devon lost",
        color: "#228B22",
        radius: 10,
      },
      {
        id: "dyfed-700",
        name: "Dyfed",
        type: "briton",
        center: [-4.97, 51.87],
        territory: "Southwest Wales",
        color: "#32CD32",
        radius: 11,
      },
      {
        id: "gwynedd-700",
        name: "Gwynedd",
        type: "briton",
        center: [-4.27, 53.14],
        territory: "Northwest Wales",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "powys-700",
        name: "Powys",
        type: "briton",
        center: [-3.38, 52.66],
        territory: "Northeast Wales",
        color: "#2E8B57",
        radius: 12,
      },
      {
        id: "glywysing",
        name: "Glywysing",
        type: "briton",
        center: [-3.18, 51.48],
        territory: "Southeast Wales",
        color: "#006400",
        radius: 9,
      },
      {
        id: "brycheiniog",
        name: "Brycheiniog",
        type: "briton",
        center: [-3.38, 51.95],
        territory: "Brecon area",
        color: "#228B22",
        radius: 8,
      },
      {
        id: "strathclyde-700",
        name: "Strathclyde",
        type: "briton",
        center: [-4.56, 55.94],
        territory: "Clyde Valley",
        color: "#32CD32",
        radius: 13,
      },
      {
        id: "kent-700",
        name: "Kent",
        type: "saxon",
        center: [0.87, 51.27],
        territory: "Kent - declining",
        color: "#4169E1",
        radius: 10,
      },
      {
        id: "sussex-700",
        name: "Sussex",
        type: "saxon",
        center: [-0.14, 50.92],
        territory: "Sussex",
        color: "#6495ED",
        radius: 8,
      },
      {
        id: "wessex",
        name: "Wessex",
        type: "saxon",
        center: [-1.79, 51.06],
        territory: "Southern England expanding",
        color: "#4682B4",
        radius: 19,
      },
      {
        id: "essex-700",
        name: "Essex",
        type: "saxon",
        center: [0.47, 51.73],
        territory: "Essex",
        color: "#5F9EA0",
        radius: 9,
      },
      {
        id: "east-anglia-700",
        name: "East Anglia",
        type: "anglian",
        center: [1.26, 52.41],
        territory: "Norfolk & Suffolk",
        color: "#9370DB",
        radius: 13,
      },
      {
        id: "mercia",
        name: "Mercia",
        type: "anglian",
        center: [-1.56, 52.77],
        territory: "Midlands - DOMINANT",
        color: "#8A2BE2",
        radius: 23,
      },
      {
        id: "northumbria",
        name: "Northumbria",
        type: "anglian",
        center: [-1.69, 55.18],
        territory: "North England & Lothian",
        color: "#9932CC",
        radius: 22,
      },
      {
        id: "hwicce",
        name: "Hwicce",
        type: "anglian",
        center: [-2.16, 52.03],
        territory: "Mercian client",
        color: "#DDA0DD",
        radius: 9,
      },
      {
        id: "magonsaete",
        name: "Magonsæte",
        type: "anglian",
        center: [-2.72, 52.06],
        territory: "Herefordshire",
        color: "#E6E6FA",
        radius: 8,
      },
      {
        id: "fortriu",
        name: "Fortriu",
        type: "pictish",
        center: [-3.43, 56.95],
        territory: "Dominant Pictish kingdom",
        color: "#2F4F4F",
        radius: 24,
      },
      {
        id: "dal-riata-700",
        name: "Dál Riata",
        type: "gaelic",
        center: [-5.48, 56.32],
        territory: "Argyll",
        color: "#FF6347",
        radius: 10,
      },
    ],
  },
  800: {
    name: "Offa's Legacy & Viking Dawn",
    description:
      "Offa's Dyke marks the Welsh border. In 793, Vikings raid Lindisfarne - the beginning of the end for the old order.",
    kingdoms: [
      {
        id: "cornwall",
        name: "Cornwall",
        type: "briton",
        center: [-5.05, 50.26],
        territory: "Last Dumnonian remnant",
        color: "#228B22",
        radius: 9,
      },
      {
        id: "dyfed-800",
        name: "Dyfed",
        type: "briton",
        center: [-4.97, 51.87],
        territory: "Southwest Wales",
        color: "#32CD32",
        radius: 11,
      },
      {
        id: "gwynedd-800",
        name: "Gwynedd",
        type: "briton",
        center: [-4.27, 53.14],
        territory: "Northwest Wales",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "powys-800",
        name: "Powys",
        type: "briton",
        center: [-3.38, 52.66],
        territory: "Behind Offas Dyke",
        color: "#2E8B57",
        radius: 11,
      },
      {
        id: "seisyllwg",
        name: "Seisyllwg",
        type: "briton",
        center: [-4.08, 52.13],
        territory: "Ceredigion & Ystrad Tywi",
        color: "#006400",
        radius: 9,
      },
      {
        id: "glywysing-800",
        name: "Glywysing",
        type: "briton",
        center: [-3.18, 51.48],
        territory: "Southeast Wales",
        color: "#228B22",
        radius: 9,
      },
      {
        id: "strathclyde-800",
        name: "Strathclyde",
        type: "briton",
        center: [-4.26, 55.64],
        territory: "Southwest Scotland",
        color: "#32CD32",
        radius: 14,
      },
      {
        id: "wessex-800",
        name: "Wessex",
        type: "saxon",
        center: [-1.79, 51.06],
        territory: "Southern England",
        color: "#4682B4",
        radius: 22,
      },
      {
        id: "mercia-800",
        name: "Mercia",
        type: "anglian",
        center: [-1.56, 52.77],
        territory: "Post-Offa decline",
        color: "#8A2BE2",
        radius: 22,
      },
      {
        id: "northumbria-800",
        name: "Northumbria",
        type: "anglian",
        center: [-1.69, 55.18],
        territory: "Weakening",
        color: "#9932CC",
        radius: 19,
      },
      {
        id: "east-anglia-800",
        name: "East Anglia",
        type: "anglian",
        center: [1.26, 52.41],
        territory: "Norfolk & Suffolk",
        color: "#9370DB",
        radius: 13,
      },
      {
        id: "fortriu-800",
        name: "Fortriu",
        type: "pictish",
        center: [-3.43, 56.82],
        territory: "Eastern Scotland",
        color: "#2F4F4F",
        radius: 22,
      },
      {
        id: "dal-riata-800",
        name: "Dál Riata",
        type: "gaelic",
        center: [-5.48, 56.32],
        territory: "Western Scotland",
        color: "#FF6347",
        radius: 12,
      },
    ],
  },
  878: {
    name: "Alfred & the Danelaw",
    description:
      "Treaty of Wedmore divides England. Alfred holds Wessex. The Great Heathen Army has conquered the north and east.",
    kingdoms: [
      {
        id: "cornwall-878",
        name: "Cornwall",
        type: "briton",
        center: [-5.05, 50.26],
        territory: "Absorbed into Wessex",
        color: "#228B22",
        radius: 8,
      },
      {
        id: "gwynedd-878",
        name: "Gwynedd",
        type: "briton",
        center: [-4.27, 53.14],
        territory: "Northwest Wales",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "powys-878",
        name: "Powys",
        type: "briton",
        center: [-3.38, 52.66],
        territory: "Northeast Wales",
        color: "#2E8B57",
        radius: 10,
      },
      {
        id: "deheubarth",
        name: "Deheubarth",
        type: "briton",
        center: [-4.32, 52.06],
        territory: "Southwest Wales - unified",
        color: "#006400",
        radius: 13,
      },
      {
        id: "morgannwg",
        name: "Morgannwg",
        type: "briton",
        center: [-3.42, 51.48],
        territory: "Southeast Wales",
        color: "#228B22",
        radius: 9,
      },
      {
        id: "strathclyde-878",
        name: "Strathclyde",
        type: "briton",
        center: [-4.26, 55.64],
        territory: "Surviving",
        color: "#32CD32",
        radius: 14,
      },
      {
        id: "wessex-878",
        name: "Wessex",
        type: "saxon",
        center: [-1.79, 51.06],
        territory: "Alfreds kingdom",
        color: "#4682B4",
        radius: 23,
      },
      {
        id: "western-mercia",
        name: "Western Mercia",
        type: "anglian",
        center: [-2.26, 52.52],
        territory: "Rump Mercia",
        color: "#8A2BE2",
        radius: 13,
      },
      {
        id: "danelaw-york",
        name: "Jórvík",
        type: "viking",
        center: [-1.08, 53.96],
        territory: "Viking Yorkshire",
        color: "#FF4500",
        radius: 16,
      },
      {
        id: "danelaw-five",
        name: "Five Boroughs",
        type: "viking",
        center: [-1.15, 52.95],
        territory: "Derby, Leicester, Lincoln...",
        color: "#FF6347",
        radius: 14,
      },
      {
        id: "danelaw-ea",
        name: "East Anglia",
        type: "viking",
        center: [1.06, 52.41],
        territory: "Danish East Anglia",
        color: "#FF7F50",
        radius: 13,
      },
      {
        id: "alba",
        name: "Alba",
        type: "gaelic",
        center: [-3.43, 56.47],
        territory: "United Pict-Gaelic kingdom",
        color: "#20B2AA",
        radius: 25,
      },
    ],
  },
  950: {
    name: "England United",
    description:
      "Æthelstan's descendants rule a united England. Eric Bloodaxe expelled from York in 954.",
    kingdoms: [
      {
        id: "gwynedd-950",
        name: "Gwynedd",
        type: "briton",
        center: [-4.27, 53.14],
        territory: "Northwest Wales",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "powys-950",
        name: "Powys",
        type: "briton",
        center: [-3.38, 52.66],
        territory: "Northeast Wales",
        color: "#2E8B57",
        radius: 10,
      },
      {
        id: "deheubarth-950",
        name: "Deheubarth",
        type: "briton",
        center: [-4.32, 52.06],
        territory: "Southwest Wales",
        color: "#006400",
        radius: 12,
      },
      {
        id: "morgannwg-950",
        name: "Morgannwg",
        type: "briton",
        center: [-3.42, 51.48],
        territory: "Southeast Wales",
        color: "#228B22",
        radius: 9,
      },
      {
        id: "strathclyde-950",
        name: "Strathclyde",
        type: "briton",
        center: [-4.26, 55.64],
        territory: "Under Scottish influence",
        color: "#32CD32",
        radius: 13,
      },
      {
        id: "england",
        name: "Kingdom of England",
        type: "english",
        center: [-1.09, 52.48],
        territory: "United English kingdom",
        color: "#DAA520",
        radius: 38,
      },
      {
        id: "alba-950",
        name: "Alba",
        type: "gaelic",
        center: [-3.73, 56.47],
        territory: "Scotland",
        color: "#20B2AA",
        radius: 24,
      },
      {
        id: "orkney",
        name: "Orkney",
        type: "viking",
        center: [-2.96, 58.98],
        territory: "Northern Isles",
        color: "#FF4500",
        radius: 10,
      },
    ],
  },
  1000: {
    name: "Renewed Viking Terror",
    description:
      "Sweyn Forkbeard raids relentlessly. The Danegeld bleeds England. Conquest looms.",
    kingdoms: [
      {
        id: "gwynedd-1000",
        name: "Gwynedd",
        type: "briton",
        center: [-4.27, 53.14],
        territory: "North Wales",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "deheubarth-1000",
        name: "Deheubarth",
        type: "briton",
        center: [-4.32, 52.06],
        territory: "South Wales",
        color: "#006400",
        radius: 14,
      },
      {
        id: "morgannwg-1000",
        name: "Morgannwg",
        type: "briton",
        center: [-3.42, 51.48],
        territory: "Southeast Wales",
        color: "#228B22",
        radius: 8,
      },
      {
        id: "england-1000",
        name: "Kingdom of England",
        type: "english",
        center: [-1.09, 52.48],
        territory: "Under attack",
        color: "#DAA520",
        radius: 37,
      },
      {
        id: "scotland",
        name: "Kingdom of Scotland",
        type: "gaelic",
        center: [-3.73, 56.47],
        territory: "Expanding south",
        color: "#20B2AA",
        radius: 25,
      },
      {
        id: "orkney-1000",
        name: "Orkney",
        type: "viking",
        center: [-2.96, 58.98],
        territory: "Northern Isles",
        color: "#FF4500",
        radius: 10,
      },
    ],
  },
  1066: {
    name: "The End of an Era",
    description:
      "Harold defeats Harald Hardrada at Stamford Bridge, then falls to William at Hastings. The Norman era begins.",
    kingdoms: [
      {
        id: "gwynedd-1066",
        name: "Gwynedd",
        type: "briton",
        center: [-4.27, 53.14],
        territory: "North Wales",
        color: "#3CB371",
        radius: 12,
      },
      {
        id: "deheubarth-1066",
        name: "Deheubarth",
        type: "briton",
        center: [-4.32, 52.06],
        territory: "South Wales",
        color: "#006400",
        radius: 13,
      },
      {
        id: "morgannwg-1066",
        name: "Morgannwg",
        type: "briton",
        center: [-3.42, 51.48],
        territory: "Southeast Wales",
        color: "#228B22",
        radius: 8,
      },
      {
        id: "england-1066",
        name: "Kingdom of England",
        type: "english",
        center: [-1.09, 52.48],
        territory: "Norman conquest begins",
        color: "#DAA520",
        radius: 37,
      },
      {
        id: "scotland-1066",
        name: "Kingdom of Scotland",
        type: "gaelic",
        center: [-3.73, 56.47],
        territory: "Scotland",
        color: "#20B2AA",
        radius: 25,
      },
    ],
  },
};

// Artifacts
const artifacts = [
  {
    id: "sutton-hoo",
    name: "Sutton Hoo Helmet",
    year: 625,
    location: [1.34, 52.09],
    kingdom: "East Anglia",
    description:
      "The iconic helmet from the Sutton Hoo ship burial, likely belonging to King Rædwald.",
    image: "🪖",
    type: "artifact",
  },
  {
    id: "lindisfarne",
    name: "Lindisfarne Gospels",
    year: 715,
    location: [-1.8, 55.67],
    kingdom: "Northumbria",
    description:
      "Created at Lindisfarne monastery, the pinnacle of Insular art.",
    image: "📖",
    type: "artifact",
  },
  {
    id: "staffordshire-hoard",
    name: "Staffordshire Hoard",
    year: 650,
    location: [-1.93, 52.65],
    kingdom: "Mercia",
    description: "Largest hoard of Anglo-Saxon gold - over 5kg of war gear.",
    image: "⚔️",
    type: "artifact",
  },
  {
    id: "book-of-kells",
    name: "Book of Kells",
    year: 800,
    location: [-5.47, 56.33],
    kingdom: "Dál Riata",
    description: "Likely begun on Iona before Viking raids.",
    image: "📜",
    type: "artifact",
  },
  {
    id: "alfred-jewel",
    name: "Alfred Jewel",
    year: 880,
    location: [-2.94, 51.01],
    kingdom: "Wessex",
    description: '"Alfred ordered me made" - probably an æstel for reading.',
    image: "💎",
    type: "artifact",
  },
  {
    id: "ruthwell-cross",
    name: "Ruthwell Cross",
    year: 730,
    location: [-3.41, 54.99],
    kingdom: "Northumbria",
    description: 'Stone cross with "Dream of the Rood" runic inscriptions.',
    image: "✝️",
    type: "artifact",
  },
  {
    id: "pictish-stones",
    name: "Pictish Symbol Stones",
    year: 600,
    location: [-2.47, 56.71],
    kingdom: "Pictish",
    description: "Mysterious carved stones with undeciphered symbols.",
    image: "🗿",
    type: "artifact",
  },
  {
    id: "gododdin",
    name: "Y Gododdin",
    year: 600,
    location: [-3.19, 55.95],
    kingdom: "Gododdin",
    description: "Elegiac poem with the earliest reference to Arthur.",
    image: "📝",
    type: "literature",
  },
  {
    id: "beowulf",
    name: "Beowulf",
    year: 750,
    location: [1.3, 52.63],
    kingdom: "East Anglia",
    description: "The great Old English epic.",
    image: "🐲",
    type: "literature",
  },
  {
    id: "wild-hunt",
    name: "The Wild Hunt",
    year: 700,
    location: [-1.71, 52.19],
    kingdom: "Anglo-Saxon",
    description: "Woden leading souls across the night sky.",
    image: "🌙",
    type: "folklore",
  },
  {
    id: "wayland",
    name: "Waylands Smithy",
    year: 500,
    location: [-1.6, 51.57],
    kingdom: "Wessex",
    description: "Germanic myth mapped onto Neolithic landscape.",
    image: "🔨",
    type: "folklore",
  },
];

// Key events
const keyEvents = [
  { year: 306, text: "Constantine proclaimed Emperor at York" },
  { year: 410, text: "Rescript of Honorius - Rome abandons Britain" },
  { year: 449, text: "Hengist and Horsa arrive (traditional)" },
  { year: 500, text: "Battle of Badon Hill" },
  { year: 563, text: "Columba founds Iona" },
  { year: 597, text: "Augustine arrives in Kent" },
  { year: 616, text: "Battle of Chester" },
  { year: 633, text: "Cadwallon kills Edwin" },
  { year: 655, text: "Battle of Winwæd - Penda killed" },
  { year: 664, text: "Synod of Whitby" },
  { year: 685, text: "Battle of Dun Nechtain" },
  { year: 731, text: "Bede completes his History" },
  { year: 757, text: "Offa becomes King of Mercia" },
  { year: 793, text: "Vikings sack Lindisfarne" },
  { year: 843, text: "Kenneth MacAlpin unites Picts & Scots" },
  { year: 865, text: "Great Heathen Army lands" },
  { year: 878, text: "Alfred defeats Guthrum at Edington" },
  { year: 927, text: "Æthelstan - first King of England" },
  { year: 937, text: "Battle of Brunanburh" },
  { year: 1013, text: "Sweyn Forkbeard conquers England" },
  { year: 1066, text: "Stamford Bridge, then Hastings" },
];

const typeColors = {
  roman: { bg: "#8B0000", label: "Roman" },
  briton: { bg: "#228B22", label: "Brittonic" },
  saxon: { bg: "#4169E1", label: "Saxon" },
  anglian: { bg: "#8A2BE2", label: "Anglian" },
  pictish: { bg: "#2F4F4F", label: "Pictish" },
  gaelic: { bg: "#20B2AA", label: "Gaelic" },
  viking: { bg: "#FF4500", label: "Norse/Danish" },
  english: { bg: "#DAA520", label: "English" },
};

export default function BritainHistoryMap() {
  const [year, setYear] = useState(600);
  const [playing, setPlaying] = useState(false);
  const [selectedKingdom, setSelectedKingdom] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [showArtifacts, setShowArtifacts] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 700 });

  const years = Object.keys(historicalPeriods)
    .map(Number)
    .sort((a, b) => a - b);

  const findNearestPeriod = useCallback(
    (targetYear) => {
      let nearest = years[0];
      for (const y of years) {
        if (y <= targetYear) nearest = y;
        else break;
      }
      return nearest;
    },
    [years],
  );

  const currentPeriod = historicalPeriods[findNearestPeriod(year)];
  const relevantEvents = keyEvents.filter(
    (e) => e.year >= year - 30 && e.year <= year + 30,
  );
  const visibleArtifacts = artifacts.filter(
    (a) => Math.abs(a.year - year) <= 150,
  );

  // Playback
  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setYear((prev) => {
          if (prev >= 1066) {
            setPlaying(false);
            return 1066;
          }
          return prev + 5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [playing]);

  // D3 rendering
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Create projection centered on Britain - shifted to include East Anglia
    const projection = d3
      .geoAlbers()
      .center([0, 55.4])
      .rotate([3.0, 0])
      .parallels([50, 60])
      .scale(width * 5)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Background
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#1a365d");

    // Draw landmasses
    svg
      .append("g")
      .selectAll("path")
      .data(britishIslesGeoJSON.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#4a5568")
      .attr("stroke", "#718096")
      .attr("stroke-width", 1);

    // Draw kingdom territories (circles)
    const kingdomGroup = svg.append("g");

    currentPeriod.kingdoms.forEach((kingdom) => {
      const [x, y] = projection([kingdom.center[0], kingdom.center[1]]);

      // Territory circle
      kingdomGroup
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", kingdom.radius)
        .attr("fill", kingdom.color)
        .attr("fill-opacity", 0.35)
        .attr("stroke", kingdom.color)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.7)
        .style("cursor", "pointer")
        .on("click", () => setSelectedKingdom(kingdom))
        .on("mouseenter", function () {
          d3.select(this).attr("fill-opacity", 0.5);
        })
        .on("mouseleave", function () {
          d3.select(this).attr("fill-opacity", 0.35);
        });
    });

    // Draw kingdom labels
    currentPeriod.kingdoms.forEach((kingdom) => {
      const [x, y] = projection([kingdom.center[0], kingdom.center[1]]);

      // Label background
      const text = kingdom.name;
      const textWidth = text.length * 5.5;

      kingdomGroup
        .append("rect")
        .attr("x", x - textWidth / 2 - 4)
        .attr("y", y - 7)
        .attr("width", textWidth + 8)
        .attr("height", 14)
        .attr("fill", kingdom.color)
        .attr("rx", 3)
        .style("cursor", "pointer")
        .on("click", () => setSelectedKingdom(kingdom));

      // Label text
      kingdomGroup
        .append("text")
        .attr("x", x)
        .attr("y", y + 3)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "9px")
        .attr("font-weight", "600")
        .style("cursor", "pointer")
        .style("pointer-events", "none")
        .text(kingdom.name);
    });

    // Draw artifacts
    if (showArtifacts) {
      const artifactGroup = svg.append("g");

      visibleArtifacts.forEach((artifact) => {
        const [x, y] = projection([artifact.location[0], artifact.location[1]]);

        artifactGroup
          .append("text")
          .attr("x", x)
          .attr("y", y)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("font-size", "20px")
          .style("cursor", "pointer")
          .style("filter", "drop-shadow(0 2px 2px rgba(0,0,0,0.5))")
          .text(artifact.image)
          .on("click", () => setSelectedArtifact(artifact));
      });
    }
  }, [currentPeriod, showArtifacts, visibleArtifacts, dimensions]);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Map Panel */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-stone-800 border-b border-stone-700 p-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-serif font-bold text-amber-400">
                  Britain: 300–1066 CE
                </h1>
                <p className="text-stone-400 text-xs">
                  From Roman Province to Norman Conquest
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-serif font-bold text-amber-300">
                  {year} CE
                </div>
                <div className="text-xs text-stone-400">
                  {currentPeriod.name}
                </div>
              </div>
            </div>
          </header>

          {/* Period description */}
          <div className="bg-stone-800/50 border-b border-stone-700 px-3 py-2">
            <p className="text-xs text-stone-300">
              {currentPeriod.description}
            </p>
          </div>

          {/* Map */}
          <div className="flex-1 flex items-center justify-center p-2 bg-stone-900">
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="rounded-lg"
            />
          </div>

          {/* Timeline */}
          <div className="bg-stone-800 border-t border-stone-700 p-3">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => setPlaying(!playing)}
                className="p-2 bg-amber-600 hover:bg-amber-500 rounded-full transition-colors"
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <input
                type="range"
                min="300"
                max="1066"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="flex-1 accent-amber-500"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-2 py-0.5 text-xs rounded transition-colors ${
                    findNearestPeriod(year) === y
                      ? "bg-amber-600 text-white"
                      : "bg-stone-700 hover:bg-stone-600 text-stone-300"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-full lg:w-80 bg-stone-800 border-l border-stone-700 overflow-y-auto max-h-screen">
          {/* Legend */}
          <div className="p-3 border-b border-stone-700">
            <h3 className="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
              <Layers size={14} /> Kingdom Types
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(typeColors).map(([type, { bg, label }]) => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: bg }}
                  />
                  <span className="text-xs text-stone-300">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-3">
              <label className="flex items-center gap-1 text-xs text-stone-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showArtifacts}
                  onChange={(e) => setShowArtifacts(e.target.checked)}
                  className="accent-amber-500"
                />
                Artifacts
              </label>
              <label className="flex items-center gap-1 text-xs text-stone-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEvents}
                  onChange={(e) => setShowEvents(e.target.checked)}
                  className="accent-amber-500"
                />
                Events
              </label>
            </div>
          </div>

          {/* Selected Kingdom */}
          {selectedKingdom && (
            <div
              className="p-3 border-b border-stone-700"
              style={{
                borderLeftColor: selectedKingdom.color,
                borderLeftWidth: 4,
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-serif text-amber-300">
                  {selectedKingdom.name}
                </h3>
                <button
                  onClick={() => setSelectedKingdom(null)}
                  className="text-stone-500 hover:text-stone-300"
                >
                  <X size={16} />
                </button>
              </div>
              <div
                className="inline-block px-2 py-0.5 rounded text-xs mb-1 text-white"
                style={{ backgroundColor: selectedKingdom.color }}
              >
                {typeColors[selectedKingdom.type].label}
              </div>
              <p className="text-xs text-stone-300">
                <MapPin size={12} className="inline mr-1" />
                {selectedKingdom.territory}
              </p>
            </div>
          )}

          {/* Selected Artifact */}
          {selectedArtifact && (
            <div className="p-3 border-b border-amber-600 border-l-4">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedArtifact.image}</span>
                  <div>
                    <h3 className="text-sm font-serif text-amber-300">
                      {selectedArtifact.name}
                    </h3>
                    <p className="text-xs text-stone-400">
                      c. {selectedArtifact.year} CE
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArtifact(null)}
                  className="text-stone-500 hover:text-stone-300"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-stone-300 mt-1">
                {selectedArtifact.description}
              </p>
            </div>
          )}

          {/* Events */}
          {showEvents && (
            <div className="p-3 border-b border-stone-700">
              <h3 className="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
                <Scroll size={14} /> Events (±30 years)
              </h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {relevantEvents.length > 0 ? (
                  relevantEvents.map((event, i) => (
                    <div
                      key={i}
                      className={`text-xs p-1.5 rounded cursor-pointer ${
                        Math.abs(event.year - year) <= 5
                          ? "bg-amber-600/30 border border-amber-500/50"
                          : "bg-stone-700/50 hover:bg-stone-700"
                      }`}
                      onClick={() => setYear(event.year)}
                    >
                      <span className="text-amber-400 font-mono">
                        {event.year}
                      </span>
                      <span className="text-stone-300 ml-1">{event.text}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-stone-500 text-xs italic">
                    No recorded events nearby
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Kingdoms List */}
          <div className="p-3 border-b border-stone-700">
            <h3 className="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
              <BookOpen size={14} /> Kingdoms ({findNearestPeriod(year)})
            </h3>
            <div className="space-y-0.5 max-h-44 overflow-y-auto">
              {currentPeriod.kingdoms.map((kingdom) => (
                <button
                  key={kingdom.id}
                  onClick={() => setSelectedKingdom(kingdom)}
                  className={`w-full text-left p-1.5 rounded text-xs transition-colors flex items-center gap-2 ${
                    selectedKingdom?.id === kingdom.id
                      ? "bg-stone-600"
                      : "hover:bg-stone-700"
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: kingdom.color }}
                  />
                  <span className="text-stone-200 flex-1">{kingdom.name}</span>
                  <span className="text-stone-500 text-xs">
                    {typeColors[kingdom.type].label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Artifacts List */}
          <div className="p-3">
            <h3 className="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
              <Info size={14} /> Artifacts & Folklore
            </h3>
            <div className="space-y-0.5 max-h-44 overflow-y-auto">
              {artifacts.map((artifact) => (
                <button
                  key={artifact.id}
                  onClick={() => {
                    setSelectedArtifact(artifact);
                    if (Math.abs(artifact.year - year) > 150)
                      setYear(artifact.year);
                  }}
                  className={`w-full text-left p-1.5 rounded text-xs transition-colors flex items-center gap-2 ${
                    selectedArtifact?.id === artifact.id
                      ? "bg-stone-600"
                      : "hover:bg-stone-700"
                  } ${Math.abs(artifact.year - year) > 150 ? "opacity-50" : ""}`}
                >
                  <span className="text-base">{artifact.image}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-stone-200 truncate">
                      {artifact.name}
                    </div>
                    <div className="text-stone-500">c. {artifact.year}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
