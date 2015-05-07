//global object battleship

var Battleship = Battleship||{};

Battleship.Setup = {
  p1: {
    set: false
  },

  p2: {
    set: false
  },
  piecesSet:false,
  makeBoard: function(){
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
  },


  setBoard: function(){
    console.log("Setting boards...")
    this.p1.pieceBoard = this.makeBoard();
    this.p2.pieceBoard = this.makeBoard();
    this.p1.guessBoard = this.makeBoard();
    this.p2.guessBoard = this.makeBoard();
    console.log("Boards are now set")
  },

  setPiece: function(location,direction){
    var letters = ['a','b','c','d','e','f','g','h','i','j'];
    var numbers = ['0','1','2','3','4','5','6','7','8','9']
    var directions = ['w','a','s','d'];
    var player;
    //set which player is to be set up
    if (this.p1.set===false){
      player = this.p1.pieceBoard;
      console.log(" Setting player 1 piece...")
    }
    else if(this.p2.set===false){
      player = this.p2.pieceBoard;
      console.log(" Setting player 2 piece...")
    }
    else{
      console.log(" Both players are set");
    }

    if (directions.indexOf(direction)===-1){
      console.log(" Not a valid direction");
    }
    else{
      var row = letters.indexOf(location.charAt(0));
      var column = numbers.indexOf(location.charAt(1));
      switch(direction){
        case 'w':
          if (row < 2){
            console.log(" Not a valid direction");
          }
          else if(player[row][column]===' '&&player[row-1][column]===' '&&player[row-2][column]===' '){
            player[row][column] = '3';
            player[row-1][column] = '3';
            player[row-2][column] = '3';
            if (this.p1.set===false){
              this.p1.set = true;
              console.log("Player 1 piece is set")
            }else if (this.p2.set===false){
              this.p2.set = true;
              console.log("Player 2 piece is set")
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
          else if(player[row][column]===' '&&player[row][column-1]===' '&&player[row][column-2]===' '){
            player[row][column] = '3';
            player[row][column-1] = '3';
            player[row][column-2] = '3';
            if (this.p1.set===false){
              this.p1.set = true;
              console.log("Player 1 piece is set")
            }else if (this.p2.set===false){
              this.p2.set = true;
              console.log("Player 2 piece is set")
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
          else if(player[row][column]===' '&&player[row+1][column]===' '&&player[row+2][column]===' '){
            player[row][column] = '3';
            player[row+1][column] = '3';
            player[row+2][column] = '3';
            if (this.p1.set===false){
              this.p1.set = true;
              console.log("Player 1 piece is set")
            }else if (this.p2.set===false){
              this.p2.set = true;
              console.log("Player 2 piece is set")
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
          else if(player[row][column]===' '&&player[row][column+1]===' '&&player[row][column+2]===' '){
            player[row][column] = '3';
            player[row][column+1] = '3';
            player[row][column+2] = '3';
            if (this.p1.set===false){
              this.p1.set = true;
              console.log("Player 1 piece is set")
            }else if (this.p2.set===false){
              this.p2.set = true;
              console.log("Player 2 piece is set")
            }
          }
          else{
            console.log( "there is something already there");
          }
          break;
      }
    }
    if (this.p1.set===true&&this.p2.set===true){
      this.piecesSet=true;
    }
  },




};


/*


//this function creates boards of x dimentions
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
//creates 2 for player
//creates 2 for computer
var [player] = setupBoard(10);
var player1GuessBoard = setupBoard(10);
var player2PieceBoard = setupBoard(10);
var player2GuessBoard = setupBoard(10);


//this array is used to translate user input of letters into numbers
var letters = ['a','b','c','d','e','f','g','h','i','j'];
//this function takes user guess and turns it into numbers
//then tests the guess and checks against oponent
// and changes boards accordingly
//guess is lowercase letter followed by number (0-9)
turns = 0;
function userGuess(guess){
  var row = letters.indexOf(guess.charAt(0));
  var column = guess.charAt(1);
  if (turns % 2 === 0 ){
   if (player2PieceBoard[row][column]===' '){
     player2PieceBoard[row][column] = 'O';
     player1GuessBoard[row][column] = 'O';
     console.log(" You,ve missed");
     turns++;
   }
   else if (player1guessBoard[row][column]==='O' || player1GuessBoard[row][column]==='X'){
     console.log(" You've already guessed here");
     console.log(" Still your turn");
   }

   else{
     player2PieceBoard[row][column] = 'X';
     player1GuessBoard[row][column] = 'X';
     console.log(" HIT");
     turns++;
   }
  }
  else{
   if ([player][row][column]===' '){
     [player][row][column] = 'O';
     player2GuessBoard[row][column] = 'O';
     console.log(" You,ve missed");
     turns++;
   }
   else if (player2GuessBoard[row][column]==='O' || player2GuessBoard[row][column]==='X'){
     console.log(" You've already guessed here");
     console.log(" Still your turn");
   }

   else{
     [player][row][column] = 'X';
     player2GuessBoard[row][column] = 'X';
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
var player1set = false;
function player1SetUp(startPos,direction){
  if (directions.indexOf(direction)===-1){
    console.log(" Not a valid direction");
    return player1SetUp;
  }
  else{
    var row = letters.indexOf(startPos.charAt(0));
    var column = startPos.charAt(1);
    switch(direction){
      case 'w':
        if (row < 2){
          console.log(" Not a valid direction");
          return player1SetUp;
        }
        else if([player][row][column]===' '&&[player][row-1][column]===' '&&[player][row-2][column]===' '){
          [player][row][column] = '3';
          [player][row-1][column] = '3';
          [player][row-2][column] = '3';
          player1set = true;
        }
        else{
          console.log( "there is something already there");
          return player1SetUp;
        }
        break;
      case 'a':
        if (column < 2){
          console.log(" Not a valid direction");
          return player1SetUp;
        }
        else if([player][row][column]===' '&&[player][row][column-1]===' '&&[player][row][column-2]===' '){
          [player][row][column] = '3';
          [player][row][column-1] = '3';
          [player][row][column-2] = '3';
          player1set = true;
        }
        else{
          console.log( "there is something already there");
          return player1SetUp;
        }
        break;
      case 's':
        if (row > 7){
          console.log(" Not a valid direction");
          return player1SetUp;
        }
        else if([player][row][column]===' '&&[player][row+1][column]===' '&&[player][row+2][column]===' '){
          [player][row][column] = '3';
          [player][row+1][column] = '3';
          [player][row+2][column] = '3';
          player1set = true;
        }
        else{
          console.log( "there is something already there");
          return player1SetUp;
        }
        break;
      case 'd':
        if (column > 7){
          console.log(" Not a valid direction");
          return player1SetUp;
        }
        else if([player][row][column]===' '&&[player][row][column+1]===' '&&[player][row][column+2]===' '){
          [player][row][column] = '3';
          [player][row][column+1] = '3';
          [player][row][column+2] = '3';
          player1set = true;
        }
        else{
          console.log( "there is something already there");
          return player1SetUp;
        }
        break;
    }
  }
}

//Player 2 set up
function player2SetUp(startPos,direction){
  if (directions.indexOf(direction)===-1){
    console.log(" Not a valid direction");
    return player1SetUp;
  }
  else{
    var row = letters.indexOf(startPos.charAt(0));
    var column = startPos.charAt(1);
    switch(direction){
      case 'w':
        if (row < 2){
          console.log(" Not a valid direction");
          return player2SetUp;
        }
        else if(player2PieceBoard[row][column]===' '&&player2PieceBoard[row-1][column]===' '&&player2PieceBoard[row-2][column]===' '){
          player2PieceBoard[row][column] = '3';
          player2PieceBoard[row-1][column] = '3';
          player2PieceBoard[row-2][column] = '3';
        }
        else{
          console.log( "there is something already there");
          return player2SetUp;
        }
        break;
      case 'a':
        if (column < 2){
          console.log(" Not a valid direction");
          return player2SetUp;
        }
        else if(player2PieceBoard[row][column]===' '&&player2PieceBoard[row][column-1]===' '&&player2PieceBoard[row][column-2]===' '){
          player2PieceBoard[row][column] = '3';
          player2PieceBoard[row][column-1] = '3';
          player2PieceBoard[row][column-2] = '3';
        }
        else{
          console.log( "there is something already there");
          return player2SetUp;
        }
        break;
      case 's':
        if (row > 7){
          console.log(" Not a valid direction");
          return player2SetUp;
        }
        else if(player2PieceBoard[row][column]===' '&&player2PieceBoard[row+1][column]===' '&&player2PieceBoard[row+2][column]===' '){
          player2PieceBoard[row][column] = '3';
          player2PieceBoard[row+1][column] = '3';
          player2PieceBoard[row+2][column] = '3';
        }
        else{
          console.log( "there is something already there");
          return player2SetUp;
        }
        break;
      case 'd':
        if (column > 7){
          console.log(" Not a valid direction");
          return player2SetUp;
        }
        else if(player2PieceBoard[row][column]===' '&&player2PieceBoard[row][column+1]===' '&&player2PieceBoard[row][column+2]===' '){
          player2PieceBoard[row][column] = '3';
          player2PieceBoard[row][column+1] = '3';
          player2PieceBoard[row][column+2] = '3';
        }
        else{
          console.log( "there is something already there");
          return player2SetUp;
        }
        break;
    }
  }
}

//winning conditions
function destroyed1Board(){
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      if ([player][row][column]===' '||[player][row][column]==='X'||[player][row][column]==='O'){
        winner = true;
        console.log("player 2 Wins");
      }
    }
  }
}

function destroyed2Board(){
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      if (player2PieceBoard[row][column]===' '||player2PieceBoard[row][column]==='X'||player2PieceBoard[row][column]==='O'){
        winner = true;
        console.log("player 1 Wins");
      }
    }
  }
}



function colorSetter(){
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      if ([player][row][column]=== '3'){
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

  if (player1set === false){
    $(current).css('background-color', '#0000FF');
    $('body').keypress(function(e){
      var direct;
      direct = String.fromCharCode(e.which);
      player2SetUp(starter,direct);
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
player2SetUp('a3','a');
player2SetUp('h9', 's');
console.log(player2PieceBoard);
userGuess('b3');
console.log(player2PieceBoard);


*/
