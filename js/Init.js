const STAGE_WIDTH = 900;
const STAGE_HEIGHT = 1600;

const MOUSE = 0;
const LEFT = 1;
const UP = 2;
const RIGHT = 3;
const DOWN = 4;

let KEY_LIST = [];
KEY_LIST[MOUSE] = false;
KEY_LIST[LEFT] = false;
KEY_LIST[UP] = false;
KEY_LIST[RIGHT] = false;
KEY_LIST[DOWN] = false;

// Create our application instance
PIXI.TextMetrics.BASELINE_SYMBOL += "あ｜";
var app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x2c3e50
});