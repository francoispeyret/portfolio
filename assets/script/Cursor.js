// Cursor multiplayer
function Cursor(id,x,y) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.display = function() {
        image(imgCursor, this.x, this.y);
    }
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
