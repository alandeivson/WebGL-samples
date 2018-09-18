function initializeCanvasExercise1(){
    const screenSizeHorizontal = 1;
    const screenSizeVertical = 1;
    const squareSize = 0.4;
    const offSet = 0.3 + squareSize*2;
  
    drawSquare( -1  + squareSize/2  , 1  - squareSize/2 ,squareSize,[0,0,0,1]); //black
    drawSquare(0  , 1  - squareSize/2 ,squareSize,[1,0,0,1]); //red
    drawSquare( 1 - squareSize/2  , 1  - squareSize/2 ,squareSize,[0,1,0,1]); //green
    drawSquare( -1  + squareSize/2  ,  0 ,squareSize,[0,0,1,1]); //blue
    drawSquare(0  , 0 ,squareSize,[1,1,0,1]); //yellow
    drawSquare(1 - squareSize/2   , 0 ,squareSize,[1,0,1,1]); //magenta
    drawSquare(-1  + squareSize/2  ,  squareSize/2 - 1 ,squareSize,[0,1,1,1]); //cyan
    drawSquare(0  , squareSize/2 - 1 ,squareSize,[0.6,0.6,0.6,1]); //gray
    drawSquare(1 - squareSize/2   , squareSize/2 - 1 ,squareSize,[1,1,1,1]); //white
    
    
    
    
    function drawSquare(x , y , size, color ){  
      function calculateVerticesForASquareTriangleFan(x,y,size){//x, y specifies the square center (NDC coordinate system)
        return [x - size/2 , y - size/2 , 0.0,//First point 
                x + size/2 , y - size/2 ,0.0,//Second point
                x + size/2 , y + size/2 ,0.0,//Third point
                x - size/2 , y + size/2 ,0.0,//Fourth point
                ];
      }
      let canvas = document.getElementById('canvas-exercise-1');
      let gl = canvas.getContext('experimental-webgl');
      let squareVertices = calculateVerticesForASquareTriangleFan(x,y,size);
      let vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices),gl.STATIC_DRAW);
      let vertexShaderCode =
      `
  
      attribute vec3 coordinates;
  
      void main(void) { 
          gl_Position = vec4(coordinates, 1);
      }`;
      let vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader,vertexShaderCode);
      gl.compileShader(vertexShader);
      let squareColor = [0.5,0.0,0.0,1];
    //  let colorBuffer = gl.createBuffer();
     // gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
     // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareColor),gl.STATIC_DRAW);
      let fragmentShaderCode = 
      `
      uniform mediump vec4 color;
      void main(void) {
          gl_FragColor = color ;
      }`;
      let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader,fragmentShaderCode);
      gl.compileShader(fragmentShader);
      let shaderProgram = gl.createProgram(); 
      gl.attachShader(shaderProgram,vertexShader);
      gl.attachShader(shaderProgram,fragmentShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
      let coordinates = gl.getAttribLocation(shaderProgram,'coordinates');
      gl.vertexAttribPointer(coordinates,3,gl.FLOAT,false,0,0);
      gl.enableVertexAttribArray(coordinates); 
      //gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
      let colors = gl.getUniformLocation(shaderProgram,'color');
      gl.uniform4fv(colors,color);
      //gl.vertexAttribPointer(colors,4,gl.FLOAT,false,0,0);
      //gl.enableVertexAttribArray(colors);
      
    
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
  }
  
  

  