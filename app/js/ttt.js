  var user = 0;
  var users = ["O","X"];

function turn(){
  user = 1-user;
  return user;
}

  var winner;
  var singleX = [];
  var sumsX = [];
  var singleO = [];
  var sumsO = [];
  var xscore = 0;
  var yscore = 0;


function win(local){
  local = parseInt(local.charAt(1));
  if (user){
    for (var i = 0; i < sumsX.length; i++) {
      if (sumsX[i] + local === 15){
        xscore++;
        $('#xscore').html('X Score: ' + xscore);
        return true;
      }
    }
    for (var j = 0; j < singleX.length; j++) {
      sumsX.push(singleX[j]+local);
    }
    singleX.push(local);
    console.log("singleX: " + singleX);
    console.log("sumsX: " + sumsX);
  } else {
      for (var k = 0; k < sumsO.length; k++) {
        if (sumsO[k] + local === 15){
          yscore++;
          $('#yscore').html('Y Score: ' + yscore);
          return true;
        }
      }
      for (var l = 0; l < singleO.length; l++) {
        sumsO.push(singleO[l]+local);
      }
      singleO.push(local);
      console.log("singleO: " + singleO);
      console.log("sumsO: " + sumsO);
    }
}



var count = 0;

function tie(){
  if (count === 8){
    winner = "tie";
    return true;
  }
  console.log(count);
  count += 1;
}
