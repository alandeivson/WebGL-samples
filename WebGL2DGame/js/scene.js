'use strict'
class Scene{

    static getSceneElementCounter(){
        if(!Scene.elementCounter)
            Scene.elementCounter = 0;
        return Scene.elementCounter++;
    }
    constructor(glContext){
        this.glContext = glContext;
        this.elements = [];
    }
    getElements(){
       return this.elements;
    }
    setElements(elements){
        if(element instanceof Array){

            if(!elements.some(function(element){ //Look is all elements implements draw
                !element.draw;
            })){
                elements.forEach(element =>
                    element.id = Scene.getSceneElementCounter()
                );
               this.elements = elements;
            }
            else
                throw new TypeError('setElements method expects an array of drawable elements','scene.js');
        }
        else
            throw new TypeError('setElements method expects an array','scene.js');

    }
    addElement(element){
        if(!!element.draw){
            element.id = Scene.getSceneElementCounter();
            this.elements.push(element);
        }
        else
            throw new TypeError('addElement method expects for a drawable element','scene.js');
    }
    removeElement(element){
        this.elements = this.elements.filter(elementOnElementArray =>
            elementOnElementArray.id != element.id
        );
    }
    static clearScreen(glContext){
        WebGlUtils.resize(glContext.canvas);
        glContext.viewport(0, 0, glContext.canvas.width, glContext.canvas.height);
        glContext.clear( glContext.COLOR_BUFFER_BIT  );
        glContext.clearColor(0, 0, 0, 1);

    }
    draw(){
        WebGlUtils.resize(this.glContext.canvas);
        this.glContext.viewport(0, 0, this.glContext.canvas.width, this.glContext.canvas.height);
        this.glContext.clear( this.glContext.COLOR_BUFFER_BIT  );
        this.glContext.enable(this.glContext.DEPTH_TEST);
        this.glContext.enable ( this.glContext.BLEND ) ;
        this.glContext.blendFunc(this.glContext.ONE, this.glContext.ONE_MINUS_SRC_ALPHA);
        this.glContext.clearColor(0, 0, 0, 1);
       
       

        //We need to draw from the last element to the first from elements array        
        for(let x = this.elements.length -1 ; x >= 0; x --){
            
            this.elements[x].draw();   
        }
        
    }


}