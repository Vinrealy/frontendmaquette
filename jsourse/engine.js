(function(){
  var engine = (function (window, document) {
    var stack = [];
    var context = null; //проверка поддерживает ли браузер canvas
    if(!document.createElement('canvas').getContext){
      throw new Error('Your browser is not support HTML5 Canvas.');
      document.body.innerHTML = error.message;
      return;}
    else{
      var canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
      var ctx = canvas.getContext('2d');}
    window.addEventListener('mousemove', function(e) { //событие перетаскивание мыши, провека координат мыши и текущей ли элемент, отсылка координат
      }, false);
    window.addEventListener('mousedown', function(e) { //событие нажатия любой кнопки мыши, отсылка номера кнопки
      }, false);
    window.addEventListener('mouseup', function(e) { //событие отпуска любой кнопки мыши, отсылка номера кнопки
      }, false);
    window.addEventListener('resize', function(e){
      canvas.style.width = document.documentElement.offsetWidth+"px";
      canvas.style.height = window.innerHeight+"px";}, false);
    var fullScreenRun = function (element){
      if(canvas.requestFullscreen) {canvas.requestFullscreen();console.log('fSR: el');}
      else if(canvas.webkitrequestFullscreen) {canvas.webkitRequestFullscreen();console.log('fSR: wk');}
      else if(canvas.mozRequestFullscreen) {canvas.mozRequestFullScreen();console.log('fSR: mz');}}
    var fullSreenCancel = function (){
      if(document.requestFullscreen) {document.requestFullscreen();console.log('fSC: el');}
      else if(document.webkitRequestFullscreen){document.webkitRequestFullscreen();console.log('fSC: wk');}
      else if(document.mozRequestFullscreen){document.mozRequestFullScreen();console.log('fSC: mz');}}
    var requestAnimFrame = (function(){
      return window.requestAnimationFrame  ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){window.setTimeout(callback, 1000 / 60);};
      })();
      
      /**/
    return {
      init: function() {document.body.appendChild(canvas);},
      clean: function() {ctx.clearRect(0, 0, canvas.width, canvas.height);}, //очищение canvas
      redraw: function() {engine.clean();requestAnimFrame(arguments.callee);},
      fullrun: function() {fullScreenRun();},
      fullcancel: function() {fullScreenCancel();},
      addshape: function(){}
    };
  })(window, document);
  engine.init();
  engine.redraw();
  engine.fullrun();
})();
