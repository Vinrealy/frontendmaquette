var app = (function(window, document){
  window.requestAnimFrame =
  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
  var canvasel = document.createElement('canvas');
  canvasel.style.position = 'absolute';
  canvasel.style.top = '0px';
  canvasel.style.left = '0px';
  canvasel.width = document.documentElement.clientWidth;
  canvasel.height = document.documentElement.clientHeight;
  var ctxel = canvasel.getContext('2d');
  return {
    initctx: function(){
      document.body.appendChild(canvasel);
    },
    clearctx: function(){
      ctxel.clearRect(0, 0, canvasel.width, canvasel.height);
    },
    drawctx: function(callback){
      app.clearctx();
      requestAnimFrame(callback);
    }
  };
})(window, document);
