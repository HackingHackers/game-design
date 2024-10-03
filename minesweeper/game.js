import { start_game, spacerbar, reveal, flag } from "./minesweeper.js";

// Global state variables
var current_bead, counter, time;
var flag_toggle = false;

PS.init = function (system, options) {
  // Preload all sounds
  PS.audioLoad("fx_click");

  start_game(PS);
};

PS.touch = function (x, y, data, options) {
  // PS.audioPlay("fx_click");
  if (!data.flagged) {
    PS.alpha(x, y, PS.ALPHA_TRANSPARENT);
  }
};

// PS.release = function (x, y, data, options) {};

PS.enter = function (x, y, data, options) {
  current_bead = { x, y, data };

  if (options.touching && !data.flagged) {
    PS.alpha(x, y, PS.ALPHA_TRANSPARENT);
  }
};

PS.exit = function (x, y, data, options) {
  if (!data.revealed) {
    PS.alpha(x, y, PS.ALPHA_OPAQUE);
  }
};

PS.exitGrid = function (options) {
  current_bead = null;
};

PS.keyDown = function (key, shift, ctrl, options) {
  if (key === PS.KEY_SPACE) {
    if (current_bead) {
      spacerbar(PS, current_bead.x, current_bead.y, current_bead.data);
    }
  } else if (key === 70 || key === 102) {
    flag_toggle = !flag_toggle;
  }
};

// PS.keyUp = function (key, shift, ctrl, options) {};
