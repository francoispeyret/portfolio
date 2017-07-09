var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var frames = 0;
var et = false;

function draw(x,y) {
    frames++;
    if(x == null) x = window.innerWidth / 2;
    if(y == null) y = window.innerHeight / 2;
    ctx.canvas.width  = window.innerWidth-40;
    ctx.canvas.height = window.innerHeight-40;
    ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);

    ctx.save();

    var rotateText = (x * 30) / ctx.canvas.width - 15;

    ctx.font = "700 60px Raleway";
    ctx.fillStyle = '#fff';
    ctx.rotate(rotateText * Math.PI/180);
    ctx.fillText("CODE", -260, 23 );
    ctx.fillText("DESIGN", 100, 23 );
    ctx.restore();

    ctx.save();
    ctx.scale(1, 0.2);
    ctx.beginPath();
    ctx.fillStyle = '#4B171F';
    ctx.arc(0, 360,75, 0, 2 * Math.PI);
    ctx.lineWidth = 0;
    ctx.fill();
    ctx.closePath();
    ctx.restore();



    var n = 10;
    for (i=2; i < 11; i++) {
        n--;

        var arcR = 75 - (n * 7);
        var arcX = ((x * 30) / ctx.canvas.width - 15) * n;
        var arcY = n * - 30 * 0.9;

        ctx.beginPath();
        ctx.fillStyle = 'hsl(350, '+ (52 + (48/n)) +'%, '+ (21 + (72/(n+.5))) +'%)';
        ctx.strokeStyle = 'hsl(350, '+ (52 + (48/n)) +'%, '+ (21 + (72/(n+.5))) +'%)';
        ctx.arc( arcX, arcY, arcR, 0, 2*Math.PI );
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    // bille principale
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.arc(0, 0, 75, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // esperluette
    ctx.fillStyle = '#6E232F';
    ctx.font = "700 60px Raleway";
    ctx.textAlign = 'center';
    ctx.fillText("&", 0, 20);

    // text
    ctx.font = "400 14px Raleway";
    ctx.fillStyle = '#3D141D';
    ctx.fillText("nbFrames="+frames+";", ctx.canvas.width/2*-1, ctx.canvas.height/2 - 60);
    ctx.fillText("event.clientX="+Math.pow(x,3)+";", ctx.canvas.width/2*-1, ctx.canvas.height/2 - 45);
    ctx.fillText("event.clientY="+Math.pow(y,3)+";", ctx.canvas.width/2*-1, ctx.canvas.height/2 - 30);
    ctx.fillText("randomFloatVal="+Math.random()+";", ctx.canvas.width/2*-1, ctx.canvas.height/2 - 15);
    ctx.fillText("locationUrl="+window.location+";", ctx.canvas.width/2*-1, ctx.canvas.height/2 );


    c.addEventListener('click',function(e){
       if(e.pageX > ctx.canvas.width/2)
           console.log('aaa');
    });
    if(et==true) {

        ctx.fillStyle = '#fff';
        ctx.font = "700 60px Raleway";
        ctx.textAlign = 'center';
        ctx.fillText("&", 110, 220);
    }

}

var cursorX;
var cursorY;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}

draw(0,0);

setInterval(function () { draw(cursorX,cursorY); },1000/30);