var app = (function(window, document){
  var canvasel = document.createElement('canvas');
  canvasel.style.position = 'absolute';
  canvasel.style.top = '0px';
  canvasel.style.left = '0px';
  canvasel.width = document.documentElement.clientWidth;
  canvasel.height = document.documentElement.clientHeight;
  document.body.appendChild(canvasel);
  var ctxel = canvasel.getContext('2d');
  return {
    initctx: function(){
      document.body.appendChild(canvasel);
    },
    clearctx: function(){
      ctxel.width = 0;
      ctxel.width = document.documentElement.clientWidth;
    }
  };
})(window, document);
