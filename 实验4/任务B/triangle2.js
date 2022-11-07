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
	var pointPos=[
		
	];
	var x=0;
	var y=0;
	var R=20;
	var yDegree=0;
	var rad = 3.1415926 / 30;                    
    var r;
	r=R*Math.sin(18*rad)/Math.cos(36*rad);    
    for (var  k = 0; k < 5; k++) {                     
        pointPos.push((x-(R*Math.cos((90+k*72+yDegree)*rad)))/100,(y-(R*Math.sin((90+k*72+yDegree)*rad)))/100); 
        pointPos.push((x-(r*Math.cos((90+36+k*72+yDegree)*rad)))/100,(y-(r*Math.sin((90+36+k*72+yDegree)*rad)))/100);
		pointPos.push(0,0);
    }	
	for(var i=0;i<5;i++){
		var k=i;
		if(i!=4){
			pointPos.push((x-(r*Math.cos((90+36+k*72+yDegree)*rad)))/100,(y-(r*Math.sin((90+36+k*72+yDegree)*rad)))/100);
			k=i+1;
			pointPos.push((x-(R*Math.cos((90+k*72+yDegree)*rad)))/100,(y-(R*Math.sin((90+k*72+yDegree)*rad)))/100);    			
		}else{
			pointPos.push((x-(r*Math.cos((90+36+k*72+yDegree)*rad)))/100,(y-(r*Math.sin((90+36+k*72+yDegree)*rad)))/100);
			k=0;
			pointPos.push((x-(R*Math.cos((90+k*72+yDegree)*rad)))/100,(y-(R*Math.sin((90+k*72+yDegree)*rad)))/100);
					
		}
		pointPos.push(0,0);		
	}
	var pointColor=[
		
	];
	for(var i=0;i<30;i++){
		pointColor.push(1.0,1.0,0.0,1.0);
	}
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
	for(var i=0;i<30;i+=3){
		gl.drawArrays( gl.TRIANGLES, i, 3 );
	}
	
	// gl.drawArrays( gl.POINTS, 30, 1 );
	
	
	// gl.drawArrays( gl.TRIANGLE_FANS, 0, 6 );
}