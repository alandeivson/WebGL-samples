/**
 * Load all objects,add listeners and resources to the game
 * @returns {Promise} //A promise indicating the status of loading the game resources
 */
WebGLGame.GameSetup = {};



//@Todo use a 'loadResource' interface in gameObjects
WebGLGame.GameSetup.loadGameResources = function(){
    //Put here all your resources to be loaded before the initialization of the game

    let resourcePromises = []; //Promise to hold resources should resolve when all resources are loaded
    let images = [];
    let audios = [];
    for(let gameObject in WebGLGame.MainGameObjects){
        if(!!gameObject.image)
            images.push(gameObject.image);
        if(!!gameObject.audio)
            audios.push(gameObject.audio);
    }    
    resourcePromises.push(IoOBjectLoader.loadObjects(images.concat(audios)));
    return Promise.all(resourcePromises);

    
} 