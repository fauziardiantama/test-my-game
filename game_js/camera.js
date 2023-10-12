class Camera {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    update(player, canvas, context) {
      this.responsiveUpdate(canvas);
      if (player.x < canvas.width / 2) {
        this.x = 0;
      } else if (player.x > canvas.width * 4 + canvas.width / 2) {
        this.x = canvas.width * 4;
      } else {
        this.x = player.x - canvas.width / 2;
      }
      // Mengikuti pemain secara vertikal jika pemain berada di bawah batasan tertentu
      if (player.y < 0) {
        this.y = player.y - canvas.height / 5;
      } else {
        this.y = 0;
      }
      this.apply(context);
    }

    apply(context) {
      context.save();
      context.translate(-this.x, -this.y);
    }

    responsiveUpdate(canvas) {
      this.width = canvas.width;
      this.height = canvas.height;
      this.y = canvas.height - this.height;
    }

    reset(context) {
      context.restore();
    }
}

export {Camera};