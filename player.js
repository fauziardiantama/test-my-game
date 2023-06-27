/**
 * Represents a player.
 * @class Player
 */
class Player extends Sprite {
    /**
     * Create a player.
     * @constructor
     * @property {number} x - The player's x position.
     * @property {number} y - The player's y position.
     * @property {number} width - The player's width.
     * @property {number} height - The player's height.
     * @property {string} color - The player's color.
     * @property {number} speed - The player's speed.
     * @property {number} playerJumpStrength - The player's jump strength.
     * @returns {void} 
     */
    constructor(x, y, width, height, speed, playerJumpStrength) {
      super('idle.png', 250,50);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.direction = null;
      this.idle = "right";
      this.velocityY = 0;
      this.startJumping = false;
      this.isJumping = false;
      this.isLanding = false;
      this.startWalking = false;
      this.isWalking = false;
      this.playerJumpStrength = playerJumpStrength;

      this.frameCount = 5;
      this.currentFrame = 0;
      this.frameIndex = 0;
      this.frameCounter = 0;
      this.frameInterval = 10;

      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    /**
     * Draw the player.
     * @param {CanvasRenderingContext2D} context - The context for drawing the player.
     * @returns {void}
     */
    draw(context) {
      if (this.direction === "right") {
        this.idle = "right";
        context.drawImage(this.image, this.currentFrame, 0, this.width, this.height, this.x, this.y, this.width, this.height);
      } else if (this.direction === "left") {
        this.idle = "left";
        context.save();
        context.scale(-1, 1);
        context.drawImage(this.image, this.currentFrame, 0, this.width, this.height, -this.x - this.width, this.y, this.width, this.height);
        context.restore();
      } else {
        if (this.idle === "right") {
          context.drawImage(this.image, this.currentFrame, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.idle === "left") {
          context.save();
          context.scale(-1, 1);
          context.drawImage(this.image, this.currentFrame, 0, this.width, this.height, -this.x - this.width, this.y, this.width, this.height);
          context.restore();
        }
      }
    }

    update() {
      if (this.isLanding) {
        this.image.src = 'idle.png';
        this.width = 50;
        this.height = 50;
        this.frameCount = 5;
        this.currentFrame = 0;
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.frameInterval = 10;
        this.isLanding = false;
      }
      if (this.startJumping) {
        this.image.src = 'jump.png';
        this.width = 50;
        this.height = 50;
        this.frameCount = 1;
        this.currentFrame = 0;
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.frameInterval = 10;
        this.startJumping = false;
      }
      if (this.startWalking) {
        this.image.src = 'waddling.png';
        this.width = 50;
        this.height = 50;
        this.frameCount = 6;
        this.currentFrame = 0;
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.frameInterval = 10;
        this.startWalking = false;
      }

      this.frameCounter++;
      if (this.frameCounter >= this.frameInterval) {
        this.frameCounter = 0;
        this.frameIndex = (this.frameIndex + 1) % this.frameCount;
        this.currentFrame = this.frameIndex * this.width;
      }
    }

    /**
     * Check if the player is colliding with something.
     * @returns {boolean} - Whether the player is colliding with something.
     */
    checkCollision(rect) {
      return (
        this.x < rect.x + rect.width &&
        this.x + this.width > rect.x &&
        this.y < rect.y + rect.height &&
        this.y + this.height > rect.y
      );
    }

    /**
     * Move the player to the right.
     * @returns {void}
     */
    moveRight() {
      this.direction = "right";
    }

    /**
     * Move the player to the left.
     * @returns {void}
     */
    moveLeft() {
      this.direction = "left";
    }

    /**
     * Move the player.
     * @returns {void}
     */
    move(){
        if (this.direction === "right") {
            this.x += this.speed;
        } else if (this.direction === "left") {
            if (this.x > 0) {
                this.x -= this.speed;
            }
        }
    }
    /**
     * Make the player jump.
     * @returns {void}
     */
    jump() {
      if (!this.isJumping) {
        this.velocityY = -this.playerJumpStrength;
        this.startJumping = true;
        this.isJumping = true;
      }
    }

    /**
     * Stop the player from moving.
     * @returns {void}
     */
    stopMoving() {
      this.isLanding = true;
      this.isWalking = false;
      this.direction = null;
    }

    /**
     * Apply gravity to the player.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {number} gravity - The gravity to apply.
     * @returns {void}
     */
    applyGravity(canvas, gravity) {
      // If player y is less than canvas height (player is above the ground) or player is moving up (velocityY < 0
      if (this.y < canvas.height - this.height || this.velocityY < 0) {
        this.velocityY += gravity;
        this.y += this.velocityY;
      } else {
        this.y = canvas.height - this.height;
        this.velocityY = 0;
        this.isJumping = false;
      }
    }
    /**
     * Handle key down events.
     * @param {KeyboardEvent} event - The event.
     * @returns {void}
     */
    handleKeyDown(event) {
      if (event.key === "ArrowRight") {
        if (!this.isWalking && !this.startWalking && !this.isJumping) {
          this.startWalking = true;
          this.isWalking = true;
        }
        this.moveRight();
      } else if (event.key === "ArrowLeft") {
        if (!this.isWalking && !this.startWalking && !this.isJumping) {
          this.startWalking = true;
          this.isWalking = true;
        }
        this.moveLeft();
      } else if (event.key === "ArrowUp") {
        this.jump();
      }
    }

    /**
     * Handle key up events.
     * @param {KeyboardEvent} event - The event.
     * @returns {void}
     */
    handleKeyUp(event) {
      if (
        (event.key === "ArrowRight" && this.direction === "right") ||
        (event.key === "ArrowLeft" && this.direction === "left")
      ) {
        this.stopMoving();
      }
    }

}
