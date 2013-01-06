"use strict";
function Orbit(center, radius) {
    this.center = center;
    this.radius = radius;
    
    this.planet = null;
    this.ctx    = null;
    this.mouse  = null;
};

Orbit.prototype = {
    draw: function() {
        var ctx   = this.ctx;
        var hover = this.mouse && Math.abs(this.mouse.pos.getDis(this.center) - this.radius) < 12;
        if (hover) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(0,192,255)';
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();
            
            ctx.clearRect(this.planet.pos.x - this.planet.radius, this.planet.pos.y - this.planet.radius,
                this.planet.radius * 2, this.planet.radius * 2);
            this.planet.drawBorder();
        } else {
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,192,255,0.5)';
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();
        }
    }
};