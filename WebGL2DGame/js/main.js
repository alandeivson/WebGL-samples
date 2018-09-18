let WebGLGame = {};
window.onload = function(){
  
    let glCanvas = document.getElementById('webGLCanvas');
    window.gl = glCanvas.getContext('webgl');//There's a global constant called gl reference to gl rendering context
    
    let MainScenes = WebGLGame.MainScenes;
    let MainGameConstants = WebGLGame.MainGameConstants;
    let MainGameObjects = WebGLGame.MainGameObjects;
    let GameSetup = WebGLGame.GameSetup;
    let MainGameMenu = WebGLGame.MainGameMenus;
    MainGameMenu.loadMenuReferences();
    MainGameConstants.loadMainConstantsReferences();
    MainGameObjects.loadMainGameObjectsReferences();
    MainScenes.loadMainScenesObjectsReferences();
    
    WebGLGame.MainGameMenus.buttonPlay.style.visibility = "hidden";
    //Wait load to start the game
    GameSetup.loadGameResources().then(function(){
        WebGLGame.MainGameMenus.loadingButton .style.visibility = "hidden";
        
        //Put here your game logic
        MainGameMenu.openMainMenu();
        MainGameMenu.buttonPlay.onclick =   function(){
            MainGameMenu.closeMenu();
            MainScenes.startScene('HellScene');
            
        };

    });
   
}