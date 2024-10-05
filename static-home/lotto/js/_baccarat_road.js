/**
 * Created by cjh.
 */
var _COLOR_RED = '#FF0000',
    _COLOR_GREEN = '#00CC00',
    _COLOR_BLUE = '#0000FF',
    _COLOR_WHITE = '#FFFFFF',
    _COLOR_GRID = '#990033';
var _ROUND_PANEL_WIDTH = 511; //大圈圈面板宽度
var _ROUND_LR_PANEL_WIDTH = 256; //小圈圈面板宽度

var _SMALL_COMMON_PANEL_WIDTH = 892;
var _SMALL_COMMON_PANEL_HEIGHT = 137;

var _SMALL_AUTO_MOVE_TIME = 300;
var _SMALL_AUTO_MOVE_DISTANCE = -42;
var _SMALL_AUTO_MOVE_DISTANCE_MAX = -650;

var left_space = 0,
    r_row_max = 5,
    const_1_coefficient = 1,
    r_col_max = 42;

//大眼仔,下路,曱甴路专用
function commonGetResult(obj, col, row, n) {
    var result = 0;
    if (row == 0) { //1. 结果出现在第一行时
        if (obj[col - 1] == obj[col - n - 1]) result = 2; //判断是否平整来决定大眼仔的颜色,平整为红色
        else result = 1;
    } else { //2. 结果出现在第二行或者以下
        if (obj[col - n] >= obj[col]) result = 2; //有,有结果就红色
        else if (obj[col] - 1 > obj[col - n]) result = 2; //往前数N(n = 1)列当前行的上一行,没结果为直落,颜色为红色,反之蓝色
        else result = 1;
    }
    return result;
}

//大眼仔,下路,蟑螂路专用
function commonSetLocation(pre_result, result, col, row, arr, flag_turn_right, index, first_col) {
    var obj = {};
    if (pre_result == result) {
        if (row < r_row_max && !arr[row + 1][col] && !flag_turn_right) { //判断能否往下画圈圈
            arr[++row][col] = result; //对应放入结果
        } else { //不能向下时就往右偏移画圈圈
            flag_turn_right = true;
            arr[row][++col] = result;
        }
    } else {
        row = 0;
        flag_turn_right = false;
        if (index != 0) col = ++first_col;
        arr[row][col] = result;
    }
    obj.col = col, obj.row = row, obj.arr = arr, obj.flag_turn_right = flag_turn_right, obj.first_col = first_col;
    return obj;
}

//m - row, n - col
function init2DimensionArray(m, n) {
    var arr = new Array(); //先声明一维数组
    for (var k = 0; k < m; k++) {
        arr[k] = new Array(); //声明二维数组，每一个一维数组里面的一个元素都是一个数组；
        for (var j = 0; j < n; j++) {
            arr[k][j] = 0; //这里将变量初始化，统一初始化为0，后面在用所需的值覆盖里面的值
        }
    }
    return arr;
}

function drawCircle(ctx_circle, col, row, circleColor, circleText) {
    ctx_circle.fillStyle = circleColor;
    ctx_circle.beginPath();
    ctx_circle.arc(15.5 + col * 30, 15.5 + row * 30, 12, 0, Math.PI * 2, true);
    ctx_circle.fill();

    ctx_circle.font = "18px Verdana"; //18px Georgia
    ctx_circle.fillStyle = _COLOR_WHITE;
    ctx_circle.fillText(circleText, 10 + col * 30, 22 + row * 30);
    ctx_circle.closePath();
}

function drawCircleRect(ctx_circle, col, row, rectColor, bol) {
    var startX = bol > 0 ? 20 : 6;
    ctx_circle.fillStyle = rectColor;
    ctx_circle.fillRect(startX + col * 30, 21 + row * 30, 6, 6);
    ctx_circle.strokeStyle = _COLOR_WHITE;
    ctx_circle.strokeRect(startX - 0.5 + col * 30, 20.5 + row * 30, 6, 6);
    ctx_circle.closePath();
}

function drawBigRound(ctx_round, col, row, roundColor, roundText) {
    ctx_round.strokeStyle = roundColor;
    ctx_round.lineWidth = 1.5;
    ctx_round.beginPath();
    ctx_round.arc(left_space + 8.5 + col * 15, 8 + row * 15, 6.5, 0, Math.PI * 2, true);
    ctx_round.stroke();

    ctx_round.font = "12px Arial"; //18px Georgia
    ctx_round.fillStyle = roundColor; //#000
    ctx_round.fillText(roundText, left_space + 4.7 + col * 15, 13 + row * 15);
    ctx_round.closePath();
}

