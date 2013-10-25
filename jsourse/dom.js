var mainstack = [];
(function(){
  
  app.init();
  //mainstack.unshift(app.kvad(20,20,40,40));
  app.draw(mainstack);
  
})();

(function(){
  var mains = [];console.log(mains);
  var olol = function(){
    return {
      lol: function(){console.log('olol: lol');}
    };
  }
  mains.push('olol.lol()'); console.log(mains);
})()
