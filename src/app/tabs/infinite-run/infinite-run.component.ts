import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from "rxjs";

interface Obstacle {
  x: number;
  y: number;
  height: number;
  width: number;
  scored?: boolean; // Optional property to track if the obstacle has been scored
}

@Component({
  selector: 'app-infinite-run',
  templateUrl: './infinite-run.component.html',
  styleUrls: ['./infinite-run.component.scss']
})
export class InfiniteRunComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private gameLoopSubscription!: Subscription;

  playerX = 50;
  playerY!: number;
  playerHeight = 30;
  playerWidth = 20;
  isJumping = false;
  jumpVelocity = 0;
  gravity = 0.5;

  obstacles: Obstacle[] = []; // Array to hold multiple obstacles
  obstacleSpeed = 2;
  obstacleSpawnInterval = 1500; // Time in milliseconds between obstacle spawns
  lastObstacleSpawnTime = 0;

  score = 0;
  gameStarted = false;
  currentHighScore = 0;

  ngOnInit() {
    this.ctx = <CanvasRenderingContext2D>this.gameCanvas.nativeElement.getContext('2d');
    this.playerY = this.gameCanvas.nativeElement.height - this.playerHeight;
  }

  ngOnDestroy(): void {
    this.stopGameLoop();
    this.removeEventListeners();
  }

  startGameLoop(): void {
    this.gameLoopSubscription = interval(10).subscribe(() => {
      this.update();
      this.draw();
    });
  }

  stopGameLoop(): void {
    if (this.gameLoopSubscription) {
      this.gameLoopSubscription.unsubscribe();
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  addEventListeners(): void {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  removeEventListeners(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      this.jumpAction();
    }
  };

  drawPlayer(): void {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
  }

  drawObstacles(): void {
    this.obstacles.forEach(obstacle => {
      this.ctx.fillStyle = 'brown';
      this.ctx.fillRect(obstacle.x, this.gameCanvas.nativeElement.height - obstacle.height, obstacle.width, obstacle.height);
    });
  }

  update(): void {
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);

    // Handle jumping
    if (this.isJumping) {
      this.playerY += this.jumpVelocity;
      this.jumpVelocity += this.gravity;
      if (this.playerY >= this.gameCanvas.nativeElement.height - this.playerHeight) {
        this.playerY = this.gameCanvas.nativeElement.height - this.playerHeight;
        this.isJumping = false;
      }
    }

    // Move obstacles and handle scoring
    this.obstacles.forEach(obstacle => {
      obstacle.x -= this.obstacleSpeed;

      // Check if the obstacle has been passed and not yet scored
      if (obstacle.x + obstacle.width < this.playerX && !obstacle.scored) {
        this.score++;
        obstacle.scored = true; // Mark this obstacle as scored
      }
    });

    // Remove off-screen obstacles
    this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    // Spawn new obstacles
    const currentTime = Date.now();
    if (currentTime - this.lastObstacleSpawnTime > this.obstacleSpawnInterval) {
      this.spawnObstacle();
      this.lastObstacleSpawnTime = currentTime;
    }

    // Collision detection
    this.obstacles.forEach(obstacle => {
      if (
        this.playerX < obstacle.x + obstacle.width &&
        this.playerX + this.playerWidth > obstacle.x &&
        this.playerY < this.gameCanvas.nativeElement.height - obstacle.height + this.playerHeight &&
        this.playerY + this.playerHeight > this.gameCanvas.nativeElement.height - obstacle.height
      ) {
        alert(`Game Over! Your score: ${this.score}`);
        this.currentHighScore = Math.max(this.currentHighScore, this.score);
        this.score = 0;
        this.obstacles = [];
        this.gameStarted = false;
        this.stopGameLoop();
      }
    });
  }

  draw(): void {
    this.drawPlayer();
    this.drawObstacles();
    this.updateScore();
  }

  jumpAction(): void {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = -12;
    }
  }

  updateScore(): void {
    // Angular's change detection will automatically update the template
  }

  startGame(): void {
    this.gameStarted = true;
    this.score = 0;
    this.obstacles = [];
    this.lastObstacleSpawnTime = Date.now();
    this.startGameLoop();
    this.addEventListeners();
  }

  spawnObstacle(): void {
    const minHeight = 20;
    const maxHeight = 50;
    const minWidth = 20;
    const maxWidth = 40;
    const obstacleHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    const obstacleWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const obstacleY = 0; // Obstacles appear from the right at ground level

    this.obstacles.push({
      x: this.gameCanvas.nativeElement.width,
      y: obstacleY,
      height: obstacleHeight,
      width: obstacleWidth,
      scored: false // Initialize the scored property for the new obstacle
    });
  }
}
