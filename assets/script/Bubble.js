
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
