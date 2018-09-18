/**
 * Here you can put your game constants 
 */

WebGLGame.MainGameConstants = {};
WebGLGame.MainGameConstants.loadMainConstantsReferences = function(){
    this.FLOOR_HEIGHT = -0.6;
    this.GRAVITY = 0.025;
    this.REDRAW_RATE = 30; //Redraw every 30 milisseconds
    this.JUMP_KEY_CODE = 32; //Space jump
    this.JUMP_FORCE = 0.25; 
    this.MAIN_CHARACTER_INITIAL_POSITION = [-0.8,this.FLOOR_HEIGHT];
    this.INITIAL_OBSTACLE_POSITION = [1 , this.FLOOR_HEIGHT];
    this.INITIAL_OBSTACLE_SPEED = 0.03;
    this.TIME_APPEAR_ANOTHER_OBSTACLE = (1000) * 1.5; //in milisseconds
    this.APPEAR_ANOTHER_OBSTACLE_CHANCE = 2; //50 %
    this.INCREASE_IN_MAP_SPEED = 1/100000;
    this.MAP_SPEED_TO_SCORE = 1/this.INCREASE_IN_MAP_SPEED;
}
