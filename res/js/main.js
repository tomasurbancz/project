import { Champ } from "./champs/Champ.js";
import { Background } from "./ui/basic-ui.js";
import { Player } from "./champs/Player.js";

const background = new Background();
const player = new Player();
let champ = null;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let img = null;
let gaming = false;
let waiting = true;
let lost = false;

// [] - pole
// {} - objekt

function changeImage(path) {
    img = new Image();
    img.src = path;
}

function changeChamp() {
    if(champ === null) champ = new Champ("Caitlyn", 100, 5, 100, 1, 1, 2, "white");
    else if(champ.name === "Caitlyn") champ = new Champ("Ezreal", 150, 10, 100, 1.25, 2, 2.5, "yellow");
    else if(champ.name === "Ezreal") champ = new Champ("Jinx", 200, 15, 100, 1.5, 3, 3, "pink");
    else if(champ.name === "Jinx") champ = new Champ("Vayne", 400, 30, 100, 3, 4, 6, "grey");
    else {
        gaming = false;
        waiting = false;
        lost = false;
    }
}

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
    if(gaming) update();
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
    if(champ.hp <= 0) {
        player.hp = 100;
        changeChamp();
    }
    if(player.hp <= 0) {
        gaming = false;
        waiting = false;
        lost = true;
    }
    champ.update();
    player.update(keys);
    Champ.detectHit(player.dart, champ);
    player.detectHit(champ.dart);
}

const render = () => {
    if(gaming) {
        champ.draw(ctx);
        player.draw(ctx);
        champ.dart.draw(ctx);
        player.dart.draw(ctx);
    }
    else {
        if(!waiting) {
            if(lost) changeImage("./res/img/screens/defeat.jpg")
            else changeImage("./res/img/screens/victory.jpg");
        }
        ctx.drawImage(img, 0, 0, 1280, 720);
    }
}

const getFPS = () => {

}

window.addEventListener("mousemove", (e) => {
    if(!gaming && waiting) {
        if(e.x >= 750 && e.x <= 1160 && e.y >= 670 && e.y <= 725) {
            canvas.style.cursor = 'pointer';
        } else canvas.style.cursor = 'default';
    } else canvas.style.cursor = 'default';
})

window.addEventListener("click", (e) => {
    if(!gaming && waiting) {
        if(e.x >= 750 && e.x <= 1160 && e.y >= 670 && e.y <= 725) {
            gaming = true;
        }
    }
})

window.onload = () => {
    changeChamp();
    changeImage("./res/img/screens/match.png");
    window.requestAnimationFrame(gameLoop);
}