// Initialization State Logic Controller
function startGame() {
  if (playerName.trim().length < 2) {
    warningMessage = "Please enter a player name with at least 2 characters.";
    return;
  }

  warningMessage = "";
  playerId = generatePlayerId(playerName);
  icons = [...cardSets[selectedTheme]];

  level = 1;
  score = 0;
  moves = 0;

  loadLevel();
  gameState = 'PLAYING';
}

// Level Geometry Vector Builder Engine
function loadLevel() {
  clearInterval(timer);

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  extraTimeUsed = false;

  // Multi-tier structural parameters scaling matrix [cite: 44, 47]
  if (level === 1) { totalPairs = 4; timeLeft = 60; }
  else if (level === 2) { totalPairs = 6; timeLeft = 53; }
  else if (level === 3) { totalPairs = 8; timeLeft = 46; }
  else if (level === 4) { totalPairs = 8; timeLeft = 39; }
  else if (level === 5) { totalPairs = 8; timeLeft = 32; }
  else if (level === 6) { totalPairs = 8; timeLeft = 25; }

  gameMessage = "";
  createBoard();
  startTimer();
}