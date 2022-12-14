"use strict";

var canvas;
var gl;

var points = [];
var colors = [];
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;	//表示绕什么轴旋转
var theta = [0, 0, 0];
var thetaLoc;
//平移
var scale = [1, 1, 1];
var scaleLoc;


window.onload = function initCube() {
    canvas = document.getElementById("rtcb-canvas");


    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    makeCube();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    // load shaders and initialize attribute buffer
    var program = initShaders(gl, "rtvshader", "rtfshader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
	
    thetaLoc = gl.getUniformLocation(program, "theta");
	
    gl.uniform3fv(thetaLoc, theta);
	
	//绕什么轴旋转
	document.getElementById("xbutton").onclick = function () {
	    axis = xAxis;
	}
	
	document.getElementById("ybutton").onclick = function () {
	    axis = yAxis;
	}
	
	document.getElementById("zbutton").onclick = function () {
	    axis = zAxis;
	}
	
	//缩放
	scaleLoc = gl.getUniformLocation(program,"scale");
	gl.uniform3fv(scaleLoc,scale);
	
    document.getElementById("XX").onchange = function (event) {
        scale[0] = event.target.value;
    }

    document.getElementById("YY").onclick = function () {
        scale[0] = event.target.value;
    }

    document.getElementById("ZZ").onclick = function () {
        scale[0] = event.target.value;
    }

    render();
}

function makeCube() {
	//立方体的顶点
    var vertices = [
        glMatrix.vec4.fromValues(-0.5, -0.5, 0.5, 1.0),
        glMatrix.vec4.fromValues(-0.5, 0.5, 0.5, 1.0),
        glMatrix.vec4.fromValues(0.5, 0.5, 0.5, 1.0),
        glMatrix.vec4.fromValues(0.5, -0.5, 0.5, 1.0),
        glMatrix.vec4.fromValues(-0.5, -0.5, -0.5, 1.0),
        glMatrix.vec4.fromValues(-0.5, 0.5, -0.5, 1.0),
        glMatrix.vec4.fromValues(0.5, 0.5, -0.5, 1.0),
        glMatrix.vec4.fromValues(0.5, -0.5, -0.5, 1.0),
    ];
	//颜色
    var vertexColors = [
        glMatrix.vec4.fromValues(0.0, 0.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 1.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 1.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 0.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 0.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 1.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 1.0, 1.0, 1.0)
    ];
	//六个面（由顶点序列定义）
    var faces = [
        1, 0, 3, 1, 3, 2, //正；每一面两个三角形；按照逆时针排列
        2, 3, 7, 2, 7, 6, //右
        3, 0, 4, 3, 4, 7, //底
        6, 5, 1, 6, 1, 2, //顶
        4, 5, 6, 4, 6, 7, //背
        5, 4, 0, 5, 0, 1  //左
    ];

    for (var i = 0; i < faces.length; i++) {
        points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);

        colors.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
    }
}
//绘制立方体
function render() {
	//清除缓存和深度
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	//控制旋转
    theta[axis] += 0.05;//速度
	//获取顶点着色器中的位置
    gl.uniform3fv(thetaLoc, theta);
	gl.uniform3fv(scaleLoc, scale);//
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);
    requestAnimFrame(render);
}