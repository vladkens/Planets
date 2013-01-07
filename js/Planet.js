"use strict";
function Planet(orbit, radius, time) {
    this.pos    = new Point(0, 0);
    this.orbit  = orbit;
    this.radius = radius;
    this.speed  = Math.PI*2 / (time * 1000);
    this.angle  = ~~(Math.random() * 360);
    
    this.animate = true;
    this.name;
    this.tile;
    this.ctx;
    this.orbit.setProperty({'planet': this});
};

Planet.prototype = {
    drawBorder: function() {
        var ctx = this.ctx;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0,192,255)';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius * 1.1, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    },
    showInfo: function() {
        var x = this.pos.x + this.radius * 0.7;
        var y = this.pos.y + this.radius * 0.9;
        
        var ctx = this.ctx;
        ctx.fillStyle = '#002244';
        ctx.fillRect(x, y, 100, 24);
        ctx.fillStyle = '#0ff';
        ctx.fillText(this.name, x + 50, y + 17);
    },
    render: function(deltaTime) {
        if (this.animate) {
            this.pos.x = this.orbit.center.x + this.orbit.radius * Math.cos(this.angle);
            this.pos.y = this.orbit.center.y + this.orbit.radius * Math.sin(this.angle);
            this.angle += this.speed * deltaTime;
        }
        
        if (typeof this.tile !== 'undefined') {
            this.tile.draw(this.pos.x, this.pos.y, // Центр тайла
                this.orbit.center, this.radius);
        }
    }
};