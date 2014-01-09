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
      /************************/
    var event = {mouseX: 0, mouseY: 0, mouseClicked: false, mouseButton: 0, currentTarget: null, relatedTarget: null} //флаги координат мыши, кликали или нет, какой кнопкой мыши нажали, текущего элемента, связанных элементов
    window.addEventListener('mousemove', function(e) { //событие перетаскивание мыши, провека координат мыши и текущей ли элемент, отсылка координат
      var x = e.clientX - e.currentTarget.offsetLeft + window.pageXOffset; 
      var y = e.clientY - e.currentTarget.offsetTop + window.pageYOffset;
      if (event.currentTarget !== null && (x - event.mouseX !== 0 || y - event.mouseY !== 0)) {event.currentTarget.isMoved = true;}
      event.mouseX = x;
      event.mouseY = y;}, false);
    window.addEventListener('mousedown', function(e) { //событие нажатия любой кнопки мыши, отсылка номера кнопки
      event.mouseClicked = true;
      event.mouseButton = e.button;}, false);
    window.addEventListener('mouseup', function(e) { //событие отпуска любой кнопки мыши, отсылка номера кнопки
      event.mouseClicked = false;
      event.mouseButton = e.button;}, false);
      /*********************/
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
      /*********************/
    var activeTargets = {}
    var toArray = function(object) {
      var array = [];
      for (var key in object) {array.push(object[key]);}
      return array;}  
    var Shape = function(draw, par) { //, в качестве параметров функция draw и параметры parameters
      var shapeInstance = this;
      this.get = function(key) {return par[key];} //получение праметров
      this.set = function(values) { //установка параметров
          for (var key in par) {
              if (!!values[key]) {par[key] = values[key];}}} //если values не соответствует parameters меняем их
      var ActionHandler = function(values, delay, callback) {
          var relativeTimestamp = new Date().getTime(); //получаем время когда произошло событие
          var endTimestamp = relativeTimestamp + delay; //сколько времени должно событие происходить
          var offsets = {};
          for (var key in par) {
              if (!!values[key]) {offsets[key] = values[key] - par[key];} //если values и parameters не равны количественно то высчитывает их разницу
              else {offsets[key] = 0;}} //иначе ничего не происходит
          this.handle = function() {
              var currentTimestamp = new Date().getTime(); //получаем время когда произошло событие
              if (currentTimestamp <= endTimestamp) { 
                  var elapsedTime = currentTimestamp - relativeTimestamp;
                  var offsetRate = elapsedTime / delay;
                  relativeTimestamp = currentTimestamp;
                  delay -= elapsedTime;
                  var offset = 0;
                  for (var key in offsets) {
                      offset = offsets[key] * offsetRate;
                      par[key] += offset;
                      offsets[key] -= offset;}}
              else if (callback instanceof Function) { //если callback функция то
                  callback.call(shapeInstance);
                  if (currentTimestamp > endTimestamp) {callback = null;}}
              else {return true;}
          return false;}}
      var actionHandler = null;
      this.animate = function(changes, delay, callback) {
          if (!(changes instanceof Object)) {changes = {}}
          if (typeof(delay) !== 'number') {delay = 0;}
          if (!(callback instanceof Function)) {callback = null;}
          actionHandler = new ActionHandler(changes, delay, callback);}
      var EventHandler = function() { //обработчик события
          this.id = stack.length; //количество записей в массиве, сколько фигур
          this.isHovered = ctx.isPointInPath(event.mouseX, event.mouseY); //true если на канвасе 
          this.isMoved = false;
          this.isClicked = false;
          var EventListener = function() {
              var stack = []; //обнуление списка фигур
              this.set = function(listener) {stack.push(listener);} //установка 
              this.touch = function() {
                  for (var listener in stack) {stack[listener].call(shapeInstance, event);}}}
          this.mouseover = new EventListener();
          this.mouseout = new EventListener();
          this.mousemove = new EventListener();
          this.mousedown = new EventListener();
          this.mouseup = new EventListener();
          this.mouseclick = new EventListener();
          this.setListener = function(type, listener) {
              switch (type) {
                  case 'mouseover': this.mouseover.set(listener); break;
                  case 'mouseout': this.mouseout.set(listener); break;
                  case 'mousemove': this.mousemove.set(listener); break;
                  case 'mousedown': this.mousedown.set(listener); break;
                  case 'mouseup': this.mouseup.set(listener); break;
                  case 'mouseclick': this.mouseclick.set(listener); break;}}}
      var eventHandler = new EventHandler();
      this.addEventListener = function(type, listener) { //добавление события, если событие не строка возвращаем ничего,если нет функции создаем пустую функцию, и добавляем событие в обработчик событий
          if (typeof(type) !== 'string') {return;}
          if (!(listener instanceof Function)) {listener = new Function();}
          eventHandler.setListener(type, listener);}
      this.click = function(mouseclick) { //нажатие
          if (!(mouseclick instanceof Function)) {mouseclick = new Function();}
          this.addEventListener('mouseclick', mouseclick);}
      this.hover = function(mouseover, mouseout) { //перетаскивание
          if (!(mouseover instanceof Function)) {mouseover = new Function();}
          if (!(mouseout instanceof Function)) {mouseout = new Function();}
          this.addEventListener('mouseover', mouseover);
          this.addEventListener('mouseout', mouseout);}
      var appendShape = function() { //добавление 
          if (activeTargets[eventHandler.id] === undefined) {activeTargets[eventHandler.id] = eventHandler;}}
      var removeShape = function() { //удаление
          if (activeTargets[eventHandler.id] !== undefined) {delete activeTargets[eventHandler.id];}}
      var updateActiveTargets = function() {
          if (ctx.isPointInPath(event.mouseX, event.mouseY)) {appendShape();}
          else {removeShape();}}
      this.draw = function() { //отрисовка, 
          if (actionHandler instanceof ActionHandler && actionHandler.handle()) {actionHandler = null;}
          draw.apply(ctx, toArray(par));
          updateActiveTargets();}}
      var pastTarget = null;
  var updateTarget = function() {
      var targets = toArray(activeTargets).sort(function(a, b) {
          if (a.id < b.id) {return -1;}
          else if (a.id > b.id) {return 1;}
          return 0;});
      var currentTarget = targets.pop() || null;
      if (event.currentTarget !== currentTarget) {
          pastTarget = event.currentTarget;
          event.currentTarget = currentTarget;}
      var relatedTarget = targets.pop() || null;
      if (event.relatedTarget !== relatedTarget) {event.relatedTarget = relatedTarget;}}
