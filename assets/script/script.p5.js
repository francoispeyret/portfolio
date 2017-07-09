
function setup(){
    myCanvas = createCanvas(windowWidth,windowHeight);
    myCanvas.parent("me");
}

function draw(){
    background('#6E232F');
    fill(0, 12);
    rect(0, 0, width, height);
    fill(255);
    noStroke();
    ellipse(mouseX, mouseY, 60, 60);


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}