
let score = 0;

function onTouchEvent(event)
{
    
    let eve_sori = GetSplite("eve_sori");
    let pointer = GetClickPoint();
    //console.log("global :" + app.renderer.plugins.interaction.mouse.global.x/getScreenRatio());
    //console.log("global :" + app.renderer.plugins.interaction.mouse.global.y/getScreenRatio());
    let vec = GetVector(eve_sori.x,eve_sori.y,pointer.x,pointer.y);
    eve_sori.x += vec.x*20;
    eve_sori.y += vec.y*20;
}

/**
 * appが読み込まれたときの処理
 */
function onAppLoad()
{
    //タッチ用のスプライト
    let backSplite = new PIXI.Sprite();
    backSplite.height = STAGE_HEIGHT;
    backSplite.width = STAGE_WIDTH;
    backSplite.originHeight = app.renderer.height;
    backSplite.originWidth = app.renderer.width;
    backSplite.interactive = true;
    backSplite.Name = "backSplite";
    backSplite.on('pointerup',function(){KEY_LIST[MOUSE]=false;});
    backSplite.on('pointerdown',function(){KEY_LIST[MOUSE]=true;});
    //backSplite.on('touchstart',onTouchEvent);
    app.stage.addChild(backSplite);

    //テキスト用のスプライト
    var textStyle = new PIXI.TextStyle({
        fontFamily: ["M+ 1m"],
        fontSize: 48, 
        fontWeight: "normal",
        fill: 0xffffff,
    });
    let scoreText = new PIXI.Text("Score:0", textStyle);
    app.stage.addChild(scoreText);

    //うさぎを追加
    /*
    let bunny = new PIXI.Sprite(app.loader.resources.bunny.texture);
    bunny.anchor.set(0.5);
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
    bunny.originHeight = bunny.height*4;
    bunny.originWidth = bunny.width*4;
    app.stage.addChild(bunny);
    */

    //イヴを追加
    let eve_sori = new PIXI.Sprite(app.loader.resources.Eve_Sori.texture); 
    eve_sori.anchor.set(0.5);
    eve_sori.x = STAGE_WIDTH / 2;
    eve_sori.y = STAGE_HEIGHT / 2;
    eve_sori.height /= 5;
    eve_sori.width /= 5;
    eve_sori.Name = "eve_sori";
    app.stage.addChild(eve_sori);

    // Listen for animate update
    app.ticker.add(function(delta)
    {
        //resizeImg(bunny);
        // Rotate mr rabbit clockwise
        //bunny.rotation += 0.05;
        //eve_sori.rotation += 0.05;
        if(KEY_LIST[MOUSE])
        {
            MoveExe();
        }
        if(isLottery(100))
        {
            GeneratePresent();
        }
        MovePresents();
        scoreText.text = "Score:" + score;        

    });
}

function GeneratePresent()
{
    //イヴを追加
    let present = new PIXI.Sprite(app.loader.resources.Present.texture); 
    present.anchor.set(0.5);
    present.height /= 5;
    present.width /= 5;
    present.x = STAGE_WIDTH+present.width-200;
    present.y = getRandomInt(STAGE_HEIGHT-present.height,present.height);
    present.Name = "present";
    app.stage.addChild(present);
}

function MovePresent(splite)
{
    splite.x -= 10;
    if(splite.x<0)
    {
        splite.parent.removeChild(splite);
    }

    /**@type Splite */
    let eve = GetSplite("eve_sori")[0];

    //イヴがPresentとぶつかっている場合
    if(IsHitSplite(eve,splite))
    {
        score++;
        splite.parent.removeChild(splite);
    }
}

function MovePresents()
{
    GetSplite("present").map(splite => MovePresent(splite));
    
}

function MoveExe()
{
    let eve_sori = GetSplite("eve_sori")[0];
    let pointer = GetClickPoint();
    let distance = GetDistance(eve_sori.x,eve_sori.y,pointer.x,pointer.y);
    if(distance<10) return;
    //console.log("global :" + app.renderer.plugins.interaction.mouse.global.x/getScreenRatio());
    //console.log("global :" + app.renderer.plugins.interaction.mouse.global.y/getScreenRatio());
    let vec = GetVector(eve_sori.x,eve_sori.y,pointer.x,pointer.y);
    eve_sori.x += vec.x*20;
    eve_sori.y += vec.y*20;
}

/**
 * ブラウザのhtml情報が読み込まれたときの処理
 */
function onLoad()
{
    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x2c3e50
    });


    document.body.children["app"].appendChild(app.view);
    
    // Load the bunny texture
    app.loader.add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png');
    app.loader.add('Eve_Sori', './img/santa.png');
    app.loader.add('Present', './img/present.png');
    app.loader.load(onAppLoad);

    $(window).resize(onResize);
    onResize();
}
$(onLoad);