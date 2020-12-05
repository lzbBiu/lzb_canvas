import Layout from './layout'

function angleToRadian(angle) {
    return angle * Math.PI / 180
}

// TODO: 如果两个小球进入到彼此内部，需要更大的速度将两球冲开，否则两个球就会贴合在一起，不断交换速度，导致两球滚动，一旦冲开则恢复到之前的速度

// TODO: 将所有 canvas 渲染到离屏 canvas 上，最后同意绘制到一个 canvas 上展示

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
        this.drawBall(layout);
        return layout;
    }
    drawBall(layout) {
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
        this.angleToSpeed(layout, v, angle);
    }
    angleToSpeed(layout,v,angle){
        layout.vx = parseFloat(parseFloat(v * Math.cos(angleToRadian(layout.angle))).toFixed(2));
        layout.vy = parseFloat(parseFloat(v * Math.sin(angleToRadian(layout.angle))).toFixed(2));
    }
    updateBallPosition(layout) {
        // 这里重新计算了 layout 的 angle
        layout.draw.x += layout.vx;
        layout.draw.y += layout.vy;
        layout.clearCurrentLayout();
        this.drawBall(layout)
    }
    checkBounds(layout) {
        this.checkLeftBound(layout);
        this.checkRightBound(layout);
        this.checkTopBound(layout);
        this.checkBottomBound(layout);
    }

    checkLeftBound(layout) {
        // 检查是否与左边框相撞
        if(layout.draw.x - layout.draw.r <= 0){
            if(layout.vx < 0) {
                layout.vx = -layout.vx;
            }
        }
    }
    checkRightBound(layout) {
        // 检查是否与右边框相撞
        if(layout.draw.x + layout.draw.r >= this.width){
            if(layout.vx > 0) {
                layout.vx = -layout.vx;
            }
        }
    }
    checkTopBound(layout) {
        // 检查是否与上边框相撞
        if(layout.draw.y - layout.draw.r <= 0){
            if(layout.vy < 0){
                layout.vy = -layout.vy;
            }
        }
    }
    checkBottomBound(layout) {
        // 检查是否与下边框相撞
        if(layout.draw.y + layout.draw.r >= this.height){
            if(layout.vy > 0){
                layout.vy = -layout.vy;
            }
        }
    }
    watchBalls() {
        Object.values(this.layouts).forEach((layout,index) => {
            // 更新小球位置
            this.updateBallPosition(layout);
            // 判断小球之间是否相撞，如果相撞
            this.checkBall(layout,index);
            // 判断小球是否撞墙
            this.checkBounds(layout);
        })
    }
    checkBall(layout,index) {
        // 将当前 layout 与 index 后的 小球做对比
        Object.values(this.layouts).forEach((item,i)=>{
            // 从下一位开始计算
            if(i > index){
                if(Math.pow((layout.draw.x - item.draw.x), 2) + Math.pow((layout.draw.y - item.draw.y), 2) <= Math.pow((layout.draw.r + item.draw.r), 2)) {
                    this.ballsRebound(layout, item)
                }
            }
        })
    }
    ballsRebound(ballA,ballB) {
        const vx = ballA.vx;
        const vy = ballA.vy;

        ballA.vx = ballB.vx;
        ballB.vx = vx;

        ballA.vy = ballB.vy;
        ballB.vy = vy;

    }
    startAnimation() {
        const step = (timestamp) => {
            this.watchBalls();
            window.requestAnimationFrame(step)
        }
        window.requestAnimationFrame(step)
    }
}