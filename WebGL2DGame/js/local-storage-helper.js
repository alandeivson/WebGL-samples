WebGLGame.localStorage = {};


WebGLGame.localStorage.setHighScore = function(value){
    localStorage.setItem("highscore",value);
}

WebGLGame.localStorage.getHighScore = function(){
    
    return localStorage.getItem("highscore");
}