import { Champ } from "./champs/Champ.js";
import { Background } from "./ui/basic-ui.js";

const background = new Background();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// [] - pole
// {} - objekt

const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

const gameLoop = () => {
    //resize canvas
    resizeCanvas();
    //clear canvas
    clearCanvas();
    //update
    update();
    //render
    render();
    //fps
    getFPS();
    
    window.requestAnimationFrame(gameLoop);
}

const resizeCanvas = () => {
    canvas.width = 1280;
    canvas.height = 720;
}

const clearCanvas = () => {
    background.draw(ctx);
}

const update = () => {

}

const render = () => {

}

const getFPS = () => {

}

window.onload = () => {
    window.requestAnimationFrame(gameLoop);
}