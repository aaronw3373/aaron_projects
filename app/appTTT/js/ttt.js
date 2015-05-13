

  var board = ["","","","","","","","",""];


   var user = 0;
   var users = ["X","O"];

function turn(){
  debugger;
  user = 1-user;
  return user;
}

  var winner;
  var singleX = [];
  var sumsX = [];
  var singleO = [];
  var sumsO = [];
  var xscore = 0;
  var oscore = 0;


function win(local){
  var local = parseInt(local.local.charAt(1));
  if (users[user]==="X"){
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
  } else if(users[user]==="O"){
      for (var k = 0; k < sumsO.length; k++) {
        if (sumsO[k] + local === 15){
          oscore++;
          $('#oscore').html('O Score: ' + oscore);
          return true;
        }
      }
      for (var l = 0; l < singleO.length; l++) {
        sumsO.push(singleO[l]+local);
      }
      singleO.push(local);
    }
}
/*
var winsss = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function winnn(space){
  console.log("checking");
  for(var key in winss){
    if( board[key[0]]===board[key[1]] && board[key[1]]===board[key[2]] ){
      winner = true;
      console.log("winner: " + board[key[0]]);
      if (board[key[0]]==='X'){
        xscore++;
        $('#xscore').html('X Score: ' + xscore);
      }else if (board[key[0]]){
        xscore++;
        $('#xscore').html('X Score: ' + xscore);
      }
      return true;

    }
    else{
      console.log("shizzz");
    }
  }
}
*/

var count = 0;

function tie(){
  if (count === 8){
    winner = "tie";
    return true;
  }
  count += 1;
}
