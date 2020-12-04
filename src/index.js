import Drawing from './draw'
function run() {
    // 又原本第二象限作为第一象限，画板由左上角为顶点，y 轴向下为正方向
    const drawing = new Drawing(1000, 1000, 'app');
    drawing.createDrawing();
    drawing.drawBg('bg', false)
    // 第一个球
    drawing.createBall({
        id: 'ball1',
        x: 100,
        y: 100,
        r: 30,
        fillColor: '#FF9F9F',
        strokeColor:'#FF5D5D'
    });
    drawing.launchBall('ball1', 10, 10);
    
    // 第二个球
    drawing.createBall({
        id: 'ball2',
        x: 200,
        y: 200,
        r: 35,
        fillColor: '#A3FF84',
        strokeColor:'#6DFF3C'
    });
    drawing.launchBall('ball2', 15, 20);

    // 第三个球
    drawing.createBall({
        id: 'ball3',
        x: 300,
        y: 300,
        r: 40,
        fillColor: '#7ADFFF',
        strokeColor:'#28CBFF'
    });
    drawing.launchBall('ball3', 20, 30);

    // 第四个球
    drawing.createBall({
        id: 'ball4',
        x: 400,
        y: 400,
        r: 45,
        fillColor: '#F6A5FF',
        strokeColor:'#ED50FF'
    });
    drawing.launchBall('ball4', 25, 40);

    // 第五个球
    drawing.createBall({
        id: 'ball5',
        x: 500,
        y: 50,
        r: 50,
        fillColor: '#B7A6FF',
        strokeColor:'#7E60FF'
    });
    drawing.launchBall('ball5', 30, 50);

    drawing.startAnimation();
}
run();