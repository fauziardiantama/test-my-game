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

    }

    function update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        camera.update(player, canvas, context);

        platform.update(canvas,context,camera);
        player.update(context, gravity, platform, canvas);
        blueBox.draw(context, camera, platform, canvas,player);
        blueBox2.draw(context, camera, platform, canvas, player);
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