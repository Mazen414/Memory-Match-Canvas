// Geometric Coordinates Declaring Context Click Collisions Matrix Boundaries
const uiRegions = {
  nameInput: { x: 320, y: 220, w: 260, h: 45 },
  themeFruits: { x: 230, y: 350, w: 120, h: 100 },
  themeAnimals: { x: 390, y: 350, w: 120, h: 100 },
  themeNumbers: { x: 550, y: 350, w: 120, h: 100 },
  startBtn: { x: 350, y: 500, w: 200, h: 50 },
  helpBtn: { x: 810, y: 20, w: 50, h: 50 },
  closeRulesBtn: { x: 375, y: 440, w: 150, h: 45 },
  timeHelperBtn: { x: 390, y: 15, w: 120, h: 32 },
  restartBtn: { x: 350, y: 560, w: 200, h: 45 }
};

// Spatial Intersection Utility Function
function checkBounds(mx, my, region) {
  return mx >= region.x && mx <= region.x + region.w && my >= region.y && my <= region.y + region.h;
}