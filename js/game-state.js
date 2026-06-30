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