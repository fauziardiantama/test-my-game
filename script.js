import { fauzigame as LocalGame } from "./game_js/game.js";

//definsi variable-variable yang akan digunakan
const canvas = document.getElementById("gameCanvas");
const UI = document.getElementById("UI");
const fpsdiv = document.getElementById("fps");
let game;
let loop;
// setiap kali window di load/resize resize canvas dan jalankan game
['load', 'resize'].forEach(function(e) {
    window.addEventListener(e, () => {
      if (game) {
        game.stop();
        game = undefined;
      }
      if (loop) {
        cancelAnimationFrame(loop); // Cancel the previous animation frame
      }
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      game = new LocalGame(canvas, UI);
      //game.setFps(fpsdiv);
      loop = requestAnimationFrame(() => game.run());
    });
});

// fungsi untuk tombol touchscreen
function triggerKeyEvent(key, eventType) {
  document.dispatchEvent(new KeyboardEvent(eventType, { 'key': key }));
}