function drawRoundRect(ctx_round, col, row, rectColor, bol) {
    var startX = bol > 0 ? left_space + 11 : left_space + 3;
    ctx_round.strokeStyle = _COLOR_WHITE;
    ctx_round.strokeRect(startX + col * 15, 3 + row * 15, 3.5, 3.5);
    ctx_round.fillStyle = rectColor;
    ctx_round.fillRect(startX + 0.5 + col * 15, 3 + row * 15, 3, 3);
    ctx_round.closePath();
}

function drawRoundGreenRect(ctx_round, col, row) {
    var startX = left_space + 2.5;
    //	ctx_round.strokeStyle = _COLOR_WHITE;
    //	ctx_round.strokeRect(startX + col * 15, 10.5 + row * 15, 10.5, 3.5);
    ////	ctx_round.fillStyle = _COLOR_WHITE;
    ////	ctx_round.fillRect(startX - 0.5 + col * 15, 9.5 + row * 15, 12, 5);
    ctx_round.fillStyle = _COLOR_GREEN;
    //	ctx_round.fillRect(startX + 0.5 + col * 15, 11 + row * 15, 10.5, 2.5);
    ctx_round.fillRect(startX + col * 15, 13.3 + row * 15, 12, 2);
    ctx_round.closePath();
}

function drawSmallRound(context, col, row, roundColor) {
    context.strokeStyle = roundColor;
    context.lineWidth = 1.005;
    context.beginPath();
    context.arc(4.5 + col * 7.5, 4.5 + row * 7.5, 2.65, 0, Math.PI * 2, true);
    context.stroke();
    context.closePath();
}

function drawSmallCircle(context, col, row, roundColor) {
    context.fillStyle = roundColor;
    context.beginPath();
    context.arc(4.5 + col * 7.5, 4 + row * 7.5, 3, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
}

function drawCircleGrid(ctx_circle) {
    var grid_cols = 11,
        grid_rows = 6,
        grid_width = 30,
        rect_width = 330,
        rect_height = 180;
    ctx_circle.strokeStyle = _COLOR_GRID; // 格子颜色
    ctx_circle.beginPath(); // 开始边框描绘
    for (var row = 0; row <= grid_cols; row++) { // 画竖线
        var x = 0.5 + row * grid_width;
        ctx_circle.moveTo(x, 0);
        ctx_circle.lineTo(x, rect_height);
    }
    for (var col = 0; col <= grid_rows; col++) { // 画横线
        var y = 0.5 + col * grid_width;
        ctx_circle.moveTo(0, y);
        ctx_circle.lineTo(rect_width + 1, y);
    }
    ctx_circle.stroke();
    ctx_circle.closePath();
}

function drawRoundGrid(ctx_round) {
    left_space = 1.5;
    var grid_cols = 42,
        grid_rows = 6,
        grid_width = 15,
        rect_width = grid_cols * grid_width,
        rect_height = 91; //34~66
    ctx_round.strokeStyle = _COLOR_GRID; // 格子颜色
    ctx_round.beginPath(); // 开始边框描绘
    for (var row = 0; row <= grid_cols; row++) { // 画竖线
        var x = left_space + row * grid_width;
        ctx_round.moveTo(x, 0);
        ctx_round.lineTo(x, rect_height);
    }
    for (var col = 0; col <= grid_rows; col++) { // 画横线
        var y = 0.5 + col * grid_width;
        ctx_round.moveTo(left_space, y);
        ctx_round.lineTo(rect_width + left_space - 1, y);
    }
    ctx_round.stroke();
    ctx_round.closePath();
}

function drawRoundButtomGrid(context) {
    left_space = 0.5;
    var grid_cols = 21,
        grid_rows = 6,
        grid_width = 15,
        rect_width = grid_cols * grid_width,
        rect_height = 91; //17
    context.strokeStyle = _COLOR_GRID; // 格子颜色
    context.beginPath(); // 开始边框描绘
    for (var row = 0; row <= grid_cols; row++) { // 画竖线
        var x = left_space + row * grid_width;
        context.moveTo(x, 0);
        context.lineTo(x, rect_height);
    }
    for (var col = 0; col <= grid_rows; col++) { // 画横线
        var y = 0.5 + col * grid_width;
        context.moveTo(left_space, y);
        context.lineTo(rect_width + left_space - 1, y);
    }
    context.stroke();
    context.closePath();
}