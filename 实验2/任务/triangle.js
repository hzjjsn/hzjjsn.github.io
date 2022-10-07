"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	//位置和颜色信息
	const pointPos=[
		-0.32,-0.0, -0.02,0.4, -0.02,-0.4,
		0.32,0.0,  0.02,0.4,  0.02,-0.4,
		0.84,-0.02,  0.03,-0.42, 0.36,-0.02,
		-0.84,-0.02, -0.03,-0.42,-0.36,-0.02,
		-0.85,-0.04, -0.05,-0.44, -0.5,-0.44,
		0.85,-0.04, 0.05,-0.44, 0.5,-0.44,

		
		

		
		
		0.0,0.0,
		/*0.0, -1.0,
		 1.0, -1.0,
		 1.0,  1.0,
		 0.0, -1.0,
		 1.0,  1.0,
		 0.0,  1.0*/
		 /*-0.5, -0.5,
		 0.0, 0.5,
		 0.5, -0.5*/
	];
	const pointColor=[
		0.1, 0.99, 0.5, 1.0,
		0.1, 0.99, 0.5, 1.0,
		0.1, 0.99, 0.5, 1.0,
		
		0.1, 0.99, 0.5, 1.0,
		0.1, 0.99, 0.5, 1.0,
		0.1, 0.99, 0.5, 1.0,
		
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
		
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
		
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
		
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
	
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,
		0.8, 0.9, 0.2, 1.0,	
			
		
		0.0, 0.0, 0.0, 1.0,
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pointPos ), gl.STATIC_DRAW );
	
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pointColor ), gl.STATIC_DRAW );
	
	
	// Associate external shader variables with data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	var a_position = gl.getAttribLocation( program, "a_position" );
	gl.vertexAttribPointer(
	    a_position,
	    2,
	    gl.FLOAT,
	    false,
	    Float32Array.BYTES_PER_ELEMENT * 2,
	    0
	);
	// 这是将shader中的a_position与buffer绑定起来
	gl.enableVertexAttribArray(a_position);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	var a_color = gl.getAttribLocation( program, "a_color" );
	gl.vertexAttribPointer(
	    a_color,
	    4,
	    gl.FLOAT,
	    false,
	    Float32Array.BYTES_PER_ELEMENT * 4,
	    0
	);
	// 这是将shader中的a_color与colorBuffer绑定起来
	gl.enableVertexAttribArray(a_color);

	render();
}
function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	gl.drawArrays( gl.TRIANGLES, 3, 3 );
	gl.drawArrays( gl.TRIANGLES, 6, 3 );
	gl.drawArrays( gl.TRIANGLES, 9, 3 );
	gl.drawArrays( gl.TRIANGLES, 12, 3 );
	gl.drawArrays( gl.TRIANGLES, 15, 3 );
	gl.drawArrays( gl.TRIANGLES, 18, 3 );
	gl.drawArrays( gl.TRIANGLES, 21, 3 );
	gl.drawArrays( gl.TRIANGLES, 24, 3 );
	gl.drawArrays( gl.TRIANGLES, 27, 3 );
	// gl.drawArrays( gl.POINTS, 30, 1 );
	
	
	// gl.drawArrays( gl.TRIANGLE_FANS, 0, 6 );
}