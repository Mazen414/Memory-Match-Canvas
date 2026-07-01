class CanvasRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    this.logoImg = new Image();
    this.logoImg.src = 'arel_logo.jpeg';

    this.cardWidth = 100;
    this.cardHeight = 120;
    this.padding = 15;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (gameState === 'START_SCREEN') {
      this.drawStartScreen();
    } else if (gameState === 'PLAYING') {
      this.drawGameScreen();
    } else if (gameState === 'END_SCREEN') {
      this.drawEndScreen();
    }

    if (gameState === 'RULES_POPUP') {
      this.drawRulesPopup();
    }
  }

  drawGameScreen() { 
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.beginPath();
    this.ctx.roundRect(50, 10, 800, 42, 15);
    this.ctx.fill();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 18px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Level: ${level}`, 75, 36);
    this.ctx.fillText(`Score: ${score}`, 200, 36);
    
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Moves: ${moves}`, 710, 36);
    this.ctx.fillText(`Time: ${timeLeft}s`, 825, 36);

    if (showBonusText) {
      this.ctx.fillStyle = '#00ff88';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.fillText('+5', 835, 36 - (12 - bonusTextTimer/5));
    }

    this.drawRectButton('+5 Seconds', uiRegions.timeHelperBtn, extraTimeUsed ? '#888888' : '#ffcc00', '#222', 15, extraTimeUsed);

    const cols = 4;
    const gridWidth = (cols * this.cardWidth) + ((cols - 1) * this.padding);
    const startX = (this.canvas.width - gridWidth) / 2;
    const startY = 85;

    cardsArray.forEach((card, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      card.x = startX + col * (this.cardWidth + this.padding);
      card.y = startY + row * (this.cardHeight + this.padding);
      this.drawAnimatedCard(card);
    });

    if (gameMessage && gameMessageTimer > 0) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 24px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(gameMessage, 450, 600);
    }
  }

  drawStartScreen() {
    this.drawScreenWrapper();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 36px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Welcome to the Game', 450, 130);

    this.drawRoundButton('?', uiRegions.helpBtn, '#ffcc00', '#222');

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 20px Arial';
    this.ctx.fillText('Player Information', 450, 195);

    const input = uiRegions.nameInput;
    this.ctx.fillStyle = isTypingName ? '#ffffff' : 'rgba(255, 255, 255, 0.9)';
    this.ctx.beginPath();
    this.ctx.roundRect(input.x, input.y, input.w, input.h, 25);
    this.ctx.fill();
    
    if (isTypingName) {
      this.ctx.strokeStyle = '#ffcc00';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }

    this.ctx.fillStyle = '#222';
    this.ctx.font = 'bold 17px Arial';
    let textToDisplay = playerName ? playerName : (isTypingName ? '' : 'Enter your name');
    this.ctx.fillText(textToDisplay, 450, input.y + 28);

    if (warningMessage) {
      this.ctx.fillStyle = '#ffdddd';
      this.ctx.font = 'bold 14px Arial';
      this.ctx.fillText(warningMessage, 450, 295);
    }

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 20px Arial';
    this.ctx.fillText('Choose Card Theme', 450, 325);

    this.drawThemeCard('🍎', 'Fruits', uiRegions.themeFruits, selectedTheme === 'fruits');
    this.drawThemeCard('🐶', 'Animals', uiRegions.themeAnimals, selectedTheme === 'animals');
    this.drawThemeCard('🔢', 'Numbers', uiRegions.themeNumbers, selectedTheme === 'numbers');

    this.drawRectButton('Start Game', uiRegions.startBtn, '#ffcc00', '#222', 25);
  }

  drawThemeCard(icon, label, reg, isSelected) {
    this.ctx.fillStyle = isSelected ? '#ffcc00' : 'rgba(255, 255, 255, 0.16)';
    this.ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.25)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.roundRect(reg.x, reg.y, reg.w, reg.h, 22);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = isSelected ? '#222222' : '#ffffff';
    this.ctx.font = '42px Arial';
    this.ctx.fillText(icon, reg.x + reg.w/2, reg.y + 50);
    this.ctx.font = 'bold 16px Arial';
    this.ctx.fillText(label, reg.x + reg.w/2, reg.y + 82);
  }

