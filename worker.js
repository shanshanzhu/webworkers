onmessage = function(event){
  var n = event.data[0][0];

  if(n === 0){ return 1; }

  var count = 0, all = Math.pow(2, n)-1;

  var f = function(ld, c, rd){
    if(c === all){
      count++;
      return;
    }

    ld = ld << 1;
    rd = rd >> 1;

    var poss = 1;
    for(var i = 0; i < n; i++){
      if((poss & (ld | c | rd)) === 0){
        f(poss | ld, poss | c, poss | rd);
      }
      poss = poss << 1;
    }
  };

  f(event.data[0][1],event.data[0][2],event.data[0][3]);
  
  postMessage([count, event.data[0][4]]);
};