class Sprite {
    constructor(imageUrl,cropWidth, cropHeight, width, height) {
      this.image = new Image();
      this.image.src = imageUrl;
      this.object = {
        width: width, //single tile on canvas
        height: height //single tile on canvas
      }
      this.image.crop = {
        width: cropWidth, //image width needed
        height: cropHeight //image height needed
      }
    }
  }

export {Sprite};