drawGameScreen() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.beginPath();
    this.ctx.roundRect(50, 10, 800, 42, 15);
    this.ctx.fill();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 18px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Level: ${level}`, 75, 36);
    this.ctx.fillText(`Score: ${score}`, 200, 36);
    
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Moves: ${moves}`, 710, 36);
    this.ctx.fillText(`Time: ${timeLeft}s`, 825, 36);

    if (showBonusText) {
      this.ctx.fillStyle = '#00ff88';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.fillText('+5', 835, 36 - (12 - bonusTextTimer/5));
    }

    this.drawRectButton('+5 Seconds', uiRegions.timeHelperBtn, extraTimeUsed ? '#888888' : '#ffcc00', '#222', 15, extraTimeUsed);

    const cols = 4;
    const gridWidth = (cols * this.cardWidth) + ((cols - 1) * this.padding);
    const startX = (this.canvas.width - gridWidth) / 2;
    const startY = 85;

    cardsArray.forEach((card, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      card.x = startX + col * (this.cardWidth + this.padding);
      card.y = startY + row * (this.cardHeight + this.padding);
      this.drawAnimatedCard(card);
    });

    if (gameMessage && gameMessageTimer > 0) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 24px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(gameMessage, 450, 600);
    }
  }

  drawAnimatedCard(card) {
    const targetProgress = (card.isFlipped || card.isMatched) ? 1 : 0;
    card.animProgress += (targetProgress - card.animProgress) * 0.15;
    let scaleX = Math.cos(card.animProgress * Math.PI);
    
    this.ctx.save();
    const centerX = card.x + this.cardWidth / 2;
    const centerY = card.y + this.cardHeight / 2;
    
    this.ctx.translate(centerX, centerY);
    this.ctx.scale(Math.abs(scaleX), 1);
    this.ctx.translate(-centerX, -centerY);

    if (card.animProgress > 0.5) {
      this.ctx.fillStyle = card.isMatched ? '#9cff9c' : '#ffffff';
      this.ctx.beginPath();
      this.ctx.roundRect(card.x, card.y, this.cardWidth, this.cardHeight, 15);
      this.ctx.fill();

      this.ctx.fillStyle = '#222';
      this.ctx.font = '42px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(card.icon, card.x + this.cardWidth / 2, card.y + this.cardHeight / 2);
    } else {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.roundRect(card.x, card.y, this.cardWidth, this.cardHeight, 15);
      this.ctx.fill();

      if (this.logoImg.complete) {
        const size = Math.min(this.cardWidth, this.cardHeight) * 0.82;
        const imgX = card.x + (this.cardWidth - size) / 2;
        const imgY = card.y + (this.cardHeight - size) / 2;
        this.ctx.drawImage(this.logoImg, imgX, imgY, size, size);
      }
      this.ctx.strokeStyle = '#0b5596';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  drawEndScreen() {
    this.drawScreenWrapper();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 36px Arial';
    this.ctx.textAlign = 'center';
    let endTitleText = (level >= 6 && matchedPairs === totalPairs) ? "Congratulations! You Won!" : "Game Over!";
    this.ctx.fillText(endTitleText, 450, 95);

    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Final Score: ${score}`, 450, 145);
    this.ctx.fillText(`Total Moves: ${moves}`, 450, 175);
    this.ctx.fillText(`Reached Level: ${level}`, 450, 205);

    this.ctx.fillStyle = '#ffcc00';
    this.ctx.font = 'bold 22px Arial';
    this.ctx.fillText('Final Leaderboard', 450, 250);

    this.ctx.fillStyle = '#ffcc00';
    this.ctx.font = 'bold 15px Arial';
    this.ctx.fillText('Rank       Name                 ID                       Score       Level', 450, 290);

    this.ctx.font = '15px Arial';
    if (leaderboard.length === 0) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText('No scores recorded yet.', 450, 330);
    } else {
      leaderboard.forEach((p, idx) => {
        let currentY = 325 + (idx * 22);
        this.ctx.fillStyle = (p.name === playerName && p.score === score && p.level === level) ? '#9cff9c' : '#ffffff';
        this.ctx.font = (p.name === playerName && p.score === score && p.level === level) ? 'bold 15px Arial' : '15px Arial';

        let rankStr = `${idx + 1}`.padEnd(10);
        let nameStr = `${p.name}`.padEnd(16);
        let idStr = `${p.id}`.padEnd(24);
        let scoreStr = `${p.score}`.padEnd(12);
        let lvlStr = `${p.level}`;
        this.ctx.fillText(`${rankStr} ${nameStr} ${idStr} ${scoreStr} ${lvlStr}`, 450, currentY);
      });
    }
    this.drawRectButton('Play Again', uiRegions.restartBtn, '#ffcc00', '#222', 22);
  }

  drawRulesPopup() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.roundRect(240, 100, 420, 410, 22);
    this.ctx.fill();

    this.ctx.fillStyle = '#1e3c72';
    this.ctx.font = 'bold 28px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('How to Play', 450, 150);

    this.ctx.fillStyle = '#222222';
    this.ctx.font = 'bold 16px Arial';
    this.ctx.textAlign = 'left';
    
    const lines = [
      "1. Click on two cards to flip them.",
      "2. If the cards match, they stay open.",
      "3. If they do not match, they flip back.",
      "4. Complete all pairs to move to the next level.",
      "5. Each level has more cards and less time."
    ];
    lines.forEach((line, i) => { this.ctx.fillText(line, 275, 210 + (i * 35)); });
    this.drawRectButton('Close', uiRegions.closeRulesBtn, '#ffcc00', '#222', 22);
  }

  drawScreenWrapper() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    this.ctx.beginPath();
    this.ctx.roundRect(50, 40, 800, 580, 20);
    this.ctx.fill();
  }

  drawRectButton(text, reg, bg, fg, radius, disabled = false) {
    this.ctx.fillStyle = disabled ? 'rgba(136,136,136,0.5)' : bg;
    this.ctx.beginPath();
    this.ctx.roundRect(reg.x, reg.y, reg.w, reg.h, radius);
    this.ctx.fill();
    this.ctx.fillStyle = fg;
    this.ctx.font = 'bold 18px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, reg.x + reg.w/2, reg.y + reg.h/2);
    this.ctx.textBaseline = 'alphabetic';
  }

  drawRoundButton(text, reg, bg, fg) {
    this.ctx.fillStyle = bg;
    this.ctx.beginPath();
    this.ctx.arc(reg.x + reg.w/2, reg.y + reg.h/2, reg.w/2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = fg;
    this.ctx.font = 'bold 26px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, reg.x + reg.w/2, reg.y + reg.h/2);
    this.ctx.textBaseline = 'alphabetic';
  }
}