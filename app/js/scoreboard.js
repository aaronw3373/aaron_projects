var createGame = function(){
  var scoreboard = {playerOne: 0,
                    playerTwo: 0};

  return {
    getScore: function(player){
       if (player === 1) {return scoreboard.playerOne;}
       else if (player === 2){return scoreboard.playerTwo;}
    },
    incrementScore: function(player){
      if (player === 1){scoreboard.playerOne += 1;}
      else if (player === 2){scoreboard.playerTwo +=1;}
    }

  };


}

var game = createGame();

/* Things we can do
game.getScore(1);
game.getScore(2);
game.incrementScore(1);
game.incrementScore(2);

*/
