/**
 * Represents a Camera.
 * @class Camera
 */
class Camera {
    /**
     * Create a Camera.
     * @constructor
     * @property {number} x - The camera's x position.
     * @property {number} y - The camera's y position.
     * @property {number} width - The camera's width.
     * @property {number} height - The camera's height.
     * @returns {void}
     */
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    /**
     * Update the camera.
     * @param {Player} player - The player.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @returns {void}
     */
    update(player, canvas) {
      if (player.x > canvas.width / 2) {
        this.x = player.x - canvas.width / 2;
      } else {
        this.x = 0;
      }
    }

    /**
     * Apply the camera's translation to the context.
     * @param {CanvasRenderingContext2D} context - The context to apply the translation to.
     * @returns {void}
     */
    apply(context) {
      context.save();
      context.translate(-this.x, -this.y);
    }
  
    /**
     * Reset the camera's translation.
     * @param {CanvasRenderingContext2D} context - The context to reset the translation on.
     * @returns {void}
     */
    reset(context) {
      context.restore();
    }

    responsiveUpdate(canvas) {
      this.width = canvas.width;
      this.height = canvas.height;
      this.y = canvas.height - this.height;
    }
}