
let canvas = document.getElementById('canvas');
let gl = canvas.getContext('webgl');

let cloudImg = new Image();
cloudImg.src = 'img/assets/clouds.png';
loadImages([cloudImg]).then(function(){
    let nuvem = new Sprite2D(cloudImg,0.3,0.3,gl);

});