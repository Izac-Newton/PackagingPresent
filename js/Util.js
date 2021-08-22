

/**
 * 点(x1,y1)から点(x2,y2)の単位ベクトルを取得する
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns 
 */
function GetVector(x1,y1,x2,y2)
{
    var rad = Math.atan2( y2 - y1, x2 - x1 ) ;
    let result = {};
    result.x = Math.cos(rad);
    result.y = Math.sin(rad);
    return result;
}

/**
 * 点(x1,y1)から点(x2,y2)の距離を求める
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns 
 */
function GetDistance(x1,y1,x2,y2)
{
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

/**
 * スプライト同士の衝突判定を行います
 * @param {*} splite1 
 * @param {*} splite2 
 */
function IsHitSplite(splite1,splite2)
{
    const horizontal = (splite2.x < splite1.x + splite1.width) && (splite1.x < splite2.x + splite2.width);
    const vertical = (splite2.y < splite1.y + splite1.height) && (splite1.y < splite2.y + splite2.height);

    return (horizontal && vertical);
}

/**
 * 指定した値から値までの整数をランダムに返します
 * 
 * @param {*} max 
 * @param {*} min 
 * @returns 
 */
function getRandomInt(max,min=0) 
{
    return Math.floor(Math.random() * max-1-min)+min;
}

/**
 * 指定した値分の１の確率で抽選を行います
 * @param {Number} denom 分母
 * @return {Boolean} 当選したかどうか
 */
function isLottery(denom) 
{
    return getRandomInt(denom)==0;
}

/**
 * 論理的画面サイズと実際の画面サイズの比率を取得します
*/
function getScreenRatio()
{
    return Number(app.renderer.width) / STAGE_WIDTH;
}

/**
 * 
 * @param {*} spliteName 
 * @returns 
 */
function GetSplite(spliteName)
{
    return app.stage.children.filter(splite => splite.Name == spliteName);;
}

/**
 * クリックした場所を取得します
 * @returns 座標情報(x,y)
 */
function GetClickPoint()
{
    let point = {};
    let ratio = getScreenRatio();
    point.x = app.renderer.plugins.interaction.eventData.data.global.x/ratio;
    point.y = app.renderer.plugins.interaction.eventData.data.global.y/ratio;
    return point;
    if(app.renderer.plugins.interaction.mouse.global.x<0)
    {
        point.x = app.renderer.plugins.interaction.eventData.data.global.x/ratio;
        point.y = app.renderer.plugins.interaction.eventData.data.global.y/ratio;
    }
    else
    {
        point.x = app.renderer.plugins.interaction.mouse.global.x/ratio;
        point.y = app.renderer.plugins.interaction.mouse.global.y/ratio;
    }
}


/**
 * ブラウザのウィンドウサイズが変更されたときの処理
 */
function onResize() 
{
    let width = $(window).width();
    let height = $(window).height();
    let ratioWidth = width / STAGE_WIDTH;
    let ratioHeight = height / STAGE_HEIGHT;
    let ratio =  Math.min(ratioWidth , ratioHeight);

    app.stage.scale.x = app.stage.scale.y = ratio;

    let resizeWidth = Math.ceil(STAGE_WIDTH * ratio);
    let resizeHeight = Math.ceil(STAGE_HEIGHT * ratio);
    app.renderer.resize(resizeWidth,resizeHeight);
}