/**
 * Put here all your game scenes, you can create an another js file containing the scene
 * inside a function then call it here
 * A scene can be a function or object inside MainScenes 'global' object
 */

WebGLGame.MainScenes = {};
WebGLGame.MainScenes.loadMainScenesObjectsReferences = function(){
    let mainSceneMap = new Map(); 
    let currentScene = null;
    WebGLGame.MainScenes.finishScene = function(sceneName){
        mainSceneMap.get(sceneName).reset();
        currentScene = null;
    }
    WebGLGame.MainScenes.startScene = function(sceneName){
        //starts if there's no currentScene playing
        if(mainSceneMap.get(sceneName) && !currentScene){   
            mainSceneMap.get(sceneName)();
            mainSceneMap.get(sceneName).load();
            currentScene = sceneName;
        }
    
    }
    WebGLGame.MainScenes.registerScene = function(sceneName,sceneReference){
        mainSceneMap.set(sceneName,sceneReference);
        
    }
    WebGLGame.MainScenes.hellScene();


}
