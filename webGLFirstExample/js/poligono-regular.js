function initializeCanvasExercise3(){
    let verticesNumber = 5;
    let canvas = document.getElementById('canvas-exercise-3');
    let gl = canvas.getContext('experimental-webgl');
    let vertices = createVertices(verticesNumber);
    
    function createVertices(numberOfVertices){
        let vertices = [];
        for(let x = 0; x < numberOfVertices ; x++){
            vertices.push(0.75*Math.cos((x*Math.PI*2)/numberOfVertices));
            vertices.push(0.75*Math.sin((x*Math.PI*2)/numberOfVertices));
        
        }
        vertices.numberOfElements = vertices.length/2;
        return vertices;
    }

    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    let vertexShaderCode = `
    attribute vec2 coordinates;
    void main(void){
        gl_Position = vec4(coordinates,0,1);
    }  
    `;
    let fragmentShaderCode = 
    `
        void main(void) {
          gl_FragColor = vec4(1.0, 0, 0, 1) ;
        }`
        ;
        
    console.dir(vertices);
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexShaderCode);
    gl.compileShader(vertexShader);
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
    gl.vertexAttribPointer(coordinates,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(coordinates);
    gl.drawArrays(gl.LINE_LOOP, 0, vertices.numberOfElements);
    document.addEventListener('keydown',function(){
        if(event.key == '+'){
        initCanvas('canvas-exercise-3');
        let vertices = createVertices(++verticesNumber);
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.drawArrays(gl.LINE_LOOP, 0, vertices.numberOfElements);
         
        }
        if(event.key == '-' && verticesNumber > 2){
            initCanvas('canvas-exercise-3');
            let vertices = createVertices(--verticesNumber);
            gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
            gl.drawArrays(gl.LINE_LOOP, 0, vertices.numberOfElements);
             
            }
    });
}
