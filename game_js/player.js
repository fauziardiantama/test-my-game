import { Sprite } from "./sprite.js";

class Player extends Sprite {

    constructor(x, y, width, height, speed, playerJumpStrength, scrollelement) {
      super('img/idle.png',width,height,width,height);
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

      this.isBounce          = false;
      this.framesSinceBounce = null;

      this.frameCount = 5;
      this.currentFrame = 0;
      this.frameIndex = 0;
      this.frameCounter = 0;
      this.frameInterval = 10;

      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      document.addEventListener("keyup", this.handleKeyUp.bind(this));
      scrollelement.addEventListener("scroll", this.handleScroll.bind(this));
    }

    draw(context) {
      if (this.direction === "right") {
        this.idle = "right";
        context.drawImage(this.image, this.currentFrame, 0, 50, 50, this.x, this.y, this.width, this.height);
      } else if (this.direction === "left") {
        this.idle = "left";
        context.save();
        context.scale(-1, 1);
        context.drawImage(this.image, this.currentFrame, 0, 50, 50, -this.x - this.width, this.y, this.width, this.height);
        context.restore();
      } else {
        if (this.idle === "right") {
          context.drawImage(this.image, this.currentFrame, 0, 50,50, this.x, this.y, this.width, this.height);
        } else if (this.idle === "left") {
          context.save();
          context.scale(-1, 1);
          context.drawImage(this.image, this.currentFrame, 0, 50,50, -this.x - this.width, this.y, this.width, this.height);
          context.restore();
        }
      }
    }
    bounce() {
        if (
          this.isBounce &&
          this.framesSinceBounce != null &&
          this.framesSinceBounce >= 25
      ) {
          this.isBounce = false;
          this.stopMoving();
          this.framesSinceBounce = null;
      }
      if (this.framesSinceBounce != null) {
          this.framesSinceBounce++;
      }
    }

    update(context, gravity, canvas) {
      this.canvas = canvas;
      this.move(canvas.width*5);
      if (this.isLanding) {
        this.image.src = 'img/idle.png';
        this.frameCount = 5;
        this.currentFrame = 0;
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.frameInterval = 10;
        this.isLanding = false;
      }
      if (this.startJumping) {
        this.image.src = 'img/jump.png';
        this.frameCount = 1;
        this.currentFrame = 0;
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.frameInterval = 10;
        this.startJumping = false;
      }
      if (this.startWalking) {
        this.image.src = 'img/waddling.png';
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
        //1,2,3,4,0
        this.currentFrame = this.frameIndex * 50;
      }
      this.draw(context);
      this.applyGravity(canvas, gravity); 
      this.bounce();
      //console.log(this.y);
    }

    checkCollision(rect) {
      return (
        this.x < rect.x + rect.width &&
        this.x + this.width > rect.x &&
        this.y < rect.y + rect.height &&
        this.y + this.height > rect.y
      );
    }

    moveRight() {
      this.direction = "right";
    }

    moveLeft() {
      this.direction = "left";
    }

    move(canvasWidth){
        if (this.direction === "right") {
          if (this.x < canvasWidth - this.width) {
            this.x += this.speed;
          }
        } else if (this.direction === "left") {
            if (this.x > 0) {
                this.x -= this.speed;
            }
        }
    }

    jump() {
      if (!this.isJumping) {
        this.velocityY = -this.playerJumpStrength;
        this.startJumping = true;
        this.isJumping = true;
      }
    }

    stopMoving() {
      this.isLanding = true;
      this.isWalking = false;
      this.direction = null;
    }

    applyGravity(canvas, gravity) {

      if (this.y < canvas.height - this.height || this.velocityY < 0) {
        this.velocityY += gravity;
        this.y += this.velocityY;
      } else {
        this.y = canvas.height - this.height;
        this.velocityY = 0;
        this.isJumping = false;
      }
    }

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
      } else if (event.key === "x") {
        //console.log("jump");
        this.jump();
      }
    }

    handleKeyUp(event) {
      if (
        (event.key === "ArrowRight" && this.direction === "right") ||
        (event.key === "ArrowLeft" && this.direction === "left")
      ) {
        this.stopMoving();
      }
    }

    handleScroll(event) {
      this.element = event.target;
      this.minScroll = 0;
      this.maxScroll = this.element.scrollHeight - this.element.clientHeight;

      if (this.x <= this.canvas.width*5 - this.width && this.x >= 0) {
        this.x = Math.round((this.element.scrollTop / this.maxScroll) * 100) * this.canvas.width*5 / 100;
        this.x = Math.min(this.x, this.canvas.width*5 - this.width);
        if (this.lastScroll != null && this.lastScroll < this.element.scrollTop) {
          if (!this.isWalking && !this.startWalking && !this.isJumping) {
            this.startWalking = true;
            this.isWalking = true;
          }
          this.moveRight();
        }
        if (this.lastScroll != null && this.lastScroll > this.element.scrollTop) {
          if (!this.isWalking && !this.startWalking && !this.isJumping) {
            this.startWalking = true;
            this.isWalking = true;
          }
          this.moveLeft();
        }
        this.lastScroll = this.element.scrollTop;
      }

      clearTimeout(this.scrollingTimer);
      // Start a new timer
      this.scrollingTimer = setTimeout(function() {
        this.stopMoving();
      }.bind(this), 300);
    }

    setDirection(direction) {
        this.direction = direction;
    }

    setWalking(walking) {
      this.isWalking = walking;
    }

    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
}

export {Player};