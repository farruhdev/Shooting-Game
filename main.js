//캔버스 세팅 
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver=false //true이면 게임이 끝남, false이면 게임 안 끝남
let score=0
//spaceship coordinates
let spaceshipX = canvas.width / 2 - 32 ;
let spaceshipY = canvas.height   - 68;

let bulletList = []; //총알들을 저장하는 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = spaceshipX + 20;
        this.y = spaceshipY;
        this.alive=true // true면 살아있는 총알 false면 죽은 총알
        bulletList.push(this);
    };
    this.update = function () {
        this.y -= 7;
    };

    this.checkHit=function () {
        //총알.y <= 적군.y And
        //총알.y >= 적군.x  and 총알.x <= 적군.x +적군의 넓이
        for(let i=0;  i < enemyList.length; i++) {
           if ( 
              this.y <= enemyList[i].y &&
              this.x >= enemyList [i].x &&
              this.x <= enemyList[i].x + 40
            ){  
                //총알이 죽게됨 적군의 우주선이 없어짐, 점수 확득
              score++;
              this.alive = false; //죽은 총알
              enemyList.splice(i, 1);
        }
     }
    };
}

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;  
    return randomNum;
}

let enemyList= [];
function Enemy() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.y = 0;
        this.x = generateRandomValue(0, canvas.width - 70);
        enemyList.push(this);
    };
    this.update = function () {
        this.y +=3; // 적군의 속도 조절

        if (this.y >= canvas.height - 48) {
            gameOver = true;
            console.log("gameover");
        }
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
        createBullet(); // 총알 생성
        

     }
    });
}

function createBullet() {
    console.log("총알 생성");
    let b = new Bullet(); // 총알 하나 생성
    b.init();
    //console.log("새로운 총알 리스트", bulletList);
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy()
        e.init();
    }, 1000);
}



function update() {
    if (39 in keysDown) {
        spaceshipX += 3; // 우주선의 속도
    } // right
    if (37 in keysDown) {
        spaceshipX -= 5;
    } //left

    if(spaceshipX <= 0) {
        spaceshipX = 0;
 }
  if(spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }


 //총알의 y좌표 업데이트하는 함수 호출
 for(let i = 0; i <bulletList.length; i++) {
    if(bulletList[i].alive){
        bulletList[i].update();
    bulletList[i].checkHit();
    }
    
 }
  for (let i = 0; i < enemyList.length; i++) {
      enemyList[i].update();
 }

}


function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score:${score}`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for (let i = 0; i < bulletList. length; i++) {
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i] .y); 
        } 
    }

    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }

}

function main() {
  if (!gameOver) {
     update(); //좌표 값을 업데이트하고
     render(); //그려주고
     requestAnimationFrame(main);
    }else{
        ctx.drawImage(gameOverImage, 10, 100, 380, 380,);
    }
   
}

loadImage();
setupKeyboardListener();
createEnemy();
main();

//총알만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알 발사 = 총알의 y값이 -- 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 총알 배열에 저장을 한다.
//4. 총알들은 x,y좌표값은 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다