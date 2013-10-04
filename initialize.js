//  automatically queue the trees on the specified row
var initialize = function(n, rowIndex){
  //   queue the first row
  var count = 0;
  var queue = [];
  var halfstop = Math.pow(2,Math.floor(n/2));
  var poss = 1;
  while (poss !== halfstop) {
    queue.push([n, poss, poss, poss, true]);
    poss = poss << 1;
  }
  count *= 2;
  if (n % 2 === 1) {
    queue.push([n, poss, poss, poss, false]);
  }

  //  queue the remaining rows to rowIndex
  var k = 0;
  while(k < rowIndex){
    var len = queue.length;
    for(var j = 0; j < len; j++){
      var current = queue.shift();
      n = current[0];
      var ld = current[1];
      var c = current[2];
      var rd = current[3];

      ld = ld << 1;
      rd = rd >> 1;

      poss = 1;
      for(var i = 0; i < n; i++){
        if((poss & (ld | c | rd)) === 0){
          queue.push([n, poss | ld, poss | c, poss | rd, current[4]]);
        }
        poss = poss << 1;
      }
    }
    k++;
  }

  //  send completed queue back for processing (To-Do: send to database for distributed processing)
  return queue;
};