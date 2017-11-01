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
    myCanvas = createCanvas(windowWidth-15,windowHeight);
    myCanvas.parent("me");

    socket.on('new', newOther);
    socket.on('others', updateOther);
    socket.on('disconnected', disconnectOther);
    socket.on('mouse', ortherMove);
    socket.on('click', ortherClick);
}

function newOther(id) {
    others.push(new Cursor(id,0,0));
}

function updateOther(data) {
    console.log('updateOther');
    console.log(data);
    for (let i = data.length-1; i >= 0; i--) {
        if(data[i]!=socket.id) {
            others.push(new Cursor(data[i],0,0));
        }
    }
}

function disconnectOther(id) {
    for (let i = others.length-1; i >= 0; i--) {
        if(others[i].id==id) {
            others.splice(i,1);
        }
    }
}

function ortherMove(data) {
    for (var i = others.length-1; i >= 0; i--) {
        if(others[i].id==data.id) {
            others[i].x = data.x;
            others[i].y = data.y;
        }
    }
}

function ortherClick(data) {
    bubbles.push(new Bubble(data.x, data.y));
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

function Cursor(id,x,y) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.display = function() {
        image(imgCursor, this.x, this.y);
    }
}

function Bubble(x,y) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.opacity = 255;

    this.display = function() {
        noFill();
        stroke(255,255,255,this.opacity);
        strokeWeight(5);
        ellipse(this.x,this.y,this.w,this.h);
    }
    this.pop = function() {
        this.w = this.w + 4;
        this.h = this.h + 4;
        this.opacity = this.opacity - 20;
        if(this.opacity <= 0) {
            bubbles.splice(0,1);
        }
    }
}
