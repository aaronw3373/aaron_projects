//global object battleship

var Battleship = Battleship||{};

Battleship.Setup = (function(){
  var p1 =  {
    set: false
  }

  var p2 = {
    set: false
  }

  var _piecesSet = false;

  function _makeBoard(){
    var board = [];
    var row = [];
    for (var i = 0; i < 10; i++) {
      row[i] = [];
      board.push(row[i]);
      for (var f = 0; f < 10; f++) {
        row[i].push(' ');
      }
    }
    console.log("Board created");
    return board;
  }


  function _setBoard(){
    console.log("Setting boards...")
    p1.pieceBoard = _makeBoard();
    p2.pieceBoard = _makeBoard();
    p1.guessBoard = _makeBoard();
    p2.guessBoard = _makeBoard();
    console.log("Boards are now set")
  }

  var letters = ['a','b','c','d','e','f','g','h','i','j'];
  var numbers = ['0','1','2','3','4','5','6','7','8','9']
  var directions = ['w','a','s','d'];

  function _setPiece(location,direction){

    var board;
    //set which board is to be set up
    (function(){
      if (p1.set===false){
        board = p1.pieceBoard;
        console.log(" Setting board 1 piece...")
      } else if(p2.set===false){
        board = p2.pieceBoard;
        console.log(" Setting board 2 piece...")
      } else {
        console.log(" Both boards are set");
      }
    })();

    //sets pieces based on location and direction for both players based on above function
    //works with bad input
    if (directions.indexOf(direction)===-1){
      console.log(" Not a valid direction");
    } else {
      var row = letters.indexOf(location.charAt(0));
      var column = numbers.indexOf(location.charAt(1));
      switch(direction){
        case 'w':
          if (row < 2){
            console.log(" Not a valid direction");
          } else if (board[row][column] === ' ' && board[row-1][column]=== ' ' &&board[row-2][column]===' '){
            board[row][column] = '3';
            board[row-1][column] = '3';
            board[row-2][column] = '3';
            if (p1.set===false){
              p1.set = true;
              console.log("board 1 piece is set")
            }else if (p2.set===false){
              p2.set = true;
              console.log("board 2 piece is set")
            }
          }
          else{
            console.log( "there is something already there");
          }
          break;
        case 'a':
          if (column < 2){
            console.log(" Not a valid direction");
          }
          else if(board[row][column]===' ' && board[row][column-1] === ' ' && board[row][column-2] === ' '){
            board[row][column] = '3';
            board[row][column-1] = '3';
            board[row][column-2] = '3';
            if (p1.set===false){
              p1.set = true;
              console.log("board 1 piece is set")
            }else if (p2.set===false){
              p2.set = true;
              console.log("board 2 piece is set")
            }
          }
          else{
            console.log( "there is something already there");
          }
          break;
        case 's':
          if (row > 7){
            console.log(" Not a valid direction");
          }
          else if(board[row][column]===' '&&board[row+1][column]===' '&&board[row+2][column]===' '){
            board[row][column] = '3';
            board[row+1][column] = '3';
            board[row+2][column] = '3';
            if (p1.set===false){
              p1.set = true;
              console.log("board 1 piece is set")
            }else if (p2.set===false){
              p2.set = true;
              console.log("board 2 piece is set")
            }
          }
          else{
            console.log( "there is something already there");
          }
          break;
        case 'd':
          if (column > 7){
            console.log(" Not a valid direction");
          }
          else if(board[row][column]===' '&&board[row][column+1]===' '&&board[row][column+2]===' '){
            board[row][column] = '3';
            board[row][column+1] = '3';
            board[row][column+2] = '3';
            if (p1.set===false){
              p1.set = true;
              console.log("board 1 piece is set")
            }else if (p2.set===false){
              p2.set = true;
              console.log("board 2 piece is set")
            }
          }
          else{
            console.log( "there is something already there");
          }
          break;
      }
    }
  }

  function _colorChanger(){
    for (var row = 0; row < 10; row++) {
      for (var column = 0; column < 10; column++) {
        if (p1.pieceBoard[row][column]=== '3'){
          var foobar = "#";
          console.log(letters[row]);
          foobar += (letters[row] + column);
          $(foobar).css('background-color', '#FF0000');
        }
      }
    }
  }

  return{
    p1: p1,
    p2: p2,
    setBoard: _setBoard,
    setPiece: _setPiece,
    colorChanger: _colorChanger,
    piecesSet: _piecesSet
  }

})();


