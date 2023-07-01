function game() {
    const canvas  = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");
 
    let player;
    let structures = [];
    let gravity;
    let camera;
    let platformHeight = canvas.height/5;
 
    function initialize() {
         gravity = 0.5;
         player = new Player(10, canvas.height/2 - canvas.width/10, canvas.width/10,canvas.width/10, canvas.width/100, 20);
         camera = new Camera(0, 0, canvas.width, canvas.height);
         structures = [
             new Structure({
                 x: 0,
                 y: 0,
                 width: canvas.width,
                 height: canvas.height,
                 obstacleArr : [
                     new Obstacle(0, 2000, canvas.width, canvas.height/5, 0, "green"),
                     new Obstacle(canvas.width/2-50, canvas.height - canvas.height/5 - canvas.width/10, canvas.width/10,canvas.width/10, platformHeight, "red")
                 ]
             }),
             new Structure({
                 x: canvas.width*1,
                 y: 0,
                 width: canvas.width,
                 height: canvas.height,
                 obstacleArr : [
                     new Obstacle(0, canvas.height - canvas.height/5, canvas.width, canvas.height/5, 0, "green"),
                     new Obstacle(canvas.width/2-50, canvas.height - canvas.height/4 - canvas.width/10, canvas.width/10,canvas.width/10, platformHeight, "red")
                 ]
             }),
             new Structure({
                 x: canvas.width * 2,
                 y: 0,
                 width: canvas.width,
                 height: canvas.height,
                 obstacleArr : [
                     new Obstacle(0, canvas.height - canvas.height/5, canvas.width, canvas.height/5, 0, "green"),
                     new Obstacle(canvas.width/2-50, canvas.height - canvas.height/5 - canvas.width/10, canvas.width/10,canvas.width/10, platformHeight, "red")
                 ]
             }),
             new Structure({
                 x: canvas.width * 3,
                 y: 0,
                 width: canvas.width,
                 height: canvas.height,
                 obstacleArr : [
                     new Obstacle(0, canvas.height - canvas.height/5, canvas.width, canvas.height/5, 0, "green"),
                     new Obstacle(canvas.width/2-50, canvas.height - canvas.height/5 - canvas.width/10, canvas.width/10,canvas.width/10, platformHeight, "red")
                 ]
             }),
             new Structure({
                 x: canvas.width * 4,
                 y: 0,
                 width: canvas.width,
                 height: canvas.height,
                 obstacleArr : [
                     new Obstacle(0, canvas.height - canvas.height/5, canvas.width, canvas.height/5, 0, "green"),
                     new Obstacle(canvas.width/2-50, canvas.height - canvas.height/5 - canvas.width/10, canvas.width/10,canvas.width/10, platformHeight, "red")
                 ]
             }),
         ]
         structures.forEach(structure => {
             structure.initialize();
         });
       // Initialize the game
    }
 
    function update() {
       // Update the game
         context.clearRect(0, 0, canvas.width, canvas.height);
         camera.update(player,canvas,context);
         player.update(context, gravity, canvas);
         structures.forEach(structure => {
             structure.update(canvas , context, player, camera);
         });
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

}
