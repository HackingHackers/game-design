/**
 * This module deals with the underlying logic of the game.
 *
 * @module minesweeper
 */

import * as ui from "./ui.js";
import { executeAround, shuffleArray } from "./utils.js";

export const config = {
  x: 0,
  y: 0,
  mines: 0,
};

/**
 * Returns a function which can be bound to the release event.
 */
function createDifficultySelectionListener(PS) {
  const PRESETS = [
    { x: 9, y: 9, mines: 10 }, // Beginner
    { x: 16, y: 16, mines: 40 }, // Intermediate
    { x: 30, y: 16, mines: 99 }, // Expert
  ];

  return (x, y, data, options) => {
    if (x < 3) {
      Object.assign(config, PRESETS[x]);
    } else {
      // Custom difficulty
      PS.statusInput("X, Y, Mines:", (input) => {
        [config.x, config.y, config.mines] = input.split(",").map((n) => parseInt(n));
      });
    }
    populateGrid(PS);
    PS.release = createGameListener(PS);
  };
}

/**
 * Returns a function which can be bound to the release event.
 */
function createGameListener(PS) {
  let first_click = true;
  return (x, y, data, options) => {
    if (first_click) {
      while (data.count !== 0 || data.mine) {
        populateGrid(PS);
        data = PS.data(x, y);
      }
      first_click = false;
    }
    reveal(PS, x, y, data);
  };
}

/**
 * Returns the mine count.
 */
function populateGrid(PS) {
  ui.reset(PS, config.x, config.y);

  // Initial data for each cell
  for (let i = 0; i < config.x; i++) {
    for (let j = 0; j < config.y; j++) {
      // PS.ALL didn't work because they all pointed to the same object
      PS.data(i, j, { mine: false, count: 0, revealed: false, flagged: false });
    }
  }

  // Create a randomized array with the specified mine count and empty spaces
  const a = new Array(config.x * config.y).fill(true, 0, config.mines);
  shuffleArray(a);

  // Assign the grid to the field
  for (let i = 0; i < config.x; i++) {
    for (let j = 0; j < config.y; j++) {
      if (a.pop()) {
        PS.data(i, j).mine = true;

        // Increment the count of all surrounding cells
        executeAround(i, j, (x, y) => {
          PS.data(x, y).count++;
        });
      }
    }
  }
}

export function spacerbar(PS, x, y, data) {
  // Pressing space bar while hovering over a square flags it,
  // or reveals its adjacent squares
  if (!data.revealed) {
    flag(PS, x, y, data);
    return;
  }

  // Check if flag count matches the count of surrounding mines
  let flag_count = 0;
  executeAround(x, y, (new_x, new_y) => {
    if (PS.data(new_x, new_y).flagged) {
      flag_count++;
    }
  });
  if (flag_count !== data.count) {
    return;
  }

  // Reveal all surrounding unflagged squares
  executeAround(x, y, (new_x, new_y) => {
    const data = PS.data(new_x, new_y);
    if (!data.flagged) {
      reveal(PS, new_x, new_y, data);
    }
  });
}

export function reveal(PS, x, y, data) {
  if (data.revealed) {
    return false;
  }
  if (data.flagged) {
    return false;
  }
  if (data.mine) {
    return false;
  }
  bfs(PS, x, y);
}

export function flag(PS, x, y, data) {
  if (data.revealed) {
    return;
  }
  data.flagged = !data.flagged;
  ui.render(PS, x, y, data);
}

function bfs(PS, x, y) {
  const queue = [[x, y]];

  while (queue.length) {
    const [x, y] = queue.shift();
    const data = PS.data(x, y);

    data.revealed = true;
    ui.render(PS, x, y, data);

    if (data.count) {
      continue;
    }

    executeAround(x, y, (new_x, new_y) => {
      const new_data = PS.data(new_x, new_y);
      if (!new_data.revealed && !new_data.flagged) {
        queue.push([new_x, new_y]);
      }
    });
  }
} // uwu
