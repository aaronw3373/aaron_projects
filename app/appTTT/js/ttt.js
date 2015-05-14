function win(current){
  var current = parseInt(current.charAt(1));
  if (player==="X"){
    for (var i = 0; i < sumsX.length; i++) {
      if (sumsX[i] + current === 15){
        xscore++;
        $('#xscore').html('X Score: ' + xscore);
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
          oscore++;
          $('#oscore').html('O Score: ' + oscore);
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
  console.log("New Game");
  $('h1').html("Tic Tac Toe");
  gameRef.set({player:"X"})
  disable = false
  singleX = [];
  sumsX = [];
  singleO = [];
  sumsO = [];
  count = 0;
};

function resett(){
  newGame();
  console.log("Reset");
  $('#xscore').html('X Score: 0');
  $('#oscore').html('O Score: 0');
  xscore = 0;
  yscore = 0
};

function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function displayBoard(setter){
  for (var i = 0; i < setter.board.length; i++) {
    board[i] = setter.board[i]
    var spot = '#' + (i+1)
    $(spot).html(board[i]);
  };
}

