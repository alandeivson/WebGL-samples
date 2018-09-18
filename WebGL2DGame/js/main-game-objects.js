/**
 * Put here all your game objects
 * An object can be a function or object inside MainGameObjects 'global' object
 */
//@Todo MainGameObjects should have a 'loadResource' interface
WebGLGame.MainGameObjects = {};

WebGLGame.MainGameObjects.loadMainGameObjectsReferences = function(){

    let MainGameObjects = WebGLGame.MainGameObjects;
    MainGameObjects.menuMusic = {};
    MainGameObjects.menuMusic.audio = new Audio('sounds/menu.mp3');
    MainGameObjects.hellSceneMusic = {};
    MainGameObjects.hellSceneMusic.audio = new Audio('sounds/hell.mp3');
    MainGameObjects.jumpingSound = {};
    MainGameObjects.jumpingSound.audio = new Audio('sounds/jumping.wav');
    MainGameObjects.block = {};
    MainGameObjects.block.image = new Image();
    MainGameObjects.block.image.src = "img/assets/hell-images/Nightmare-Files/PNG/nightmare-galloping.png";
    MainGameObjects.block.sprite = new AnimatedSprite2D(MainGameObjects.block.image,
        0.15,0.15,gl);
    MainGameObjects.demon = {};
    MainGameObjects.demon.image = new Image();
    MainGameObjects.demon.image.src = "img/assets/hell-images/demon-Files/PNG/demon-idle.png";
    MainGameObjects.demon.sprite = new AnimatedSprite2D(MainGameObjects.demon.image,
            0.15,0.15,gl);
    MainGameObjects.demon.sprite.setAnimatedTexture(6,100);

    MainGameObjects.mainChar = {};
    MainGameObjects.mainChar.image = new Image();
    MainGameObjects.mainChar.image.src = "img/assets/character-texture-running.png";
    MainGameObjects.mainChar.sprite = new AnimatedSprite2D(MainGameObjects.mainChar.image,
            0.2,0.2,gl);
    let revert = 1; //revert texture
    MainGameObjects.mainChar.sprite.setAnimatedTexture(8,100);



    MainGameObjects.fireSkull = {};
    MainGameObjects.fireSkull.image = new Image();
    MainGameObjects.fireSkull.image.src = "img/assets/hell-images/Fire-Skull-Files/PNG/fire-skull.png";
    MainGameObjects.fireSkull.sprite = new AnimatedSprite2D(MainGameObjects.fireSkull.image,
            0.2,0.2,gl);
    
    MainGameObjects.fireSkull.sprite.setAnimatedTexture(8,100);



    MainGameObjects.dragon = {};
    MainGameObjects.dragon.image = new Image();
    MainGameObjects.dragon.image.src = "img/assets/hell-images/dragon.png";
    MainGameObjects.dragon.sprite = new AnimatedSprite2D(MainGameObjects.dragon.image,
            0.15,0.15,gl);
    
    MainGameObjects.dragon.sprite.setAnimatedTexture(3,100);




    MainGameObjects.block2 = {};
    MainGameObjects.block2.image = new Image();
    MainGameObjects.block2.image.src = "img/assets/flor.png";
    MainGameObjects.block2.sprite = new Sprite2D(MainGameObjects.block2.image,
    0.1,0.1,gl);
    
    MainGameObjects.block3 = {};
    MainGameObjects.block3.image = new Image();
    MainGameObjects.block3.image.src = "img/assets/flor.png";
    MainGameObjects.block3.sprite = new Sprite2D(MainGameObjects.block3.image,
                0.3,0.3,gl);
    MainGameObjects.block.sprite.setAnimatedTexture(4,100);
              
        

   
    MainGameObjects.lavaFloor = {};
    MainGameObjects.lavaFloor.image = new Image();
    MainGameObjects.lavaFloor.image.src = "img/assets/hell-images/floor.png";
    MainGameObjects.lavaFloor.sprite = new Sprite2D(MainGameObjects.lavaFloor.image,2.0,WebGLGame.MainGameConstants.FLOOR_HEIGHT,window.gl);  
    
    
    MainGameObjects.bridgeToTheOtherSide = {};
    MainGameObjects.bridgeToTheOtherSide.image = new Image();
    MainGameObjects.bridgeToTheOtherSide.image.src = "img/assets/hell-images/bridge.png";
    MainGameObjects.bridgeToTheOtherSide.sprite = new Sprite2D(MainGameObjects.bridgeToTheOtherSide.image,1,2,window.gl);    
    
    MainGameObjects.hellsSky = {};
    MainGameObjects.hellsSky.image = new Image();
    MainGameObjects.hellsSky.image.src = "img/assets/hell-images/sky.png";
    MainGameObjects.hellsSky.sprite = new Sprite2D(MainGameObjects.hellsSky.image,2,2,window.gl);    


};

