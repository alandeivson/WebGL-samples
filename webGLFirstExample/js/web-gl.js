function init(){
  let canvasOnHTML = ['canvas-exercise-1','canvas-exercise-2',
    'canvas-exercise-3'];
  canvasOnHTML.forEach(initCanvas);
  initializeCanvasExercise1();
  initializeCanvasExercise2();
  initializeCanvasExercise3();
}


function initCanvas(canvasId){
  let canvas = document.getElementById(canvasId);
  let gl = canvas.getContext('experimental-webgl');
  gl.clearColor(1.0, 0.0, 1.0, 1);
  gl.enable(gl.DEPTH_TEST); 
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

}