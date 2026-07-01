const renderer = new CanvasRenderer('gameCanvas');
const canvas = renderer.canvas;

// Mouse Intersection Vector Coordinates Mapper
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (gameState === 'START_SCREEN') {
    if (checkBounds(mouseX, mouseY, uiRegions.nameInput)) isTypingName = true;
    else isTypingName = false;

    if (checkBounds(mouseX, mouseY, uiRegions.themeFruits)) selectedTheme = "fruits";
    if (checkBounds(mouseX, mouseY, uiRegions.themeAnimals)) selectedTheme = "animals";
    if (checkBounds(mouseX, mouseY, uiRegions.themeNumbers)) selectedTheme = "numbers";
    
    if (checkBounds(mouseX, mouseY, uiRegions.startBtn)) startGame();
    if (checkBounds(mouseX, mouseY, uiRegions.helpBtn)) gameState = 'RULES_POPUP';
  } 
  else if (gameState === 'PLAYING') {
    if (checkBounds(mouseX, mouseY, uiRegions.timeHelperBtn) && !extraTimeUsed) {
      timeLeft += 5;
      extraTimeUsed = true;
      showBonusText = true;
      bonusTextTimer = 10;
      return;
    }

    for (let card of cardsArray) {
      if (mouseX >= card.x && mouseX <= card.x + renderer.cardWidth &&
          mouseY >= card.y && mouseY <= card.y + renderer.cardHeight) {
        handleCardClick(card);
        break;
      }
    }
  } 
  else if (gameState === 'END_SCREEN') {
    if (checkBounds(mouseX, mouseY, uiRegions.restartBtn)) {
      playerName = "";
      warningMessage = "";
      gameState = 'START_SCREEN';
    }
  } 
  else if (gameState === 'RULES_POPUP') {
    if (checkBounds(mouseX, mouseY, uiRegions.closeRulesBtn)) gameState = 'START_SCREEN';
  }
});

// Capture keystrokes dynamically directly inside canvas frame
window.addEventListener('keydown', (e) => {
  if (gameState === 'START_SCREEN' && isTypingName) {
    if (e.key === 'Backspace') playerName = playerName.slice(0, -1);
    else if (e.key === 'Enter') isTypingName = false;
    else if (e.key.length === 1 && playerName.length < 20) playerName += e.key;
  }
});

function loop() {
  renderer.render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);