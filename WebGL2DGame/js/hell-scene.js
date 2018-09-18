
    WebGLGame.MainScenes.hellScene = function(){  
        WebGLGame.MainScenes.registerScene('HellScene',WebGLGame.MainScenes.hellScene);
        let MainScenes = WebGLGame.MainScenes;     
        let MainGameConstants = WebGLGame.MainGameConstants; 
        let MainGameObjects = WebGLGame.MainGameObjects;
        let fireSkull = MainGameObjects.fireSkull.sprite;
       
        let bridge = MainGameObjects.bridgeToTheOtherSide.sprite;
        let lavaFloor = MainGameObjects.lavaFloor.sprite;  
        MainScenes.hellScene.reset = function(){
            clearInterval(MainScenes.hellScene.interval);
            WebGLGame.MainGameMenus.openMainMenu();
            MainGameObjects.hellSceneMusic.audio.pause();
        }
        MainScenes.hellScene.load = function(){
            MainGameObjects.hellSceneMusic.audio.play();
            //Play the music forever
            MainGameObjects.hellSceneMusic.audio.addEventListener("ended",function(){
                his.currentTime = 0;
                this.play();
            }, false);
            
            Scene.clearScreen(window.gl);
            let hellScene = new Scene(window.gl);
            let score = 0;
            loadBackground(hellScene); 
            let mainCharacter = MainGameObjects.mainChar.sprite;
            let horse = MainGameObjects.block.sprite;
            let demon =  MainGameObjects.demon.sprite;
            let dragon = MainGameObjects.dragon.sprite;
            
            let bridge = MainGameObjects.bridgeToTheOtherSide.sprite;
            hellScene.addElement(horse);

            hellScene.addElement(mainCharacter);
            
            horse.setTranslation([1, MainGameConstants.FLOOR_HEIGHT]);
            demon.setTranslation([1, MainGameConstants.FLOOR_HEIGHT]);
            dragon.setTranslation([1,MainGameConstants.FLOOR_HEIGHT]);
            let jumpForce = 0;
            document.addEventListener('keydown', function(event){
                if(event.keyCode == MainGameConstants.JUMP_KEY_CODE){                    
                        if(mainCharacter.getTranslation()[1] == MainGameConstants.FLOOR_HEIGHT -0.125){
                            jumpForce = MainGameConstants.JUMP_FORCE;
                            MainGameObjects.jumpingSound.audio.play();

                        }
                }
            }); 
            document.getElementById('webGLCanvas').addEventListener('click', function(event){
                if(mainCharacter.getTranslation()[1] == MainGameConstants.FLOOR_HEIGHT -0.125){
                    jumpForce = MainGameConstants.JUMP_FORCE; 
                    MainGameObjects.jumpingSound.audio.play();          
                }
            });
            let isPaused = false; 
            WebGLGame.MainGameMenus.buttonPause.onclick = function(){
                isPaused = !isPaused;
            }
            
            
            let timeEnteredScene = Date.now();
            document.addEventListener('keydown', function(event){
                if(event.keyCode == 80){
                    isPaused = !isPaused;
                }
            });            
            let obstacles = [horse];
            let mapSpeed = MainGameConstants.INITIAL_OBSTACLE_SPEED;
            horse.position = MainGameConstants.INITIAL_OBSTACLE_POSITION.slice();
            horse.setScale([2,4]);
            demon.position = MainGameConstants.INITIAL_OBSTACLE_POSITION.slice();
            demon.setScale([2,4]);
            dragon.position = MainGameConstants.INITIAL_OBSTACLE_POSITION.slice();
            dragon.setScale([2,4]);
            let mainCharacterPosition = MainGameConstants.MAIN_CHARACTER_INITIAL_POSITION;
            mainCharacter.setTranslation(mainCharacterPosition);   
            let lastObstacleTime = Date.now();       
            horse.setTranslation(horse.position);  
            
           
            MainScenes.hellScene.interval = setInterval(function(){
                if(isPaused){
                    //Do not let obstacles appear when unpause
                    lastObstacleTime = Date.now();
                    
                }
                if(!isPaused){
                        //increase slowly the speed
                        mapSpeed +=  MainGameConstants.INCREASE_IN_MAP_SPEED;
                        score = (mapSpeed - MainGameConstants.INITIAL_OBSTACLE_SPEED)* MainGameConstants.MAP_SPEED_TO_SCORE;
                        WebGLGame.MainGameMenus.score.innerHTML = "Score: " + score.toFixed(2);
                        //Modeling for jump
                        if(jumpForce > 0)
                            jumpForce -= MainGameConstants.GRAVITY;
                        mainCharacterPosition[1] += jumpForce;
                        if(mainCharacterPosition[1] > MainGameConstants.FLOOR_HEIGHT)
                            mainCharacterPosition[1] -= MainGameConstants.GRAVITY;
                        
                        else
                            mainCharacterPosition[1] = MainGameConstants.FLOOR_HEIGHT -0.125 ;
                        //Modeling for appear obstacles
                        if(Number(Date.now() - lastObstacleTime) > MainGameConstants.TIME_APPEAR_ANOTHER_OBSTACLE){
                            if(Math.floor(Math.random()* 10 + 1) < MainGameConstants.APPEAR_ANOTHER_OBSTACLE_CHANCE){
                                //Copy a random sprite to be a new obstacle object
                                let obstacle;
                                let random = Math.random();
                                if(random > 2/3){
                                    obstacle = horse;
                                }
                                else
                                    if(random > 1/3)
                                        obstacle = dragon;

                                else
                                    obstacle = demon;
                                obstacles.push(Object.create(obstacle));
                                obstacles[obstacles.length-1].getPosition();
                                obstacles[obstacles.length-1].position = MainGameConstants.INITIAL_OBSTACLE_POSITION.slice();
                                hellScene.addElement(obstacles[obstacles.length-1]);
                                obstacles[obstacles.length-1].setTranslation(MainGameConstants.INITIAL_OBSTACLE_POSITION);
                                lastObstacleTime = Date.now();
                                
                                
                            }
                            
                        }
                        {
                            skulls.forEach(skull => {
                                //if skull is out of the window
                                if(skull.getPosition()[0][0] < -1.3){
                                    let newTranslation = [Math.random(),Math.random()];
                                    skull.setTranslation(newTranslation);
                                }
                                else{
                                    let actualTranslation = skull.getTranslation();
                                    actualTranslation[0] -= mapSpeed*0.4;
                                    skull.setTranslation(actualTranslation);
                                }

                            }); 
                        }
                        

                        //Clear out of window obstacles
                        obstacles = obstacles.filter(obstacle =>{
                            //-1 = is the limit for our webGL world
                            if(obstacle.getPosition()[3][0] < -1.0){
                                hellScene.removeElement(obstacle);
                                return false;
                            }
                            return true;
                        });
                        obstacles.forEach((obstacle) => {
                        
                        obstacle.setTranslation(obstacle.position);
                            obstacle.position[0] -= mapSpeed;
                        //    obstacle.isColiding(mainCharacter);
                        
                        });
                        if(obstacles.some(obstacle =>
                                obstacle.isColiding(mainCharacter,0.06)
                            )){
                            let highScore = WebGLGame.localStorage.getHighScore(); 
                            if(!!highScore){
                                if(score > highScore){
                                    WebGLGame.localStorage.setHighScore(score);
                                }
                            }
                            else
                                WebGLGame.localStorage.setHighScore(score);
                            WebGLGame.MainScenes.finishScene('HellScene');

                        }
                        backgroundElements.forEach((element,index) => {
                            let translation = element.getTranslation();
                            if(element.getPosition()[3][0] < -1){
                                translation[0] = getLastPieceOfGround(backgroundElements).getPosition()[3][0];
                                
                            }
                             translation[0] -= mapSpeed;                                
                            
                            element.setTranslation(translation);
                            
                        });
                    
                        mainCharacter.setTranslation(mainCharacterPosition);
                        hellScene.draw();
                    } 
                },MainGameConstants.REDRAW_RATE);

    
        };
        //get last piece of ground on the screeen to make ground's movement
        function getLastPieceOfGround(backgroundElements){
            let lastPiece = backgroundElements[0];
            backgroundElements.forEach( element => {
                if(element.getPosition()[3][0] > lastPiece.getPosition()[3][0])
                    lastPiece = element;  

            });
            return lastPiece;
        }

        let backgroundElements = [];

        function loadBackground(scene){     
            lavaFloor.setTranslation([-0.5,-1.1]);
            let endOfLavaFloor = lavaFloor.getPosition()[3][0];
            let anotherGroundHalf = Object.create(lavaFloor);
            anotherGroundHalf.setTranslation([endOfLavaFloor + anotherGroundHalf.width/2,-1.1]);
            let endOfanotherGroundHalf = anotherGroundHalf.getPosition()[3][0];
            let aThirdPieceOfGround = Object.create(lavaFloor);
            aThirdPieceOfGround.setTranslation([endOfanotherGroundHalf + aThirdPieceOfGround.width/2,-1.1])
            backgroundElements.push(lavaFloor);
            backgroundElements.push(anotherGroundHalf);
            backgroundElements.push(aThirdPieceOfGround);
            bridge.setTranslation([0.5,0]);
            scene.addElement(MainGameObjects.hellsSky.sprite);
            scene.addElement(bridge);
            scene.addElement(lavaFloor);
            scene.addElement(anotherGroundHalf);
            scene.addElement(aThirdPieceOfGround);
            scene.draw();
            spamRandomSkulls(scene);


        }
        let skulls =[];
        function spamRandomSkulls(scene){
            skulls = [fireSkull];
            scene.addElement(fireSkull);
            for(let x = 0; x < 5; x++){
                let newSkull = Object.create(fireSkull);
                skulls.push(newSkull);
                scene.addElement(newSkull);
            }
            

        }
    
    
    }