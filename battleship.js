function setupBoard(x) {
  return function(){
    var board = [];
    for (var i = 0; i < x; i++) {
      board.push([]);
      for (var f = 0; f < x; f++) {
        board[i].push([]);
      };
    };
    return board;
  }
}
var userBoard = setupBoard(10);
userBoard.board[0][0] = ['x'];
console.log(userBoard());

