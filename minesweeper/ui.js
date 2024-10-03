/**
 * This module updates the user interface using data from the game logic.
 *
 * @module ui
 */

const GLYPHS = {
  bomb: 0x1f4a3,
  integral_symbol: 0x222b,
  flag: 0x2691,
  bold_numbers: 0x1d7ec,
};

const COLORS = [
  0x0000ff, 0x027b00, 0xff0000, 0x00007b, 0x7b0000, 0x027b7b, 0x000000,
  0x7b7b7b,
];

export function show_difficulty_selection(PS) {
  PS.statusText("Select difficulty");
  PS.gridSize(4, 1);
  for (let i = 0; i < 4; i++) {
    PS.glyph(i, 0, GLYPHS.integral_symbol + i);
  }
}

export function update_status(PS, mines, time) {
  PS.statusText(`Mines: ${mines}, Time: ${time}s`);
}

export function render(PS, x, y, data) {
  if (data.revealed) {
    PS.alpha(x, y, PS.ALPHA_TRANSPARENT);
    if (data.mine) {
      PS.glyph(x, y, GLYPHS.bomb);
    } else if (data.count) {
      PS.glyph(x, y, GLYPHS.bold_numbers + data.count);
      PS.glyphColor(x, y, COLORS[data.count - 1]);
    }
    return;
  }
  if (data.flagged) {
    PS.glyph(x, y, GLYPHS.flag);
    return;
  }
  PS.alpha(x, y, PS.ALPHA_OPAQUE);
}

export function reset(PS, x, y) {
  PS.gridSize(x, y);
  PS.color(PS.ALL, PS.ALL, 0xbdbdbd);
}
