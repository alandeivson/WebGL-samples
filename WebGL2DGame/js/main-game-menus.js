WebGLGame.MainGameMenus = {};
WebGLGame.MainGameMenus.loadMenuReferences = function(){
   this.buttonPlay = document.getElementById('play-game');
   this.loadingButton = document.getElementById('loading');
   this.buttonPause = document.getElementById('pause-game');
   this.score = document.getElementById('score');
   this.highscore = document.getElementById('highscore');
   this.closeMenu = function(){
       let menus = document.getElementsByClassName('main-menu');
       menus[0].style.visibility = 'hidden';
       WebGLGame.MainGameObjects.menuMusic.audio.pause();
       WebGLGame.MainGameMenus.buttonPlay.style.visibility = "hidden";
   }
   this.openMainMenu =function(){
        let menus = document.getElementsByClassName('main-menu');
        this.highscore.innerHTML = "Highscore:" + Number(WebGLGame.localStorage.getHighScore() || 0).toFixed(1);
        menus[0].style.visibility = 'visible';
        WebGLGame.MainGameMenus.buttonPlay.style.visibility = "visible";
        WebGLGame.MainGameObjects.menuMusic.audio.play();
        //Repeat the song at the end
        WebGLGame.MainGameObjects.menuMusic.audio.addEventListener("ended",function(){
            his.currentTime = 0;
            this.play();
        }, false);
    }
};