//--------------------------------------------------------------------------------------------------
  var listenHover = function() { // новедение
      if (!event.mouseClicked && event.currentTarget !== pastTarget) {
          if (pastTarget !== null && pastTarget.isHovered) {
              pastTarget.isHovered = false;
              pastTarget.mouseout.touch();}
          if (event.currentTarget !== null && !event.currentTarget.isHovered) {
              event.currentTarget.isHovered = true;
              event.currentTarget.mouseover.touch();}}}
//--------------------------------------------------------------------------------------------------
  var originalTarget = undefined;
  var listenMove = function() { // перетаскивание
      if (event.currentTarget !== null && event.currentTarget.isMoved) {
          event.currentTarget.isMoved = false;
          if (event.mouseClicked) {
              if (!!originalTarget) {originalTarget.mousemove.touch();}}
          else {event.currentTarget.mousemove.touch();}}}
//--------------------------------------------------------------------------------------------------
  var originalButton = 0;
  var listenClick = function() { // нажатие
      if (event.mouseClicked && originalTarget === undefined) {
          originalButton = event.mouseButton;
          originalTarget = event.currentTarget;}
      if (event.currentTarget !== null) {
          if (event.mouseClicked && !event.currentTarget.isClicked) {
              event.currentTarget.isClicked = true;
              if (event.currentTarget == originalTarget) {event.currentTarget.mousedown.touch();}}
          else if (!event.mouseClicked && event.currentTarget.isClicked) {
              event.currentTarget.isClicked = false;
              event.currentTarget.mouseup.touch();
              if (event.mouseButton === originalButton && event.currentTarget === originalTarget) {event.currentTarget.mouseclick.touch();}}}
      if (!event.mouseClicked && originalTarget !== undefined) {
          if (!!originalTarget) {originalTarget.isClicked = false;}
          originalTarget = undefined;}}
          
          
      /*******************/
    return {
      init: function() {document.body.appendChild(canvas);},
      clean: function() {ctx.clearRect(0, 0, canvas.width, canvas.height);}, //очищение canvas
      redraw: function() {engine.clean();requestAnimFrame(arguments.callee);},
      addshape: function(draw, par){
        if(!(draw instanceof Function)) {draw = new Function();}
        if(!(par instanceof Object)) {par = {}}
        var shape = new Shape(draw, par); //создание новой фигуры
        stack.push(shape); //добавление в массив объекты фигур фигур
        return shape;
      },
      fullrun: function() {fullScreenRun();},
      fullcancel: function() {fullScreenCancel();},
      /**/
      earc: function(x,y,r,sA,eA,a){ctx.arc(x,y,r,sA,eA,a);}
    };
  })(window, document);
  engine.init();
  engine.redraw();
  engine.fullrun();
  engine.addshape(function(){
    earc(80, 100, 56, 3/4 * Math.PI, 1/4 * Math.PI, true);
  },{});
})();
