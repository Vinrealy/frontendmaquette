var mainstack = [];
(function(){
  
  app.init();
  mainstack.unshift(app.kvad(20,20,40,40));
  app.draw(mainstack);
  
})();
