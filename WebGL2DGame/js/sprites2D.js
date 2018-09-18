'use strict'




class Sprite2D{    
/**
 * Represents a Sprite
 * @constructor
 * @param {Image} image a texture for your sprite
 * @param {Number} width 
 * @param {Number} height 
 * @param {WebGLRenderingContext} glContext 
 */
    constructor(image,width, height,glContext){
        
        this.glContext = glContext;
        //set default components of sprite
        this.width = width;
        this.height = height;
        this.vertices = this.calculateSpriteVertices();
        this.translation = [0.0 , 0.0];
        this.rotationZAxis = [0.0, 1.0];
        this.scale = [1.0, 1.0];
        this.angleInRadians = 0;
        this.texturePositionBuffer = [
            0,0,
            0,1,
            1,1,
            1,0
        ];
        //Setup needed for webGL drawings
        let vertexShaderSrc = `
        attribute vec2 a_textureCoordinate;
        varying vec2 v_textureCoordinate;
        uniform vec2 translation;
        attribute vec2 a_position;
        uniform vec2 rotation_z_axis;
        uniform vec2 scale;
        void main() {
            vec2 scaledPosition = a_position * scale; 
            vec2 rotatedPosition_z = vec2(
                scaledPosition.x * rotation_z_axis.y + scaledPosition.y * rotation_z_axis.x,
                scaledPosition.y * rotation_z_axis.y - scaledPosition.x * rotation_z_axis.x);
            vec2 position2d =  translation + rotatedPosition_z;
            gl_Position = vec4(position2d,0,1);
            v_textureCoordinate = a_textureCoordinate;
        }`;
        let fragmentShaderSrc = `  
            precision mediump float;
            uniform sampler2D u_image;
            varying vec2 v_textureCoordinate;
            void main() {
                vec4 color = texture2D(u_image,v_textureCoordinate);
                float alpha = texture2D(u_image, v_textureCoordinate).a;
                gl_FragColor = color*alpha;
                if(gl_FragColor.a < 0.1)
                    discard;
             
            }
        `;
        let vertexShader = WebGlUtils.createShader(glContext,glContext.VERTEX_SHADER,vertexShaderSrc);
        let fragmentShader = WebGlUtils.createShader(glContext,glContext.FRAGMENT_SHADER,fragmentShaderSrc);
        this.shaderProgram = WebGlUtils.createProgram(glContext,vertexShader,fragmentShader); 
        this.positionAttribLocation = glContext.getAttribLocation(this.shaderProgram,'a_position');
        this.positionBuffer = glContext.createBuffer();    
        glContext.bindBuffer(glContext.ARRAY_BUFFER,this.positionBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER,new Float32Array(this.vertices),glContext.STATIC_DRAW);
        glContext.bindBuffer(glContext.ARRAY_BUFFER,null); //Unbind buffer to prevent errors
        this.translationLocation = glContext.getUniformLocation(this.shaderProgram,'translation');
        this.rotationZLocation = glContext.getUniformLocation(this.shaderProgram,'rotation_z_axis');
        this.scaleLocation = glContext.getUniformLocation(this.shaderProgram,'scale');
        this.textureCoordinateLocation = glContext.getAttribLocation(this.shaderProgram,'a_textureCoordinate');
        this.setImage(image);
        
        
 
    }
    //You need to set a image to render your sprite
    setImage(image){
            let glContext = this.glContext;
            this.image = image;
            
            function isPowerOf2(value) {
                return (value & (value - 1)) == 0;
            }
            
            
            
            this.textureCoordinateBuffer = glContext.createBuffer();
            glContext.bindBuffer(glContext.ARRAY_BUFFER,this.textureCoordinateBuffer);
            //map the texture along vertex (each texture-vertex vary from 0 to 1)
            glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(this.texturePositionBuffer),glContext.STATIC_DRAW);        
            let gl = glContext;
           // glContext.enableVertexAttribArray(this.textureCoordinateLocation);
           // glContext.vertexAttribPointer(this.textureCoordinateLocation,2,glContext.FLOAT,false,0,0);
            this.texture = glContext.createTexture();
            glContext.bindTexture(glContext.TEXTURE_2D, this.texture); 
            glContext.texImage2D(glContext.TEXTURE_2D, 0,  glContext.RGBA,  glContext.RGBA,  glContext.UNSIGNED_BYTE, this.image);
            //needed for rendering image independent of it's size
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            else{             
                glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
                glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
                //Use nearest neighbors strategy to fill sprites bigger or smaller than their textures
                glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.NEAREST);
                glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MAG_FILTER, glContext.NEAREST);
               

            }
            
            glContext.pixelStorei(glContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    }
    setTexturePositionBuffer(texturePositionBuffer){
        if(texturePositionBuffer instanceof Array){
            if(texturePositionBuffer.length != 8)
                throw new TypeError('setTexturePositionBuffer method expects a 8 number array','sprites2D.js');
            this.texturePositionBuffer = texturePositionBuffer;
            //Reset the texture using the new texturePositionBuffer
            this.setImage(this.image);
            
        }
        else throw new TypeError('setTexturePositionBuffer method expects an array','sprites2D.js');


    }
    setTranslation(translationArray){
        if(translationArray instanceof Array){
            if(translationArray.length != 2)
                throw new TypeError('setTranslation method expects an 2D array','sprites2D.js');
            
            
            this.translation = translationArray;
            
        }
        else throw new TypeError('setTranslation method expects an array','sprites2D.js');

    }
    getTranslation(translationArray){
        return this.translation;
    }
    setRotationZAxis(angle){ //In degrees
        
        this.angleInRadians = angle * Math.PI / 180;
        this.rotationZAxis[0] = Math.sin( this.angleInRadians);
        this.rotationZAxis[1] = Math.cos( this.angleInRadians);

    }
    setUniformScale(scale){
        this.scale[0] = scale;
        this.scale[1] = scale;
    }
    setScale(scaleArray){
        if(scaleArray instanceof Array){
            if(scaleArray.length != 2)
                throw new TypeError('setScale method expects an 2D array','sprites2D.js');       
            this.scale = scaleArray;
            
        }
        else throw new TypeError('setScale method expects an array','sprites2D.js');
    }
    calculateSpriteVertices(){
        return [
            -this.width/2,this.height/2,
            -this.width/2,-this.height/2,
            this.width/2,-this.height/2,
            this.width/2,this.height/2

        ];
    
    }
    //if your texture doesn't complete fill the sprite you can set an offset to adjust it
    isColiding(objectSprite,offset){
        if(objectSprite instanceof Sprite2D){
            let reduceSprite = offset? offset : 0;
            let thisSpritePositions = this.getPosition();
            let otherSpritePositions = objectSprite.getPosition();
            let isColiding = 0;
            otherSpritePositions.forEach(vertice => {
                if(vertice[0] - reduceSprite  >= thisSpritePositions[0][0]  && vertice[0]   <= thisSpritePositions[3][0] - reduceSprite
                    && vertice[1] <= thisSpritePositions[0][1] - reduceSprite 
                     && vertice[1]  >= thisSpritePositions[1][1] - reduceSprite
                    ){
                        isColiding = 1;
                }
            });
            return isColiding;
        }
        else throw new TypeError('isColiding method expects an sprite2D','sprites2D.js');

    }
    getPosition(){
        //Get real sprite position
        let vertices = [];
        for(let x = 0; x < this.vertices.length; x +=2){
            let points = vec2.fromValues(this.vertices[x],this.vertices[x+1]);
            let scale = vec2.fromValues(this.scale[0],this.scale[1]);
            vec2.mul(points,points,scale);
            vec2.rotate(points,points,[0,0],this.angleInRadians);
            vec2.add(points,points,this.translation);
            vertices.push(points);
        }
       return vertices;

    }
    
    draw(){
        this.glContext.useProgram(this.shaderProgram);

        //Texture buffer
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER,this.textureCoordinateBuffer);
        this.glContext.enableVertexAttribArray(this.textureCoordinateLocation);
        this.glContext.vertexAttribPointer(this.textureCoordinateLocation,2,this.glContext.FLOAT,false,0,0);
        this.glContext.bindTexture(this.glContext.TEXTURE_2D, this.texture);
        
        //Position buffer
        this.glContext.enableVertexAttribArray(this.positionAttribLocation);
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER,this.positionBuffer);
        this.glContext.vertexAttribPointer(this.positionAttribLocation,2,this.glContext.FLOAT,false,0,0);
        //Transformations uniforms
        this.glContext.uniform2fv(this.translationLocation, this.translation);
        this.glContext.uniform2fv(this.rotationZLocation,this.rotationZAxis);
        this.glContext.uniform2fv(this.scaleLocation,this.scale);
        this.glContext.drawArrays(this.glContext.TRIANGLE_FAN,0,4);
        //unbind buffers
        this.glContext.bindTexture(this.glContext.TEXTURE_2D, null); 
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER,null);
     
    }
    

}