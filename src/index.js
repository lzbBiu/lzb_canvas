// 定义最外层边框大小
class Drawing{
    constructor(w,h,root){
        // 画布
        this.width = w;
        this.height = h;
        this.root = document.getElementById(root);
        this.animationId = 0;
        this.layouts = {};
        this.createDrawing();
        this.createReseau('reseau');
    }
    createDrawing() {
        // 创建一个画板，并将其作为根元素
        const bottomLayer = document.createElement('div');
        bottomLayer.style.margin = '10px auto';
        bottomLayer.style.position = 'relative';
        bottomLayer.style.width = this.width + 'px';
        bottomLayer.style.height = this.height + 'px';
        this.root.appendChild(bottomLayer);
        // 更改根元素
        this.root = bottomLayer;
    }
    createReseau(id) {
        const spacing = 10;
        const horizontal = this.width - spacing;
        const vertical = this.height - spacing;
        const layout = new Layout(id, this.width, this.height, this.root);
        const ctx = layout.ctx;
        console.log(ctx)
        // 先绘制一个背景
        ctx.fillStyle = '#F6F6F6';
        ctx.fillRect(0,0,1000,1000);
        // 再绘制网格
        ctx.lineWidth = 0.5;
        ctx.fillStyle = '#F2F2F2';
        // 先绘制横向，每隔 2px 绘制一条线
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
    createBall(ball) {
        const id = ball.id;
        const layout = new Layout(id, this.width, this.height, this.root);
        layout.draw = ball;
        this.layouts[id] = layout;
        this.drawBall(id);
        return layout;
    }
    drawBall(id) {
        const layout = this.layouts[id];
        const ctx = layout.ctx;
        ctx.fillStyle = layout.draw.fillColor;
        ctx.beginPath();
        ctx.arc(layout.draw.x, layout.draw.y, layout.draw.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = layout.draw.fillColor;
        ctx.stroke();
    }
    launchBall(id, v, angle) {
        this.layouts[id].angle = angle;
        this.layouts[id].v = v;
    }
    updateBallPosition(id) {
        // 根据角度大小重新计算 x 与 y
        const layout = this.layouts[id];
        layout.draw.x = layout.v * Math.cos(layout.angle / 180 * Math.PI) + layout.draw.x;
        layout.draw.y = layout.v * Math.sin(layout.angle / 180 * Math.PI) + layout.draw.y;
        this.watchRebound(id)
        layout.clearCurrentLayout();
        this.drawBall(id)
    }
    watchRebound(id) {
        const layout = this.layouts[id];
        // 根据 x 与 y 判断相装的墙体
    }
    startAnimation() {
        this.animationId = setInterval(()=>{
            Object.keys(this.layouts).forEach(id => {
                this.updateBallPosition(id)
            })
        },16)
    }
}

class Layout{
    constructor(id, w, h, root){
        this.id = id;
        this.w = w;
        this.h = h;
        this.draw = null;
        this.dom = null;
        this.ctx = null;
        this.root = root;
        this.createLayout()
    }
    createLayout() {
        this.dom = document.createElement('canvas');
        this.dom.id = this.id;
        this.dom.width = this.w;
        this.dom.height = this.h;
        
        this.dom.style.position = 'absolute';
        this.dom.style.width = this.w + 'px';
        this.dom.style.height = this.h + 'px';

        this.ctx = this.dom.getContext('2d');
        
        this.root.appendChild(this.dom);
        return this;
    }
    clearCurrentLayout() {
        this.ctx.clearRect(0,0,this.w,this.h);
        return this;
    }
}

function run() {
    const drawing = new Drawing(1000, 1000, 'app');
    drawing.createBall({
        id: 'ball1',
        x: 100,
        y: 100,
        r: 100,
        fillColor: '#FF9F9F',
        strokeColor:'#FF5D5D'
    });
    drawing.launchBall('ball1', 10, 30);
    // drawing.startAnimation();
}
run();