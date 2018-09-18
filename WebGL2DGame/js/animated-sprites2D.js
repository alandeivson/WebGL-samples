class AnimatedSprite2D extends Sprite2D{
    constructor(image,width, height,glContext){
        super(image,width, height,glContext);
    }
    //Takes a sprite's texture and number of textures. All images needs to be horizontal 
    setAnimatedTexture(numberOfImagesInTexture,transitionTime,revert){
        let image = this.image;
        let glContext = this.glContext;
        this.animationTime = transitionTime;
        let textureCoordinateArray = [];
        //map all images in texture
        for(let x = 0; x < numberOfImagesInTexture; x++ ){
            if(!revert){
                textureCoordinateArray.push([
                x/numberOfImagesInTexture , 0,
                x/numberOfImagesInTexture , 1,
                (x+1)/numberOfImagesInTexture , 1,
                (x+1)/numberOfImagesInTexture , 0
                ]);
            }
            else{
                textureCoordinateArray.push([
                    (x+1)/numberOfImagesInTexture , 0,
                    (x+1)/numberOfImagesInTexture , 1,
                    x/numberOfImagesInTexture , 1,
                    x/numberOfImagesInTexture , 0,
                    
                    
                    
                    ]);

            }
        }
        console.log(textureCoordinateArray);
        this.textureCoordinateBufferArray = [];
        textureCoordinateArray.forEach(textureCoordinate =>{
            let buffer = glContext.createBuffer();            
            glContext.bindBuffer(glContext.ARRAY_BUFFER,buffer);
            glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(textureCoordinate),glContext.STATIC_DRAW);        
            this.textureCoordinateBufferArray.push(buffer);
        });
        this.texture = glContext.createTexture();
        glContext.bindTexture(glContext.TEXTURE_2D, this.texture); 
        glContext.texImage2D(glContext.TEXTURE_2D, 0,  glContext.RGBA,  glContext.RGBA,  glContext.UNSIGNED_BYTE, this.image);
                   
            glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
            glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
            //Use nearest neighbors strategy to fill sprites bigger or smaller than their textures
            glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.NEAREST);
            glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MAG_FILTER, glContext.NEAREST);
       
        glContext.pixelStorei(glContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);





        function isPowerOf2(value) {
            return (value & (value - 1)) == 0;
        }
        this.lastTransitionTime = 0;
        this.animationState = 0;

    }
    draw(){
        
        this.glContext.useProgram(this.shaderProgram);
        if( Date.now() - this.lastTransitionTime > this.animationTime){
            this.animationState++;
            if(this.animationState >= this.textureCoordinateBufferArray.length)
                this.animationState = 0;
            this.lastTransitionTime = Date.now();
        }
        //Texture buffer            
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER,this.textureCoordinateBufferArray[this.animationState]);
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