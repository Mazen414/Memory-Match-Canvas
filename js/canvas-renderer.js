class CanvasRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    this.logoImg = new Image();
    this.logoImg.src = 'logo.jpeg';

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
}