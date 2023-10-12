class Platform {

    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }

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

    applyGravity(canvas) {
        this.y = canvas.height - this.height;
    }

    update(canvas,context,camera) {
        this.applyGravity(canvas);
        this.draw(context, camera);
    }
}

export {Platform};