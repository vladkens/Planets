"use strict";
function MouseController(element) {
    this.element = null;
    this.pos     = new Point(0, 0);
    this.pressed = false;
    
    if (typeof element !== 'undefined') {
        this.watch(element);
    }
};
    
MouseController.prototype = {
    watch: function(element) {
        var self = this;
        this.element = element;
        this.element.addEventListener('mousemove', function(e) {
            self.move(e);
        }, true);
        this.element.addEventListener('mousedown', function(e) {
            self.down(e);
        }, true);
        this.element.addEventListener('mouseup', function(e) {
            self.up(e);
        }, true);
    },
    move: function(e) {
        this.pos.set(e.offsetX || e.layerX, e.offsetY || e.layerY);
    },
    down: function(e) {
        this.move(e);
        this.pressed = true;
    },
    up: function(e) {
        this.move(e);
        this.pressed = false;
    }
};