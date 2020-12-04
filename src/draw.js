import Layout from './layout'

function angleToRadian(angle) {
    return angle * Math.PI / 180
}

export default class Drawing {
    constructor(width,height,root){
        // 画布
        this.width = width;
        this.height = height;
        this.root = document.getElementById(root);
        this.layouts = {};
    }
    createDrawing() {
        // 创建一个画板，并将其作为根元素
        const bottomLayer = document.createElement('div');
        bottomLayer.style.margin = '50px auto';
        bottomLayer.style.position = 'relative';
        bottomLayer.style.width = this.width + 'px';
        bottomLayer.style.height = this.height + 'px';
        this.root.appendChild(bottomLayer);
        // 更改根元素
        this.root = bottomLayer;
    }
    drawBg(id, needReseau) {
        const layout = new Layout(id, this.width, this.height, this.root);
        const ctx = layout.ctx;
        // 绘制一个背景
        ctx.fillStyle = '#F6F6F6';
        ctx.fillRect(0,0,1000,1000);
        needReseau && drawReseau(layout);
    }
    drawReseau(layout) {
        const spacing = 10;
        const horizontal = this.width - spacing;
        const vertical = this.height - spacing;
        const ctx = layout.ctx;
        // 绘制网格
        ctx.lineWidth = 0.5;
        ctx.fillStyle = '#F2F2F2';
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
        const layout = this.layouts[id];
        layout.angle = angle;
        layout.xv = parseFloat(parseFloat(v * Math.cos(angleToRadian(layout.angle))).toFixed(2));
        layout.yv = parseFloat(parseFloat(v * Math.sin(angleToRadian(layout.angle))).toFixed(2));
    }
    updateBallPosition(id) {
        // 根据角度大小重新计算 x 与 y
        const layout = this.layouts[id];
        // 这里重新计算了 layout 的 angle
        layout.draw.x += layout.xv;
        layout.draw.y += layout.yv;
        this.watchRebound(layout)
        layout.clearCurrentLayout();
        this.drawBall(id)
    }
    watchRebound(layout) {
        this.watchLeftBound(layout);
        this.watchRightBound(layout);
        this.watchTopBound(layout);
        this.watchBottomBound(layout);
    }

    watchLeftBound(layout) {
        // 检查是否与左边框相撞
        if(layout.draw.x - layout.draw.r <= 0){
            layout.xv = -layout.xv;
        }
    }
    watchRightBound(layout) {
        // 检查是否与右边框相撞
        if(layout.draw.x + layout.draw.r >= this.width){
            layout.xv = -layout.xv;
        }
    }
    watchTopBound(layout) {
        // 检查是否与上边框相撞
        if(layout.draw.y - layout.draw.r <= 0){
            layout.yv = -layout.yv;
        }
    }
    watchBottomBound(layout) {
        // 检查是否与下边框相撞
        if(layout.draw.y + layout.draw.r >= this.height){
            layout.yv = -layout.yv;
        }
    }
    startAnimation() {
        const step = (timestamp) => {
            Object.keys(this.layouts).forEach(id => {
                this.updateBallPosition(id)
            })
            window.requestAnimationFrame(step)
        }
        window.requestAnimationFrame(step)
    }
}