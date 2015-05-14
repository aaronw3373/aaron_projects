  var local;
  var messageRef = new Firebase('https://tick-tack-toe.firebaseio.com/message');
  var boardRef = new Firebase('https://tick-tack-toe.firebaseio.com/boards');
  var gameRef = new Firebase('https://tick-tack-toe.firebaseio.com/game');
  var playerRef = new Firebase('https://tick-tack-toe.firebaseio.com/game/player');
  var gameAuth;
  var player;
  var board = ["","","","","","","","",""];
  var winner;
  var singleX = [];
  var sumsX = [];
  var singleO = [];
  var sumsO = [];
  var xscore = 0;
  var oscore = 0;
  var count = 0;
  var disable = false;

$(document).ready(function(){
  board = ["","","","","","","","",""];
  boardRef.set({board:board});



  var otherPlayer = function(player) {
    return player === 'X' ? 'O' : 'X';
  };

  //Get a "unique" id for the user
  if (!(gameAuth = gameRef.getAuth())) {
    gameRef.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        gameAuth = authData;
      }
    });
  }

  //click function
  $('.box').on('click', function(event){
    if( disable===false && !winner){
      local = '#' + (event.target.id);
      if(!$(local).html()){



        board[(event.target.id)-1]=(player);
        boardRef.set({board:board});


        var firebaseData = {
          player: otherPlayer(player),
          waitingPlayer: gameAuth.uid, local:local
        };



        if (win(local)){
          var winner = player;
          firebaseData.winner = winner;
          console.log("the winner is: " + winner);
          $('h1').html(winner + " WINS");
        }else if (tie()){
            firebaseData.winner = winner;
            console.log("twas a tie");
            $('h1').html("Tie");
          }

        gameRef.set(firebaseData);

        disable = true;



      }

    }
  });

   //On load, set up event handling on the object at "gameRef"
  gameRef.on('value', function(snapshot) {
      var snap = snapshot.val();
      disable = false;
      if (gameAuth.uid === snap.waitingPlayer) {
        player = otherPlayer(snap.player);
        disable = true;
      } else {
        player = snap.player;
      }
      //winner
  });


  //reset board keep scores
  $('#new').on('click', function(event){
    board = ["","","","","","","","",""];
    boardRef.set({board:board});
    newGame();
  });

  //reset scores and board
  $('#reset').on('click', function(){
    board = ["","","","","","","","",""];
    boardRef.set({board:board});
    resett();
  });

  //show chat
  $('#togleChat').on('click', function(){
    $('#chatbox').toggle(500,'swing');
    $('#playbox').toggle(500,'swing');
  });

  //chat calls
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      messageRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });
  messageRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });
  $('#clear').on('click',function(){
    messageRef.set(null);
    $('#messagesDiv').html('');
  });

  //board server and winner call
  boardRef.on('value',function(snapshot){
    var setter = snapshot.val();
    displayBoard(setter);
  });

});

