/**
 * Utility functions
 *
 * @module utils
 */

import { config } from "./minesweeper.js";

export function executeAround(x, y, callback) {
  const SHIFTS = [
    // Delta x and y for all 8 surrounding cells
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let [i, j] of SHIFTS) {
    i += x;
    j += y;
    if (i >= 0 && i < config.x && j >= 0 && j < config.y) {
      callback(i, j);
    }
  }
}

export function shuffleArray(a) {
  // Fisher-Yates shuffle
  for (let i = a.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}
