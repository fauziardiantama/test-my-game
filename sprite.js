class Sprite {
    constructor(imageUrl, width, height) {
      this.image = new Image();
      this.image.src = imageUrl;
      this.width = width;
      this.height = height;
    }
  }