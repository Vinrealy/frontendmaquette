(function(){
  var engine = (function (window, document) {
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
    var olo = function (){console.log('olo');}
    var fullScreenRun = function (element){
      if(element.requestFullscreen) {element.requestFullscreen();console.log('fSR: el');}
      else if(element.webkitrequestFullscreen) {element.webkitRequestFullscreen();console.log('fSR: wk');}
      else if(element.mozRequestFullscreen) {element.mozRequestFullScreen();console.log('fSR: mz');}}
    var fullSreenCancel = function (){
      if(document.requestFullscreen) {document.requestFullscreen();console.log('fSC: el');}
      else if(document.webkitRequestFullscreen){document.webkitRequestFullscreen();console.log('fSC: wk');}
      else if(document.mozRequestFullscreen){document.mozRequestFullScreen();}console.log('fSC: mz');}
		/*var drawctx =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
		window.setTimeout(callback, 1000 / 60);
		};*/
    return {
      init: function() {document.body.appendChild(canvas);},
      clean: function() {ctx.clearRect(0, 0, canvas.width, canvas.height);}, //очищение canvas
      redraw: function() {engine.clean();},
      ala: function(x, y, x1, y1) {console.log('ala');},
      ili: function() {olo();},
      fullrun: function() {fullScreenRun(canvas);console.log('fSR!');},
      fullcancel: function() {fullScreenCancel();}
    };
  })(window, document);
  engine.init();
  engine.redraw();
  engine.fullrun();
})();
