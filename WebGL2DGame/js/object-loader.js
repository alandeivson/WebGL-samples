/**
 * @param [Image[]] return a resolved promise when all images were loaded
 */
let IoOBjectLoader = {};
IoOBjectLoader.loadObjects = function(object){
    let promiseQueue = [];

    object.forEach(object => {
        
        let objectLoad = new Promise((resolve,reject) => {
            object.addEventListener('load', e => resolve(object));
            object.addEventListener('error', () => {
              reject(new Error(`Failed to load image's URL: ${element.src}`));
            }); 
    
        });
        promiseQueue.push(objectLoad);
    });

    return  Promise.all(promiseQueue);
};