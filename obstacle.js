/**
 * Represents a platform.
 * @class Obstacle
 */
class Obstacle {
    /**
     * @constructor
     * @property {number} x - The platform's x position.
     * @property {number} y - The platform's y position.
     * @property {number} width - The platform's width.
     * @property {number} height - The platform's height.
     * @property {string} color - The platform's color.
     * @returns {void}
     */
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.velocityY = 0;
    }

    /**
     * Draw the platform.
     * @param {CanvasRenderingContext2D} context - The context for drawing the platform.
     * @param {Camera} camera - The visible area.
     * @returns {void}
     */
    draw(context, camera) {
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
    }

    applyGravity(canvas, platform) {
        this.y = canvas.height - platform.height - this.height;
    }
}
