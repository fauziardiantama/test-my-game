window.addEventListener("load", () => {
    /**
     * Define the canvas and context variables
     */
    const canvas  = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");

    /**
     * Define the needed objects and variables
     */
    let camera;
    let platform;
    let player;
    let blueBox;
    let blueBox2;

    let gravity;
    let isBounce;
    let framesSinceBounce;

    /**
     * Function initialize will be called once when the page is loaded
     */
    function initialize() {

      /**
       * Create the objects
       */
      camera    =    new Camera(0, 0, canvas.width, canvas.height);                 //x, y, width, height
      platform  =    new Platform(0, canvas.height-50, canvas.width*3, 50, "green");  //x, y, width, height, color
      player    =    new Player(50, canvas.height/2 - 50, 50, 50, 5, 15);         //x, y, width, height, color, speed, jumpStrength
      blueBox   =    new Obstacle(canvas.width+50, platform.y - 100, 100,100,"blue");           //x, y, width, height, color
      blueBox2  =    new Obstacle(300, platform.y - 100, 50,100, "blue");           //x, y, width, height, color

      /**
       * Set the initial values for the variables
       */
      gravity           = 0.5;
      isBounce          = false;
      framesSinceBounce = null;
    }

    function update() {
        /**
         * Clear the canvas
         */
        context.clearRect(0, 0, canvas.width, canvas.height);

        /**
         * Apply gravity to the player and move it according to its direction
         */
        player.applyGravity(canvas, gravity);
        camera.responsiveUpdate(canvas);
        platform.applyGravity(canvas);
        blueBox.applyGravity(canvas,platform);
        blueBox2.applyGravity(canvas,platform);
        player.move();

        /**
         * Update the camera to follow the player
         */
        camera.update(player, canvas);
        camera.apply(context);
        
        /**
         * Draw the objects if they are inside the camera view
         */
        platform.draw(context, camera);
        player.update();
        player.draw(context);
        blueBox.draw(context, camera);
        blueBox2.draw(context, camera);

        /**
         * Check for collisions between the player and the platform
         */
        if (player.checkCollision(platform)) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            if (player.isJumping) {
                player.isJumping = false;
                if(!player.isWalking) {
                    player.isLanding = true;
                } else {
                    player.startWalking = true;
                }
            }
        }

        /**
         * Check for collisions between the player and the blue box
         */
        if (player.checkCollision(blueBox)) {
            //Player collide from its side
            const playerRight = player.x + player.width;
            const playerLeft = player.x;
            const boxRight = blueBox.x + blueBox.width;
            const boxLeft = blueBox.x;
            const overlapXRight = playerRight - boxLeft;
            const overlapXLeft = boxRight - playerLeft;

            //Player collide from top
            const playerBottom = player.y + player.height;
            const boxTop = blueBox.y;
            const overlapY = playerBottom - boxTop;
            let onTop = false;

            //Player collide from top
            if (overlapY > 0 && player.y < boxTop) {
                player.y = boxTop - player.height;
                player.velocityY = 0;
                onTop = true;
                if (player.isJumping) {
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
                isBounce = true;
                framesSinceBounce = 0;
            } else if (
            !onTop &&
            overlapXLeft > 0 &&
            player.direction === "left"
            ) {
                player.x += 20;
                player.direction = "right";
                isBounce = true;
                framesSinceBounce = 0;
            }
        }

        /**
         * Check for collisions between the player and the blue box 2
         */
        if (player.checkCollision(blueBox2)) {
            //Player collide from its side
            const playerRight = player.x + player.width;
            const playerLeft = player.x;
            const boxRight = blueBox2.x + blueBox2.width;
            const boxLeft = blueBox2.x;
            const overlapXRight = playerRight - boxLeft;
            const overlapXLeft = boxRight - playerLeft;

            //Player collide from top
            const playerBottom = player.y + player.height;
            const boxTop = blueBox2.y;
            const overlapY = playerBottom - boxTop;
            let onTop = false;

            //Player collide from top
            if (overlapY > 0 && player.y < boxTop) {
            player.y = boxTop - player.height;
            player.velocityY = 0;
            player.isJumping = false;
            onTop = true;
            }

            //Player collide from side
            if (!onTop && overlapXRight > 0 && player.direction === "right") {
                player.x -= 20;
                player.direction = "left";
                isBounce = true;
                framesSinceBounce = 0;
            } else if (
            !onTop &&
            overlapXLeft > 0 &&
            player.direction === "left"
            ) {
                player.x += 20;
                player.direction = "right";
                isBounce = true;
                framesSinceBounce = 0;
            }
        }

        /**
         * If the player is bouncing, stop it after 25 frames
         */
        if (
            isBounce &&
            framesSinceBounce != null &&
            framesSinceBounce >= 25
        ) {
            isBounce = false;
            player.stopMoving();
            framesSinceBounce = null;
        }
        if (framesSinceBounce != null) {
            framesSinceBounce++;
        }

        /**
         * Reset the camera (to follow the player)
         */
        camera.reset(context);
    }
    


    ////////////////////////////////CORE SYSTEM/////////////////////////////////
    /**/                                                                    /**/
    /**/ /*Define the fps element on screen, fps counter, and time start*/  /**/
    /**/                                                                    /**/
    /**/ const fpsdiv = document.getElementById("fps");                     /**/
    /**/ let frameCount = 0;                                                /**/
    /**/ let startTime = performance.now();                                 /**/
    /**/                                                                    /**/
    /**/ /*Define gameLoop function*/                                       /**/
    /**/                                                                    /**/
    /**/ function gameLoop() {                                              /**/
    /**/                                                                    /**/
    /**/    /*Call update function and increase frameCount every each loop*//**/
    /**/                                                                    /**/
    /**/    update();                                                       /**/
    /**/    frameCount++;                                                   /**/
    /**/                                                                    /**/
    /**/    /*If it has looped a multiple of 60 times*/                     /**/
    /**/                                                                    /**/
    /**/    if (frameCount % 60 === 0) {                                    /**/
    /**/        /*Count the FPS*/                                           /**/
    /**/        const elapsedTime = performance.now() - startTime;          /**/
    /**/        const fps = ((frameCount / elapsedTime) * 1000).toFixed(2); /**/
    /**/        fpsdiv.innerHTML = `Current FPS: ${fps}`;                   /**/
    /**/    }                                                               /**/
    /**/    /*loop the function gameLoop per frame (this is built-in)*/     /**/
    /**/    requestAnimationFrame(gameLoop);                                /**/
    /**/ }                                                                  /**/
    /**/ /*call initialize for once and then loop the gameLoop function*/   /**/
    /**/ initialize();                                                      /**/
    /**/ gameLoop();                                                        /**/
    ////////////////////////////////////////////////////////////////////////////

});