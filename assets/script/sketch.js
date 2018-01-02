
const sphereNumber = 10;
let fps = 0;
let positionY = 0;
let cubeAnimation = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    fps++;
    background('#A10033');
    ambientLight('#84002b');
    let lightDirectionX = map(mouseX,0,width,-1000,1000);
    let lightDirectionY = map(mouseY,0,height,1000,-1000);
    //directionalLight(255,255,255,lightDirectionX,0,1);
    pointLight(255,255,255,lightDirectionX,lightDirectionY,-300);

    if(positionY > 0) translate(0,positionY*-5,0);

    let offsetX = map(mouseX, -100, width+100, -100, 100);
    push();
    for(let i = 0; i < sphereNumber; i++) {
        translate(offsetX*i*1.2, i*-20, i*-100);
        if(positionY > 0) rotateZ(positionY*-0.005);
        push();
        rotateY(45);
        rotateZ(45);
        ambientMaterial(255,255,255);
        box(100);
        pop();
    }
    pop();

}

function mouseWheel(event) {
    console.log(positionY);

    if(event.delta>0)
        positionY += event.delta;
    else if(event.delta<0 && (event.delta+positionY)>0 && positionY>=0)
        positionY += event.delta;

    return false;
}
