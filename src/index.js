import Drawing from './draw'

// TODO: 需要一个小球创建器，解放手动创建小球

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
    drawing.launchBall('ball1', 5, 100);
    
    // 第二个球
    drawing.createBall({
        id: 'ball2',
        x: 200,
        y: 200,
        r: 35,
        fillColor: '#A3FF84',
        strokeColor:'#6DFF3C'
    });
    drawing.launchBall('ball2', 6, 200);

    // 第三个球
    drawing.createBall({
        id: 'ball3',
        x: 300,
        y: 300,
        r: 40,
        fillColor: '#7ADFFF',
        strokeColor:'#28CBFF'
    });
    drawing.launchBall('ball3', 7, 30);

    // 第四个球
    drawing.createBall({
        id: 'ball4',
        x: 400,
        y: 400,
        r: 45,
        fillColor: '#F6A5FF',
        strokeColor:'#ED50FF'
    });
    drawing.launchBall('ball4', 8, 40);

    // 第五个球
    drawing.createBall({
        id: 'ball5',
        x: 500,
        y: 50,
        r: 50,
        fillColor: '#B7A6FF',
        strokeColor:'#7E60FF'
    });
    drawing.launchBall('ball5', 9, 50);

    // 第六个球
    drawing.createBall({
        id: 'ball6',
        x: 600,
        y: 600,
        r: 30,
        fillColor: '#FF9F9F',
        strokeColor:'#FF5D5D'
    });
    drawing.launchBall('ball6', 10, 60);

    // 第七个球
    drawing.createBall({
        id: 'ball7',
        x: 700,
        y: 700,
        r: 35,
        fillColor: '#A3FF84',
        strokeColor:'#6DFF3C'
    });
    drawing.launchBall('ball7', 11, 70);

    // 第八个球
    drawing.createBall({
        id: 'ball8',
        x: 800,
        y: 800,
        r: 35,
        fillColor: '#A3FF84',
        strokeColor:'#6DFF3C'
    });
    drawing.launchBall('ball8', 12, 80);

    // 第九个球
    drawing.createBall({
        id: 'ball9',
        x: 900,
        y: 900,
        r: 40,
        fillColor: '#7ADFFF',
        strokeColor:'#28CBFF'
    });
    drawing.launchBall('ball9', 13, 90);

    drawing.startAnimation();
}
run();