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
let spaceshipX = canvas.width / 2 - 32 ;
let spaceshipY = canvas.height   - 68;

let bulletList = [] //총알들을 저장하는 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init=function(){
        this.x = spaceshipX + 20;
        this.y = spaceshipX;

        bulletList.push(this);
    };
    this.update = function(){
        this.y-=7;
    };
}



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

let keysDown = {};
function setupKeyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];

     if(event.keyCode == 32 ) {
        createBullet() // 총알 생성
        

     }
    });
}

function createBullet(){
    console.log("총알 생성");
    let b = new Bullet() // 총알 하나 생성
    b.init()
    console.log("새로운 총알 리스트", bulletList);
}


function update() {
    if (39 in keysDown) {
        spaceshipX += 5;
    } // right
    if (37 in keysDown) {
        spaceshipX -= 5;
    } //left
}

if(spaceshipX <= 0) {
    spaceshipX = 0;
}
if(spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
}


//총알의 y좌표 업데이트하는 함수 호출
for(let i=0;i<bulletList.length;i++){
    bulletList[i].update()
}


function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX, spaceshipY);

    for(let i=0;i<bulletList.length;i++){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i] .y);
    }

}

function main() {
    update(); //좌표 값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

//총알만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알 발사 = 총알의 y값이 -- 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 총알 배열에 저장을 한다.
//4. 총알들은 x,y좌표값은 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다