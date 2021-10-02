//console.log("s");

//htmlとの同期
myCanvas = document.getElementById("canvas");

//変数系
//カウンター(何回押したか？)
let counter = 0;

//スコア
let score = counter / 4;

//制限時間
let timer = 30;

//画像関連
let screen;

let britzen_title;

//ゲームが開始されているか？
let isGameStart = false;

//マウス関連
let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;

let context;





function Initialize()
{
    myCanvas = document.getElementById("canvas");

    myCanvas.addEventListener('mouseDown', e => 
    {
        isMouseDown = true;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    });
    

    myCanvas.addEventListener('mouseup', () => 
    {
        isMouseDown = false
    });

    context = myCanvas.getContext('2d');

    britzen_title = new Image();
    britzen_title.src = './image/britzen_title.png';

    screen = "title";

    isGameStart = true;
}


function Update()
{
    if(!isGameStart)
    {
        return;
    }

    
    switch(screen)
    {
        case "title" :
            titlescreen();
            break;
        default:
            //alert("Not implemented");
    }
}



function titlescreen()
{
    count = 0;
    timer = 30;

    context.fillStyle = "rgb(0,255,255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    context.drawImage(britzen_title, 0, 140)
}


window.addEventListener('DOMContentLoaded', Initialize);
setInterval(Update, 10)




