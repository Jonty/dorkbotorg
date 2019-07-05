var lfeff = {

    // variables
    cx:0,
    cy:0,
    lx:0,
    ly:0,
    px:0,
    py:0,
    mobj:0,
    max:400,

    // initialization
    init : function() {
        this.mobj = document.getElementById('main_area');
        this.resize();
        this.lx = this.cx / 2;
        this.ly = this.cy / 2;
    },

    // refreshing mouse positions
    mousemove : function(e) {
        if (window.event) e = window.event;
        this.lx = (e.x || e.clientX);
        this.ly = (e.y || e.clientY);
    }, 

    // window resizing
    resize : function() {
        lfeff.cx = lfeff.mobj.offsetWidth  * 0.5;
        lfeff.cy = lfeff.mobj.offsetHeight  * 0.5;
    },

    // main draw lens function
    draw : function() {
        lfeff.px -= (lfeff.px - lfeff.lx) * .1;
        lfeff.py -= (lfeff.py - lfeff.ly) * .1;

        lfeff.drawLens('l1', 0.7, 1, 0, 0);
        lfeff.drawLens('l2', 0.5, 2, 0, 0);
        lfeff.drawLens('l3', 0.3, 3, 0, 0);
        lfeff.drawLens('l4', 0.2, 10, 0, 0);
        lfeff.drawLens('l5', 0.7, -1, 0, 0);
        lfeff.drawLens('l6', 0.5, -2, 0, 0);
        lfeff.drawLens('l7', 0.3, -3, 0, 0);
        lfeff.drawLens('l8', 1.0, -0.7, 0, 0);

        // looping current function
        setTimeout(lfeff.draw, 24);
    },

    // draw each lens function
    drawLens : function(id, scale, distance, x, y) {
        var vx = (this.cx - this.px) / distance;
        var vy = (this.cy - this.py) / distance;
        var d = this.max * scale;
        css = document.getElementById(id).style;
        css.top = Math.round(vy - (d * 0.5) + this.cy + y) + 'px';
        css.left = Math.round(vx - (d * 0.5) + this.cx + x) + 'px'
        css.width = Math.round(d) + 'px'
        css.height = Math.round(d) + 'px'
    }
}

window.onload = function() {
    // initialization
    lfeff.init();

    // start
    lfeff.draw();

    // binding onmousemove event
    document.onmousemove = function(e) {
        if (window.event) e = window.event; // for IE
        lfeff.mousemove(e);
    }

    // binding onresize event
    window.onresize = lfeff.resize();
}