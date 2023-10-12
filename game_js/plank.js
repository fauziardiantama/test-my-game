import {Sprite} from './sprite.js';

class Plank extends Sprite {

    constructor(x, y, width, height, imageWidth, imageHeight, objectWidth, objectHeight,cornerLeft,cornerRight) {
      super('img/plank.png',imageWidth,imageHeight, objectWidth, objectHeight);
      this.x = x;
      this.y = y;
      this.width = width; //tiles' width
      this.height = height; //tiles' height
      this.currentFrame = 0;
      this.cornerLeft = cornerLeft;
      this.cornerRight = cornerRight;
    }

    draw(context, camera, player) {
            if (
                this.x < camera.x + camera.width &&
                this.x + this.width > camera.x &&
                this.y < camera.y + camera.height &&
                this.y + this.height > camera.y
            )
            {
                var numX = Math.ceil(this.width / this.object.width); // Menggunakan Math.ceil untuk mendapatkan jumlah kolom (X) yang dibutuhkan
                var numY = Math.ceil(this.height / this.object.height); // Menggunakan Math.ceil untuk mendapatkan jumlah baris (Y) yang dibutuhkan
                
                var spriteWidth = this.image.crop.width; // Menyimpan lebar sprite dalam variabel
                var spriteHeight = this.image.crop.height; // Menyimpan tinggi sprite dalam variabel
                
                for (var i = 0; i < numX * numY; i++) {
                    var x = i % numX; // Menghitung indeks kolom (X) saat ini
                    var y = Math.floor(i / numX); // Menghitung indeks baris (Y) saat ini
                
                    var isTileFirst = (x === 0) && (y === 0); // Memeriksa apakah ini adalah tile pertama
                    var isTileLast = (x === Math.round(numX) - 1) && (y === Math.round(numY) - 1); // Memeriksa apakah ini adalah tile terakhir
                    //.log("x: " + x + "sama dengan : " + (Math.round(numX)-1));
                    var drawX = this.x + (x * this.object.width); // Menghitung posisi X untuk menggambar sprite
                    var drawY = this.y + (y * this.object.height); // Menghitung posisi Y untuk menggambar sprite


                    var cropWidth = Math.min(this.object.width, this.width - (x * this.object.width));
                    var cropHeight = Math.min(this.object.height, this.height - (y * this.object.height));

                    spriteWidth = cropWidth < this.object.width ? ((this.width - (x * this.object.width)) / this.object.width ) * spriteWidth : spriteWidth;
                    spriteHeight = cropHeight < this.object.height ? ((this.height - (y * this.object.height)) / this.object.height ) * spriteHeight : spriteHeight;
                    
                    if (isTileFirst && this.cornerLeft) {
                        // Menggambar sprite pertama (kiri atas)

                        // image, ix, iy, iwidth, iheight, cx, cy, cwidth, cheight.
                        context.drawImage(this.image, this.currentFrame, 0, spriteWidth, spriteHeight, drawX, drawY, cropWidth, cropHeight);
                        // x : Math.min(50, 70 - 50)
                        // Gunakan Math.min untuk membatasi ukuran gambar sesuai dengan sisa ruang pada canvas
                    } else if (isTileLast && this.cornerRight) {
                        // Menggambar sprite terakhir (kanan bawah)
                        context.drawImage(this.image, this.image.width - spriteWidth, 0, spriteWidth, spriteHeight, drawX, drawY, cropWidth, cropHeight);
                        // Gunakan Math.min untuk membatasi ukuran gambar sesuai dengan sisa ruang pada canvas
                    } else {
                        // Menggambar sprite biasa (tengah-tengah)
                        context.drawImage(this.image, spriteWidth, 0, spriteWidth, spriteHeight, drawX, drawY, cropWidth, cropHeight);
                        // Gunakan Math.min untuk membatasi ukuran gambar sesuai dengan sisa ruang pada canvas
                    }
                }
                
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


export {Plank};