//htmlとの同期
myCanvas = document.getElementById("canvas");

//変数系
//カウンター(何回押したか？)
let counter = 0;

//スコア
let score = 0;

//制限時間
let timer = 0;

//画像関連
let screen;

let britzen_title;
let button_start;
let button_howto;
let button_credit;

//ゲームが開始されているか？
let isGameStart = false;

//マウス関連
let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;

let context;


function Initialize() {
    myCanvas = document.getElementById("canvas");

    /*myCanvas.addEventListener('mousedown', e => 
    {
        isMouseDown = true;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    });
    
    myCanvas.addEventListener('mouseup', () => 
    {
        isMouseDown = false
    });*/

    myCanvas.addEventListener('click', e => {
        switch (screen) {
            case "title":
                if (e.offsetX > 820 && e.offsetX < 1120 && e.offsetY > 400 && e.offsetY < 500) {
                    screen = "game";
                }
                else if (e.offsetX > 820 && e.offsetX < 1040 && e.offsetY > 530 && e.offsetY < 590) {
                    screen = "howto";
                }
                else if (e.offsetX > 820 && e.offsetX < 1040 && e.offsetY > 625 && e.offsetY < 685) {
                    screen = "credit";
                }
                break;
            case "game":
                //クリック4回につきスコアが1増える
                counter++;
                if (counter % 4 == 0 && counter > 0) {
                    score++;
                }
                break;
            case "result":
                if (e.offsetX > 750 && e.offsetX < 970 && e.offsetY > 550 && e.offsetY < 610) {
                    screen = "title";
                    counter = 0;
                    score = 0;
                }
                if (e.offsetX > 450 && e.offsetX < 510 && e.offsetY > 550 && e.offsetY < 610) {
                    SendTweet();
                }
                break;
            case "howto":
                if (e.offsetX > 120 && e.offsetX < 180 && e.offsetY > 30 && e.offsetY < 90) {
                    screen = "title";
                }
                break;
            case "credit":
                if (e.offsetX > 120 && e.offsetX < 180 && e.offsetY > 30 && e.offsetY < 90) {
                    screen = "title";
                }
                break;
            default:
                alert("Not implemented");
        }
    });

    context = myCanvas.getContext('2d');

    //描画関連
    //タイトル
    britzen_title = new Image();
    britzen_title.src = './image/britzen_title.png';
    button_start = new Image();
    button_start.src = './image/button_start.png';
    button_howto = new Image();
    button_howto.src = './image/button_howto.png';
    button_credit = new Image();
    button_credit.src = './image/button_credit.png';
    logo_title = new Image();
    logo_title.src = './image/logo_title.png';

    //ゲーム中
    britzen_title = new Image();
    britzen_title.src = './image/britzen_title.png';
    britzen_1 = new Image();
    britzen_1.src = './image/britzen_1.png';
    britzen_2 = new Image();
    britzen_2.src = './image/britzen_2.png';
    britzen_3 = new Image();
    britzen_3.src = './image/britzen_3.png';
    britzen_4 = new Image();
    britzen_4.src = './image/britzen_4.png';

    //リザルト
    eve_1 = new Image();
    eve_1.src = './image/eve_1.png';
    eve_2 = new Image();
    eve_2.src = './image/eve_2.png';
    eve_3 = new Image();
    eve_3.src = './image/eve_3.png';
    eve_4 = new Image();
    eve_4.src = './image/eve_4.png';
    eve_5 = new Image();
    eve_5.src = './image/eve_5.png';
    eve_6 = new Image();
    eve_6.src = './image/eve_6.png';
    frame_result = new Image();
    frame_result.src = './image/frame_result.png';
    button_retry = new Image();
    button_retry.src = './image/button_retry.png';
    button_tweet = new Image();
    button_tweet.src = './image/button_tweet.png';

    //遊び方、クレジット
    frame_result = new Image();
    frame_result.src = './image/frame_result.png';
    button_return = new Image();
    button_return.src = './image/button_return.png';

    screen = "title";

    isGameStart = true;
}

function Update() {
    if (!isGameStart) {
        return;
    }

    switch (screen) {
        case "title":
            titlescreen();
            break;
        case "game":
            gamescreen();
            break;
        case "result":
            resultscreen();
            break;
        case "howto":
            howtoplay();
            break;
        case "credit":
            creditscreen();
            break;
        default:
            alert("Not implemented")
    }
}



function titlescreen() {
    count = 0;
    timer = 3000;
    //デバッグ用
    //timer = 300;

    //画面をクリア
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(britzen_title, 0, 140);
    context.drawImage(button_start, 820, 400);
    context.drawImage(button_howto, 820, 530);
    context.drawImage(button_credit, 820, 625);
    context.drawImage(logo_title, 635, 20);
}
window.addEventListener('DOMContentLoaded', Initialize);
setInterval(Update, 10)

