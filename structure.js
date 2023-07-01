class Structure {
    constructor({x, y, width, height, obstacleArr}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.obstacleArr = obstacleArr;
    }

    initialize() {
        this.obstacleArr.forEach(obstacle => {
            obstacle.x += this.x;
            obstacle.y += this.y;
        });
    }

    update(canvas,context, player, camera) {
        this.obstacleArr.forEach(obstacle => {
            obstacle.update(canvas,context, player, camera);
        });
    }
}