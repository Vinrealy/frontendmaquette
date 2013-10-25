var app = (function(window, document){
  var canvasel = document.createElement('canvas');
  canvasel.style.position = 'absolute';
  canvasel.style.top = '0px';
  canvasel.style.left = '0px';
  canvasel.width = document.documentElement.clientWidth;
  canvasel.height = document.documentElement.clientHeight;
  var ctxel = canvasel.getContext('2d');
  var initctx = function() {document.body.appendChild(canvasel);}
  var clearctx = function() {ctxel.clearRect(0, 0, canvasel.width, canvasel.height);}
  var drawctx =
  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
  return {
    init: function(){
      initctx();
    },
    draw: function(callback){ /* drawing elements on canvas */
      clearctx();
      if(callback){
        for(var i = 0; i < callback.length; i++){
          callback[i]();
        }
      }
      drawctx(app.draw);
    },
    kvad: function(x, y, x1, y1){
      ctxel.fillRect(x, y, x + x1, y + y1);
    }
  };
})(window, document);
