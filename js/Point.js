"use strict";
function Point(x, y) {
    this.x;
    this.y;
    
    this.set(x, y);
};

Point.prototype = {
    set: function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    },
    getDis: function(other) {
        return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
    },
    clone: function() {
        return new Point(this.x, this.y);
    }
};