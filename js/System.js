if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}

Object.prototype.setProperty = function(object, add) {
    if (add !== true) add = false;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            if (typeof this[key] !== 'undefined' || add) {
                this[key] = object[key];
            }
        }
    }
    return this;
}

function shuffle(array) {
    var len = array.length;
    var i = len;
    while (i--) {
        var p = Math.floor(Math.random() * len);
        var t = array[i];
        array[i] = array[p];
        array[p] = t;
    }
    return true;
}