/*


//function creates boards of x dimentions
function setupBoard(x) {
    var board = [];
    var row = [];
    for (var i = 0; i < x; i++) {
      row[i] = [];
      board.push(row[i]);
      for (var f = 0; f < x; f++) {
        row[i].push(' ');
      }
    }
    return board;
}

//creates 4 boards
//creates 2 for board
//creates 2 for computer
var [board] = setupBoard(10);
var board1GuessBoard = setupBoard(10);
var board2PieceBoard = setupBoard(10);
var board2GuessBoard = setupBoard(10);


//array is used to translate user input of letters into numbers
var letters = ['a','b','c','d','e','f','g','h','i','j'];
//function takes user guess and turns it into numbers
//then tests the guess and checks against oponent
// and changes boards accordingly
//guess is lowercase letter followed by number (0-9)
turns = 0;
function userGuess(guess){
  var row = letters.indexOf(guess.charAt(0));
  var column = guess.charAt(1);
  if (turns % 2 === 0 ){
   if (board2PieceBoard[row][column]===' '){
     board2PieceBoard[row][column] = 'O';
     board1GuessBoard[row][column] = 'O';
     console.log(" You,ve missed");
     turns++;
   }
   else if (board1guessBoard[row][column]==='O' || board1GuessBoard[row][column]==='X'){
     console.log(" You've already guessed here");
     console.log(" Still your turn");
   }

   else{
     board2PieceBoard[row][column] = 'X';
     board1GuessBoard[row][column] = 'X';
     console.log(" HIT");
     turns++;
   }
  }
  else{
   if ([board][row][column]===' '){
     [board][row][column] = 'O';
     board2GuessBoard[row][column] = 'O';
     console.log(" You,ve missed");
     turns++;
   }
   else if (board2GuessBoard[row][column]==='O' || board2GuessBoard[row][column]==='X'){
     console.log(" You've already guessed here");
     console.log(" Still your turn");
   }

   else{
     [board][row][column] = 'X';
     board2GuessBoard[row][column] = 'X';
     console.log(" HIT");
     turns++;
   }
  }
}

//Board set up
//ship of three length to 3
//'3' is piece name
//w-a-s-d for direction startPos as lower case letter followed by number(0-9)
var directions = ['w','a','s','d'];
var board1set = false;
function board1SetUp(startPos,direction){
  if (directions.indexOf(direction)===-1){
    console.log(" Not a valid direction");
    return board1SetUp;
  }
  else{
    var row = letters.indexOf(startPos.charAt(0));
    var column = startPos.charAt(1);
    switch(direction){
      case 'w':
        if (row < 2){
          console.log(" Not a valid direction");
          return board1SetUp;
        }
        else if([board][row][column]===' '&&[board][row-1][column]===' '&&[board][row-2][column]===' '){
          [board][row][column] = '3';
          [board][row-1][column] = '3';
          [board][row-2][column] = '3';
          board1set = true;
        }
        else{
          console.log( "there is something already there");
          return board1SetUp;
        }
        break;
      case 'a':
        if (column < 2){
          console.log(" Not a valid direction");
          return board1SetUp;
        }
        else if([board][row][column]===' '&&[board][row][column-1]===' '&&[board][row][column-2]===' '){
          [board][row][column] = '3';
          [board][row][column-1] = '3';
          [board][row][column-2] = '3';
          board1set = true;
        }
        else{
          console.log( "there is something already there");
          return board1SetUp;
        }
        break;
      case 's':
        if (row > 7){
          console.log(" Not a valid direction");
          return board1SetUp;
        }
        else if([board][row][column]===' '&&[board][row+1][column]===' '&&[board][row+2][column]===' '){
          [board][row][column] = '3';
          [board][row+1][column] = '3';
          [board][row+2][column] = '3';
          board1set = true;
        }
        else{
          console.log( "there is something already there");
          return board1SetUp;
        }
        break;
      case 'd':
        if (column > 7){
          console.log(" Not a valid direction");
          return board1SetUp;
        }
        else if([board][row][column]===' '&&[board][row][column+1]===' '&&[board][row][column+2]===' '){
          [board][row][column] = '3';
          [board][row][column+1] = '3';
          [board][row][column+2] = '3';
          board1set = true;
        }
        else{
          console.log( "there is something already there");
          return board1SetUp;
        }
        break;
    }
  }
}

//board 2 set up
function board2SetUp(startPos,direction){
  if (directions.indexOf(direction)===-1){
    console.log(" Not a valid direction");
    return board1SetUp;
  }
  else{
    var row = letters.indexOf(startPos.charAt(0));
    var column = startPos.charAt(1);
    switch(direction){
      case 'w':
        if (row < 2){
          console.log(" Not a valid direction");
          return board2SetUp;
        }
        else if(board2PieceBoard[row][column]===' '&&board2PieceBoard[row-1][column]===' '&&board2PieceBoard[row-2][column]===' '){
          board2PieceBoard[row][column] = '3';
          board2PieceBoard[row-1][column] = '3';
          board2PieceBoard[row-2][column] = '3';
        }
        else{
          console.log( "there is something already there");
          return board2SetUp;
        }
        break;
      case 'a':
        if (column < 2){
          console.log(" Not a valid direction");
          return board2SetUp;
        }
        else if(board2PieceBoard[row][column]===' '&&board2PieceBoard[row][column-1]===' '&&board2PieceBoard[row][column-2]===' '){
          board2PieceBoard[row][column] = '3';
          board2PieceBoard[row][column-1] = '3';
          board2PieceBoard[row][column-2] = '3';
        }
        else{
          console.log( "there is something already there");
          return board2SetUp;
        }
        break;
      case 's':
        if (row > 7){
          console.log(" Not a valid direction");
          return board2SetUp;
        }
        else if(board2PieceBoard[row][column]===' '&&board2PieceBoard[row+1][column]===' '&&board2PieceBoard[row+2][column]===' '){
          board2PieceBoard[row][column] = '3';
          board2PieceBoard[row+1][column] = '3';
          board2PieceBoard[row+2][column] = '3';
        }
        else{
          console.log( "there is something already there");
          return board2SetUp;
        }
        break;
      case 'd':
        if (column > 7){
          console.log(" Not a valid direction");
          return board2SetUp;
        }
        else if(board2PieceBoard[row][column]===' '&&board2PieceBoard[row][column+1]===' '&&board2PieceBoard[row][column+2]===' '){
          board2PieceBoard[row][column] = '3';
          board2PieceBoard[row][column+1] = '3';
          board2PieceBoard[row][column+2] = '3';
        }
        else{
          console.log( "there is something already there");
          return board2SetUp;
        }
        break;
    }
  }
}

//winning conditions
function destroyed1Board(){
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      if ([board][row][column]===' '||[board][row][column]==='X'||[board][row][column]==='O'){
        winner = true;
        console.log("board 2 Wins");
      }
    }
  }
}

function destroyed2Board(){
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      if (board2PieceBoard[row][column]===' '||board2PieceBoard[row][column]==='X'||board2PieceBoard[row][column]==='O'){
        winner = true;
        console.log("board 1 Wins");
      }
    }
  }
}



function colorSetter(){
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      if ([board][row][column]=== '3'){
        var foobar = "#";
        foobar += (letters[row] + column);
        $(foobar).css('background-color', '#FF0000');
      }
    }
  }
}

$(document).ready(function(){
  var current;
  var starter = '';
  $('div').click(function(event) {
      $(current).css('background-color', '#0000FF');
      current = "#";
      current += event.target.id;
      starter += event.target.id;
      $(current).css('background-color', '#FF0000');
    });

  if (board1set === false){
    $(current).css('background-color', '#0000FF');
    $('body').keypress(function(e){
      var direct;
      direct = String.fromCharCode(e.which);
      board2SetUp(starter,direct);
      colorSetter();
    });
  }

});


//the game play
var winner = false;
function gamePlay(){
  while (winner === false){

  }
}

//gamePlay();

// <<<TESTING>>>
board2SetUp('a3','a');
board2SetUp('h9', 's');
console.log(board2PieceBoard);
userGuess('b3');
console.log(board2PieceBoard);


*/
