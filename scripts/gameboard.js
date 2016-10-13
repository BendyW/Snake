var gameboard = {} || gameboard;
gameboard.drawGame = drawGame;

function startGame(){

}

function drawGame(){
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(100,150);
    ctx.lineTo(450,50);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
}
