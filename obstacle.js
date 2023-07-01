class Obstacle {

    constructor(x, y, width, height, platformHeight, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.platformHeight = platformHeight;
    }

    draw(context, camera, player) {
        if (
            this.x < camera.x + camera.width &&
            this.x + this.width > camera.x &&
            this.y < camera.y + camera.height &&
            this.y + this.height > camera.y
            )
            {
                context.fillStyle = this.color;
                context.fillRect(this.x, this.y, this.width, this.height);
            }

            if (player.checkCollision(this)) {
                //Player collide from its side
                const playerRight = player.x + player.width;
                const playerLeft = player.x;
                const boxRight = this.x + this.width;
                const boxLeft = this.x;
                const overlapXRight = playerRight - boxLeft;
                const overlapXLeft = boxRight - playerLeft;
    
                //Player collide from top
                const playerBottom = player.y + player.height;
                const boxTop = this.y;
                const overlapY = playerBottom - boxTop;
                let onTop = false;
                //Player collide from top
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
    
                //Player collide from side
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
            }
    }

    applyGravity(canvas) {
        this.y = canvas.height - this.platformHeight - this.height;
    }

    update(canvas,context, player, camera) {
        this.applyGravity(canvas);
        this.draw(context, camera, player);
    }
}