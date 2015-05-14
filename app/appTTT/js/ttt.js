function win(current){
  var current = parseInt(current.charAt(1));
  if (player==="X"){
    for (var i = 0; i < sumsX.length; i++) {
      if (sumsX[i] + current === 15){
        return true;
      }
    }
    for (var j = 0; j < singleX.length; j++) {
      sumsX.push(singleX[j]+current);
    }
    singleX.push(current);
  } else if(player==="O"){
      for (var k = 0; k < sumsO.length; k++) {
        if (sumsO[k] + current === 15){
          return true;
        }
      }
      for (var l = 0; l < singleO.length; l++) {
        sumsO.push(singleO[l]+current);
      }
      singleO.push(current);
    }
};

function tie(){
  if (count === 8){
    winner = "tie";
    return true;
  }
  count += 1;
};

function newGame(){
  $('h1').html("Tic Tac Toe");
  board = ["","","","","","","","",""];
  disable = false
  singleX = [];
  sumsX = [];
  singleO = [];
  sumsO = [];
  count = 0;
  gameRef.set({board:board, player:"X"})
};

function resett(){
  xscore = 0;
  yscore = 0
  $('#xscore').html('X Score: 0');
  $('#oscore').html('O Score: 0');
  newGame();
};

function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function displayBoard(setter){
  for (var i = 0; i < setter.length; i++) {
    board[i] = setter[i]
    var spot = '#' + (i+1)
    $(spot).html(board[i]);
  };
}

