let canvas = null;
let ctx = null;
function run(){
    init();
    draw();
}
function init() {
    const app = document.getElementById('app');
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.style.width = '1000px';
    canvas.style.height = '1000px';
    canvas.width = 1000;
    canvas.height = 1000;
    app.appendChild(canvas);
}
function draw() {
    drawBg();
    drawReseau();
    drawBall();
}
function drawBg() {
    ctx.fillStyle = '#F6F6F6';
    ctx.fillRect(0,0,1000,1000);
}
function drawReseau() {
    const spacing = 10;
    const horizontal = canvas.width - spacing;
    const vertical = canvas.height - spacing;

    ctx.lineWidth = 0.5;
    ctx.fillStyle = '#F2F2F2';
    /*
        先绘制横向
        每隔 2px 绘制一条线
    */
   for(let i= spacing ; i<=horizontal; i = i + spacing){
       ctx.beginPath();
       ctx.moveTo(i,spacing);
       ctx.lineTo(i,vertical);
       ctx.stroke();
   }

    // 再绘制纵向
   for(let i=spacing; i <= vertical ; i = i + spacing){
        ctx.beginPath();
        ctx.moveTo(spacing,i);
        ctx.lineTo(horizontal, i);
        ctx.stroke();
    }
}
function drawBall() {
    const ball = {
        x: 100,
        y: 100,
        r: 100
    }
    ctx.fillStyle = '#FF9F9F';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#FF5D5D';
    ctx.stroke();
}


run();