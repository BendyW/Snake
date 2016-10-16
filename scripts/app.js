var speed = 1;
var score = 0;
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var gridHeight = 24;
var gridWidth = 30;

window.onload = function(event){
    snake.init();
    food.makeFood();
    var button = document.getElementsByTagName('button')[0];
        button.addEventListener('click', realTime);
        document.addEventListener('keydown', function(event){
            switch(event.which) {
                case 37: //left
                    snake.changeDirection('left');
                    break;
                case 38: //up
                    snake.changeDirection('up');
                    break;
                case 39: //right
                    snake.changeDirection('right');
                    break;
                case 40: //down
                    snake.changeDirection('down');
                    break;
            }
        });
};



 function draw() {
     ctx.clearRect(0,0, canvas.width, canvas.height);
     snake.drawSnake();
     food.drawFoods();
 }


var snake = {
    body: [],
    direction: '',

    SnakeSeg: function (_x, _y) {
        return {
            x: _x,
            y: _y
        }
    },
    grow: function (size) {
        for(var i =0; i<size; i++) {
            this.body.push(new this.SnakeSeg());
        }
    },
    removeLastSeg: function(){
        this.body.pop();
    },
    move: function () {
        var first = this.body[0];
        switch(this.direction){
            case 'right':
                snake.body.unshift(new this.SnakeSeg(first.x+speed,first.y));
                this.removeLastSeg();
                break;
            case 'left':
                snake.body.unshift(new this.SnakeSeg(first.x-speed,first.y));
                this.removeLastSeg();
                break;
            case 'up':
                snake.body.unshift(new this.SnakeSeg(first.x,first.y-speed));
                this.removeLastSeg();
                break;
            case 'down':
                snake.body.unshift(new this.SnakeSeg(first.x,first.y+speed));
                this.removeLastSeg();
                break;
        }
    },
    changeDirection: function(newDirection){
        switch(this.direction){
            case 'right':
                if(newDirection === 'left')
                    return;
                break;
            case 'left':
                if(newDirection === 'right')
                    return;
                break;
            case 'up':
                if(newDirection === 'down')
                    return;
                break;
            case 'down':
                if(newDirection === 'up')
                    return;
                break;
        }
      this.direction = newDirection;
    },
    init: function(){
        this.body.push(new this.SnakeSeg(2,2));
    },
    drawSegment: function(element, index, array){
        ctx.beginPath();
        ctx.rect((element.x-1)*20, (element.y-1)*20, 19, 19);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    },
    drawSnake: function(){
        this.body.forEach(this.drawSegment);
    },
    collideSelf: function(){
        for(var i = 1; i< snake.body.length; i++){
            if(snake.body[i].x === this.body[0].x && snake.body[i].y === this.body[0].y){
                document.location.reload();
            }
        }
    },
    wallCollision: function(){
        if(this.body[0].x <= 0 || this.body[0].x > 30 ||
            this.body[0].y <= 0 || this.body[0].y > 24){
            //snake.body = [];
            document.location.reload();
        }
    }
};

var food = {
    foods: [],

    FoodItem: function(_x,_y, _type){
        return{
            x: _x,
            y: _y,
            type: _type
        }
    },
    makeFood: function(){
        this.foods.push(new this.FoodItem(this.callFoodLocationX(),this.callFoodLocationY(), this.type()));
    },
    type: function(){
        return Math.ceil(Math.random()* 4);
    },
    callFoodLocationX: function(){
    return (Math.ceil(Math.random() * (canvas.width/20)));
    },
    callFoodLocationY: function(){
        return (Math.ceil(Math.random() * (canvas.height/20)));
    },
    drawFoods: function(){
        this.foods.forEach(this.drawSegment);
    },
    foodRed: function(){

    },
    drawSegment: function(element, index, array){
        ctx.beginPath();
        ctx.rect((element.x-1)*20, (element.y-1)*20, 19, 19);
        switch(element.type){
            case 1:
                ctx.fillStyle='yellow';
                break;
            case 2:
                ctx.fillStyle='red';
                break;
            case 3:
                ctx.fillStyle='green';
                break;
            case 4:
                ctx.fillStyle='pink';

        }
        ctx.fill();
        ctx.closePath();
    },
    checkCollision: function(){
        this.foods.forEach(this.isCollided);
    },
    isCollided: function(element,index,array){
        if(element !== undefined) {
            if (snake.body[0].x === element.x && snake.body[0].y === element.y) {
                switch(element.type){
                    case 2:
                        food.foodRed();
                }
                food.foods.pop();
                food.makeFood();
                snake.grow(3);
            }
        }
    }
};

var frameCounter = 0;
var moveOnFrameCount = 6;
function realTime() {
    if (frameCounter >= moveOnFrameCount) {
        frameCounter = 0;
        snake.move();
        snake.collideSelf();
        food.checkCollision();
        snake.wallCollision();
    } else {
        frameCounter++;
    }
    draw();
    window.requestAnimationFrame(realTime);
}

































//     drawSnake: function(){
//         snake.body[0].x += dx;
//         snake.body[0].y += dy;
//         for(var i = snake.body.length-1; i >0; i--){
//             snake.body[i].x = snake.body[i-1].x;
//             snake.body[i].y = snake.body[i-1].y;
//         }
//         snake.body.forEach(function(seg){
//             ctx.beginPath();
//             ctx.rect(seg.x, seg.y, 20, 20);
//             ctx.fillStyle = "#FFFFFF";
//             ctx.fill();
//             ctx.closePath();
//         });
//     },
//     foodCollision: function() {
//         if ((foodX < snake.body[0].x +20) &&
//             (foodX + 20 > snake.body[0].x) &&
//             (foodY < snake.body[0].y + 20) &&
//             (foodY + 20 > snake.body[0].y)){
//             foodX = callFoodLocationX();
//             foodY = callFoodLocationY();
//             console.log(foodX+ '    y:' + foodY);
//             this.increase(snake.body[snake.body.length - 1].x, snake.body[snake.body.length - 1].y);
//             score++;
//         }
//     },
//     wallCollision: function(){
//         if(snake.body[0].x +20 > canvas.width || snake.body[0].x < 0){
//             dx = -dx;
//             lose();
//         }else if( snake.body[0].y +20 > canvas.height || snake.body[0].y < 0){
//             dy = -dy;
//             lose();
//         }
//     }
// };

//
// function callFoodLocationX(){
//     return (Math.floor(Math.random() * (canvas.width/20))) *20;
// }
// function callFoodLocationY(){
//     return (Math.floor(Math.random() * (canvas.height/20))) * 20;
// }
// function drawFood(randx, randy){
//     if(foodX === undefined){
//         foodX = callFoodLocationX();
//         foodY = callFoodLocationY();
//     }
//     ctx.beginPath();
//     ctx.rect(randx, randy, 20, 20);
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fill();
//     ctx.closePath();
// }
// function lose(){
//     var msg = "GAME OVER!!!" ;
//     ctx.fillStyle = "white";
//     ctx.font = "18px monospace";
//     ctx.fillText(msg, canvas.width/3 , canvas.height/2 );
//     snake.body = 0;
// }



