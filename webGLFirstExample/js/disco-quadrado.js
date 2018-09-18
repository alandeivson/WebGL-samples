
function initializeCanvasExercise2(){
        let isShowingLines = 0;        
        
        let canvas = document.getElementById('canvas-exercise-2');
       
        let gl = canvas.getContext('experimental-webgl');
        let squareVertices = [-0.5,-0.5,0,
                              -0.4,-0.4,0,
                               0.5,-0.5,0,
                               0.4,-0.4,0,
                               0.5, 0.9,0,
                               0.4,0.8,0,
                               -0.5,0.9,0,
                               -0.4,0.8,0,
                               -0.5,-0.5,0,
                               -0.4,-0.4, 0,
                                ];
        squareVertices.numberOfElements = squareVertices.length/3;
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
        let colors = gl.getUniformLocation(shaderProgram,'color');
        //let projectionLoc = gl.getUniformLocation(shaderProgram,'projectionMatrix');
        gl.uniform4fv(colors,[1,0,0,1]);
        gl.drawArrays(gl.LINE_LOOP, 0, squareVertices.numberOfElements);
        gl.uniform4fv(colors,[0,0,1,1]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertices.numberOfElements);
            
            
            /*raiseZIndex(squareVertices);
            gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices),gl.STATIC_DRAW);
            coordinates = gl.getAttribLocation(shaderProgram,'coordinates');
            gl.vertexAttribPointer(coordinates,3,gl.FLOAT,false,0,0);
            gl.enableVertexAttribArray(coordinates); 
            gl.uniform4fv(colors,[1,0,0,1]);
            gl.drawArrays(gl.LINE_LOOP, 0, squareVertices.numberOfElements);*/
        document.addEventListener('keydown',function(){
                if(event.key == 'c'){
                initCanvas('canvas-exercise-2');   
                isShowingLines = !isShowingLines;
                if(isShowingLines){
                    gl.uniform4fv(colors,[1,0,0,1]);
                    gl.drawArrays(gl.LINE_LOOP, 0, squareVertices.numberOfElements);
                }
                gl.uniform4fv(colors,[0,0,1,1]);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertices.numberOfElements);
                 
                }
       });
        
    
        
}

function raiseZIndex(vertices){
    vertices.forEach(function(element,index){
        if((index - 2) % 3 == 0){
            vertices[index] = 0.5;
        }
    });
}
