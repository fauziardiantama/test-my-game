import {Player} from "./player.js";
import {Camera} from "./camera.js";
import {Structure} from "./structure.js";
import {Obstacle} from "./obstacle.js";
import {Platform} from "./platform.js";
import {Plank} from "./plank.js";

class fauzigame {
    constructor(canvas, UI) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.UI = UI;
        this.platformHeight = this.canvas.height/5;
        this.showfps = false;
        this.loop;

        // Initialize the game
        this.gravity = 0.5;
        this.player = new Player(10, this.canvas.height/2 - this.canvas.width/10, this.canvas.width/10, this.canvas.width/10, this.canvas.width/100, Math.ceil((-1/2 + Math.sqrt(1/4 + 4 * (this.canvas.width/5))) / 2),this.UI);
        this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);

        this.structures = [
            new Structure({
                x: 0,
                y: 0,
                width: this.canvas.width,
                height: this.canvas.height,
                obstacleArr: [
                    new Platform(0, this.canvas.height - this.platformHeight, this.canvas.width, this.canvas.height / 5,16,16, this.canvas.width / 10, this.canvas.width / 10, false, false),
                    new Obstacle(this.canvas.width / 4, (16 * this.canvas.height - 5 * this.canvas.width) / 20, this.canvas.width / 20, this.canvas.width / 20, this.platformHeight, "red"),
                    new Plank((9 * this.canvas.width) / 20, (16 * this.canvas.height - 5 * this.canvas.width) / 20, this.canvas.width / 4, this.canvas.width / 20,16,16, this.canvas.width / 20, this.canvas.width / 20, true, true),
                    new Obstacle((11 * this.canvas.width) / 20, (120 * this.canvas.height - 61 * this.canvas.width)/150, this.canvas.width / 20, this.canvas.width / 20, this.platformHeight, "red"),
                    new Obstacle((9 * this.canvas.width) / 10, (8 * this.canvas.height - this.canvas.width) / 10, this.canvas.width / 10, this.canvas.width / 10, this.platformHeight, "red"),
                ]                     
            }),
            new Structure({
                x: this.canvas.width*1,
                y: 0,
                width: this.canvas.width,
                height: this.canvas.height,
                obstacleArr: [
                    new Platform(0, this.canvas.height - this.platformHeight, (11*this.canvas.width)/20, this.canvas.height/5,16,16, this.canvas.width / 10, this.canvas.width / 10, false, true),
                    new Platform((3*this.canvas.width)/4, this.canvas.height - this.platformHeight, this.canvas.width/4, this.canvas.height/5,16,16, this.canvas.width / 10, this.canvas.width / 10, true, false),
                    new Obstacle(this.canvas.width/4, (8*this.canvas.height - 3*this.canvas.width)/10, this.canvas.width/10, this.canvas.width/10, this.platformHeight, "red"),
                    new Plank((11*this.canvas.width)/20, (4*this.canvas.height - 2*this.canvas.width)/5, this.canvas.width/4, this.canvas.width/20,16,16, this.canvas.width / 20, this.canvas.width / 20, true,true),
                ],                
            }),
            new Structure({
                x: this.canvas.width * 2,
                y: 0,
                width: this.canvas.width,
                height: this.canvas.height,
                obstacleArr : [
                    new Platform(0, this.canvas.height - this.platformHeight, (2*this.canvas.width)/5, this.canvas.height/5,16,16, this.canvas.width / 10, this.canvas.width / 10, false, true),
                    new Platform((3*this.canvas.width)/5, this.canvas.height - this.platformHeight, (2*this.canvas.width)/5, this.canvas.height/5,16,16, this.canvas.width / 10, this.canvas.width / 10, true, false),
                    new Obstacle(this.canvas.width/5, (8*this.canvas.height-this.canvas.width)/10, this.canvas.width/10,this.canvas.width/10, this.platformHeight, "red"),
                    new Obstacle((3*this.canvas.width)/10, (8*this.canvas.height-this.canvas.width)/10, this.canvas.width/10,this.canvas.width/10, this.platformHeight, "red"),
                    new Obstacle((3*this.canvas.width)/10, (4*this.canvas.height-this.canvas.width)/5, this.canvas.width/10,this.canvas.width/10, this.platformHeight, "red"),
                    new Obstacle((3*this.canvas.width)/5, (8*this.canvas.height-this.canvas.width)/10, this.canvas.width/10,this.canvas.width/10, this.platformHeight, "red"),
                    new Obstacle((3*this.canvas.width)/5, (4*this.canvas.height-this.canvas.width)/5, this.canvas.width/10,this.canvas.width/10, this.platformHeight, "red"),
                    new Obstacle((7*this.canvas.width)/10, (8*this.canvas.height-this.canvas.width)/10, this.canvas.width/10,this.canvas.width/10, this.platformHeight, "red"),
                ]
            }),
            new Structure({
                x: this.canvas.width * 3,
                y: 0,
                width: this.canvas.width,
                height: this.canvas.height,
                obstacleArr : [
                    new Platform(0, this.canvas.height - this.platformHeight, (2*this.canvas.width)/5, this.canvas.height/5,16,16, this.canvas.width / 10, this.canvas.width / 10, false, true),
                    new Obstacle((3*this.canvas.width)/10, (8*this.canvas.height-this.canvas.width)/10, this.canvas.width/10,this.canvas.width/10, this.platformHeight, "red"),
                    new Plank((13*this.canvas.width)/20, (16*this.canvas.height - 5*this.canvas.width)/20, this.canvas.width/4,this.canvas.width/20,16,16, this.canvas.width / 20, this.canvas.width / 20, true, true)
                ]
            }),
            new Structure({
                x: this.canvas.width * 4,
                y: 0,
                width: this.canvas.width,
                height: this.canvas.height,
                obstacleArr : [
                    new Platform(0, (4*this.canvas.height)/5, this.canvas.width, this.canvas.height/5,16,16, this.canvas.width / 10, this.canvas.width / 10, true, false),
                    new Obstacle((this.canvas.width-100)/2, (8*this.canvas.height - this.canvas.width)/10, this.canvas.width/10,this.canvas.width/10, this.platformHeight, "red")
                ]
            }),
        ];
        this.structures.forEach(structure => {
            structure.initialize();
        });
    }

    setFps(fpsdiv) {
        this.fpsdiv = fpsdiv;
        this.frameCount = 0;
        this.startTime = performance.now();
        this.showfps = true;
    }

    run() {
        this.update();
        if (this.showfps) {
            this.frameCount++;
            if (this.frameCount % 60 === 0) {
                var elapsedTime = performance.now() - this.startTime;
                var fps = ((this.frameCount / elapsedTime) * 1000).toFixed(2);
                this.fpsdiv.innerHTML = `Current FPS: ${fps}`;
            }
        }
        this.loop = requestAnimationFrame(() => this.run());
    }

    update() {
          this.context.beginPath();
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          
          var gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
          gradient.addColorStop(0, 'blue');
          gradient.addColorStop(0.7, 'skyblue');
          gradient.addColorStop(1, 'white');
          this.context.fillStyle = gradient;
          this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
         
          this.camera.update(this.player,this.canvas,this.context);
          this.player.update(this.context, this.gravity, this.canvas);
          this.structures.forEach(structure => {
              structure.update(this.context, this.player, this.camera);
          });
          this.camera.reset(this.context);
    }

    stop() {
        cancelAnimationFrame(this.loop);
    }
}

export {fauzigame};
