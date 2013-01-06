"use strict";
function Tile(ctx, img, x, y, w, h) {
    this.ctx    = ctx;
    this.img    = img;
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.height = h;
};

Tile.prototype = {
    draw: function(x, y, p, r) {
        var ctx = this.ctx;
        ctx.save();
        ctx.translate(x + r, y + r);
        ctx.rotate(Math.atan2(p.y - y, p.x - x) + Math.PI / 2);
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
            -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
};