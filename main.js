//캔버스 세팅 
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//spaceship coordinates
let spaceshipX = canvas.width/2-32
let spaceshipY = canvas.height-64


function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.png";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy1.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameover.png";
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX, spaceshipY);

}

function main() {
    render();
    console.log("animation calls main function");
    requestAnimationFrame(main);
}

loadImage();
main();