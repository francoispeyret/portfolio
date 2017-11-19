var socket;
var rotateText;
var others = [];
var imgCursor;
var bubbles = [];
var posScene = 0;

socket = io.connect('http://www.francoispeyret.fr:3000');

function preload() {
  imgCursor = loadImage("assets/img/cursor.png");
}

function setup(){
    createCanvas(windowWidth-15,windowHeight);

    socket.on('new', newOther);
    socket.on('others', updateOther);
    socket.on('disconnected', disconnectOther);
    socket.on('mouse', ortherMove);
    socket.on('click', ortherClick);
}

function mouseMoved() {
    var data = {
        x: mouseX,
        y: mouseY
    }
    //console.log(data);
    socket.emit('mouse',data);
}

function mousePressed() {
    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('click',data);
    bubbles.push(new Bubble(mouseX, mouseY));
}

function draw(){
    background('#6E232F');

    translate((windowWidth-15)/2,windowHeight/2+posScene);

    var mousePosX = Math.floor(mouseX-(windowWidth/2)),
        mousePosY = Math.floor(mouseY-(windowHeight/2));

    var pointNumber = 30;
    for (var y = 1; y <= pointNumber/2; y++) {
        for (var x = pointNumber/2*-1; x <= pointNumber/2; x++) {
            var alpha = 100;
            var xPos = x*(y*1+20);
            var yPos = (y*10)+20;

            noFill();
            stroke(255,255,255,alpha);
            strokeWeight(4);
            point(xPos,yPos);
        }
    }


    noStroke();
    fill('#fff');
    ellipse(0, 0, 150, 150);

    stroke(255);
    strokeWeight(3);
    noFill();
    var arcX = map(mouseX,0,width,0,0.5)*PI;
    var arcX2 = map(mouseX,0,width,0.50,1)*PI;
    arc(0, 0, 170, 170, arcX+PI, arcX2+PI);
    arc(0, 0, 170, 170, arcX, arcX2);


    noStroke();
    fill('#6E232F');
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(60);
    textFont("Raleway");
    text("&", 0, 20);

    rotateText = map(mouseX,0,width,1.9,2.1)*PI;
    rotate(rotateText);
    textAlign(LEFT);
    fill('#fff');
    text("CODE", -260, 20);
    text("DESIGN", 90, 20);
    rotate(-rotateText);

    translate((windowWidth-15)/2*-1, windowHeight/2*-1);

    for (var i = bubbles.length-1; i >= 0; i--) {
        bubbles[i].display();
        bubbles[i].pop();
    }

    for (var i = others.length-1; i >= 0; i--) {
        others[i].display();
        //others[i].pop();
    }

    fill(200);
    //rect(0, 0, 55, 55);

}

function windowResized() {
    resizeCanvas(windowWidth-15, windowHeight);
}