function gamescreen() {

    //持ち時間が減少
    timer--;

    //画面をクリア
    context.fillStyle = "rgb(225,255,255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    //描画関連
    if (counter == 0) {
        context.drawImage(britzen_title, 0, 140);
    }
    else if (counter % 4 == 1) {
        context.drawImage(britzen_1, 0, 140);
    }
    else if (counter % 4 == 2) {
        context.drawImage(britzen_2, 0, 140);
    }
    else if (counter % 4 == 3) {
        context.drawImage(britzen_3, 0, 140);
    }
    else if (counter % 4 == 0) {
        context.drawImage(britzen_4, 0, 140);
    }

    //タイマー表示
    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "60px 'ＭＳ ゴシック'";

    context.fillText("残り時間 " + (timer / 100).toPrecision(4) + "秒", 400, 120);

    //スコア表示
    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "60px 'ＭＳ ゴシック'";
    context.fillText(score + "個", 1000, 120);


    //リザルトへ
    if (timer <= 0) {
        screen = "result";
    }
}

function resultscreen() {
    //画面をクリア
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //フレーム画像とか
    context.drawImage(frame_result, 150, 60);
    context.drawImage(button_retry, 750, 550);
    context.drawImage(button_tweet, 450, 550);

    //イヴの画像
    if (score <= 30) {
        context.drawImage(eve_1, 0, 80);
        //テキスト表示
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "40px 'ＭＳ ゴシック'";
        context.textAlign = "left";
        context.fillText("ブリッツェン、", 450, 300);
        context.fillText("プレゼントは気持ちが大事なので、", 450, 350);
        context.fillText("落ち込まないで～", 450, 400);
    }
    else if (score > 30 && score <= 70) {
        context.drawImage(eve_2, 0, 80);
        //テキスト表示
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "40px 'ＭＳ ゴシック'";
        context.textAlign = "left";
        context.fillText("お手伝いありがとうございます～♪", 450, 300);
    }
    else if (score > 70 && score <= 90) {
        context.drawImage(eve_3, 0, 80);
        //テキスト表示
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "40px 'ＭＳ ゴシック'";
        context.textAlign = "left";
        context.fillText("今日は絶好調ですね～", 450, 300);
    }
    else if (score > 90 && score <= 110) {
        context.drawImage(eve_4, 0, 80);
        //テキスト表示
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "40px 'ＭＳ ゴシック'";
        context.textAlign = "left";
        context.fillText("これなら私の分と合わせて", 450, 300);
        context.fillText("事務所の子たち全員に", 450, 350);
        context.fillText("プレゼントを配れますよ～！", 450, 400);
    }
    else if (score > 110 && score <= 150) {
        context.drawImage(eve_5, 0, 80);
        //テキスト表示
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "40px 'ＭＳ ゴシック'";
        context.textAlign = "left";
        context.fillText("すごいです～！", 450, 300);
        context.fillText("さすが私のブリッツェンですね～♬", 450, 350);
    }
    else {
        context.drawImage(eve_6, 0, 80);
        //テキスト表示
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "40px 'ＭＳ ゴシック'";
        context.textAlign = "left";
        context.fillText("ズルはいけません！", 450, 300);
        context.fillText("めっ！ですよ！😡", 450, 300);
    }

    //スコア表示
    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "60px 'ＭＳ ゴシック'";
    context.fillText("記録 " + score + "個", 650, 200);
}

function howtoplay() {
    //画面クリア
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //画像描画
    context.drawImage(frame_result, 150, 60);
    context.drawImage(button_return, 120, 30);

    //文字描画
    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "30px 'ＭＳ ゴシック'";
    context.textAlign = "left";
    context.fillText("イヴちゃんは今日も大忙し。", 100, 200);
    context.fillText("お仕事でいないイヴちゃんの代わりに、プレゼントの用意を手伝いましょう。", 100, 300);
    context.fillText("画面を連打すると、ブリッツェンがプレゼントを梱包します。", 100, 400);
    context.fillText("ゲームが始まったら、画面をひたすら連打して、いっぱいプレゼントを包んであげましょう。", 100, 500);


}

function creditscreen() {
    //画面クリア
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //画像描画
    context.drawImage(frame_result, 150, 60);
    context.drawImage(button_return, 120, 30);

    //文字描画
    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "30px 'ＭＳ ゴシック'";
    context.textAlign = "left";
    context.fillText("企画 : ニュートン  マルモッテ", 400, 300);
    context.fillText("イラスト : マルモッテ", 400, 350);
    context.fillText("プログラム : Nattu.", 400, 400);
}

function SendTweet() {
    //投稿内容
    let texts = "ブリッツェンがプレゼントを" + score + "個梱包したよ！イヴ・サンタクロース総選挙応援特設ファンサイトはこちら！";
    let hashtags = "イヴ・サンタクロース,イヴ世界一周";

    //投稿画面を開く
    let url = "https://twitter.com/share?hashtags=" + hashtags + "&text=" + texts;
    window.open(url, "_blank");

}