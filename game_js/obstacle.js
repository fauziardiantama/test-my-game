import {Sprite} from './sprite.js';

class Obstacle extends Sprite {

    constructor(x, y, width, height, platformHeight, color) {
      super('img/box.png', 16,16,16,16);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.platformHeight = platformHeight;
      this.currentFrame = 0;
    }

    draw(context, camera, player) {
            if (
                this.x < camera.x + camera.width &&
                this.x + this.width > camera.x &&
                this.y < camera.y + camera.height &&
                this.y + this.height > camera.y
            )
            {
                context.drawImage(this.image, this.currentFrame, 0, 16, 16, this.x, this.y, this.width, this.height);
            }

            if (player.checkCollision(this)) {
                const playerRight = player.x + player.width;
                const playerLeft = player.x;
                const boxRight = this.x + this.width;
                const boxLeft = this.x;
                const overlapXRight = playerRight - boxLeft;
                const overlapXLeft = boxRight - playerLeft;
    
                const playerBottom = player.y + player.height;
                const boxTop = this.y;
                const overlapY = playerBottom - boxTop;
                let onTop = false;

                const playerTop = player.y;
                const boxBottom = this.y + this.height;
                const overlapYBottom = boxBottom - playerTop;               

                if (overlapY > 0 && player.y < boxTop) {
                    player.y = boxTop - player.height;
                    if (!player.isJumping) {
                        player.velocityY = 0;
                    }
                    onTop = true;
                    if (player.isJumping && player.velocityY >= 0) {
                        player.isJumping = false;
                        if(!player.isWalking) {
                            player.isLanding = true;
                        } else {
                            player.startWalking = true;
                        }
                    }
                }
    
                if (!onTop && overlapXRight > 0 && player.direction === "right") {
                    player.x -= 20;
                    player.direction = "left";
                    player.isBounce = true;
                    player.framesSinceBounce = 0;
                } else if (
                !onTop &&
                overlapXLeft > 0 &&
                player.direction === "left"
                ) {
                    player.x += 20;
                    player.direction = "right";
                    player.isBounce = true;
                    player.framesSinceBounce = 0;
                }


            if (overlapYBottom > 0 && player.y + player.height > boxBottom) {
                player.y = boxBottom+1;
                player.velocityY = 0;
            }


            }
    }

    update(context, player, camera) {
        this.draw(context, camera, player);
    }
}


export {Obstacle};