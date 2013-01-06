"use strict";
var App = function(width, height) {
    this.planets = [];
    this.canvas;
    this.ctx;
    this.mouse;
    
    this.width  = width;
    this.height = height;
    this._resources = {};
    this.wait();
};

App.prototype = {
    wait: function() {
        var self = this;
        window.onload = function() {
            self.init(self.width, self.height);
        }
    },
    init: function(width, height) {
        var initRunTime = new Date();
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.canvas.width  = width;
        this.canvas.height = height;
        if (!this.canvas.getContext('2d')) {
            document.body.innerHTML = '<center>No support 2d context.</center>';
            return false;
        }
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = '16px monospace';
        this.ctx.textAlign = 'center';
        
        var globalCenter = new Point(this.canvas.width / 2, this.canvas.height / 2);
        this.mouse = new MouseController(this.canvas);
        
        var IM = {
            store: this._resources,
            imagesAdded: 0,
            imagesLoaded: 0,
            add: function(url, name) {
                var self  = this;
                var image = new Image();
                image.onload = function() {
                    self.imagesLoaded++;
                    if (self.imagesAdded == self.imagesLoaded) {
                        self.app.render(new Date());
                        console.log('init complete over ' + (new Date() - initRunTime) + 'ms');
                    }
                }
                image.src = url;
                this.store[name] = image;
                this.imagesAdded++;
            },
            app: this
        }
        IM.add('img/sun.png', 'sun');
        IM.add('img/planets.png', 'planets');
        
        var orbit  = new Orbit(globalCenter.clone(), 0).setProperty({
            ctx:   this.ctx,
            mouse: this.mouse
        }, true);
        var planet = new Planet(orbit, 50, 1).setProperty({
            tile: new Tile(this.ctx, this._resources['sun'], 0, 0, 100, 100),
            name: 'Sun',
            ctx:  this.ctx
        }, true);
        this.planets.push(planet);
        
        var names = ['Moon', 'Phobos', 'Deimos', 'Dactyl', 'Linus', 'Io', 'Europa', 'Ganymede',
            'Callisto', 'Amalthea', 'Himalia', 'Elara', 'Pasiphae', 'Taurus', 'Sinope', 'Lysithea',
            'Carme', 'Ananke', 'Leda', 'Thebe', 'Adrastea', 'Metis', 'Callirrhoe', 'Themisto', 
            '1975', '2000', 'Megaclite', 'Taygete', 'Chaldene', 'Harpalyke'];
        var tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var time  = 40;
        shuffle(names);
        shuffle(tiles);
        
        for (var i = 0; i < 12; ++i) {
            orbit  = new Orbit(globalCenter.clone(), 90+i*26).setProperty({
                ctx:   this.ctx,
                mouse: this.mouse
            }, true);
            planet = new Planet(orbit, 13, time).setProperty({
                tile: new Tile(this.ctx, this._resources['planets'], tiles[i]*26, 0, 26, 26),
                name: names[i],
                ctx:  this.ctx
            }, true);
            this.planets.push(planet);
            time += 20;
        }
    },
    render: function(lastTime) {
        var curTime = new Date();
        var self    = this,
            ctx     = this.ctx,
            planets = this.planets,
            mouse   = this.mouse;
        requestAnimationFrame(function(){
            self.render(curTime);
        });
        ctx.clearRect(0, 0, this.width, this.height);
        
        var showInfo = -1;
        for (var i = 0, il = planets.length; i < il; ++i) {
            planets[i].orbit.draw();
            planets[i].render(curTime - lastTime);
            if (Math.abs(planets[i].pos.x - mouse.pos.x) < planets[i].radius
                && Math.abs(planets[i].pos.y - mouse.pos.y) < planets[i].radius)
            {
                showInfo = i;
                if (mouse.pressed) {
                    planets[i].animate = planets[i].animate ? false : true;
                }
            }
        }
        
        if (showInfo > -1) {
            planets[showInfo].showInfo();
            planets[showInfo].drawBorder();
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
        mouse.pressed = false;
    }
}