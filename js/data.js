// Card Category Configurations
const cardSets = {
  fruits: ["🍎", "🍌", "🍇", "🍓", "🍒", "🍉", "🥝", "🍍", "🥥", "🍑"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
};

// Application State Parameters
let gameState = 'START_SCREEN'; // START_SCREEN, PLAYING, END_SCREEN, RULES_POPUP
let selectedTheme = "fruits";
let icons = [...cardSets.fruits];

let playerName = "";
let playerId = "";
let leaderboard = JSON.parse(localStorage.getItem("memoryGameLeaderboard")) || [];

// Interactive Layout States
let isTypingName = false;
let warningMessage = "";

// Game Mechanics Scoring and Progress Tracking Variables
let level = 1;
let score = 0;
let moves = 0;
let timeLeft = 60;
let timer = null;

let cardsArray = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let totalPairs = 0;

// Level Buffers and Prompt Trackers
let extraTimeUsed = false;
let showBonusText = false;
let bonusTextTimer = 0;
let gameMessage = "";
let gameMessageTimer = 0;