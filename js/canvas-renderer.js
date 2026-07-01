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
}