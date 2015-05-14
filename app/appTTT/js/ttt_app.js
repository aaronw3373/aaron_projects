  var local;
  var messageRef = new Firebase('https://tick-tack-toe.firebaseio.com/message');
  var gameRef = new Firebase('https://tick-tack-toe.firebaseio.com/game');
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
  resett();



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

        var firebaseData = {
          board: board,
          player: otherPlayer(player),
          waitingPlayer: gameAuth.uid,
          local: local
        };

        if (win(local)){
          winner = player;
          if (player === "X"){
            xscore++;
          }else{
            oscore++;
          }
          firebaseData.winner = winner;
          firebaseData.xscore = xscore;
          firebaseData.oscore = oscore;
        }else if (tie()){
            firebaseData.winner = winner;
          }

        gameRef.set(firebaseData);

        disable = true;

      }

    }
  });

   //On load, set up event handling on the object at "gameRef"
  gameRef.on('value', function(snapshot) {
      var snap = snapshot.val();;
      displayBoard(snap.board);
      if (snap.newGame){
        newGame();
      }
      if (snap.resett){
        resett();
      }

      disable = false;

      if (gameAuth.uid === snap.waitingPlayer) {
        player = otherPlayer(snap.player);
        disable = true;
      } else {
        player = snap.player;
      }

      if (snap.winner){
        disable = true;
        if (snap.winner === "tie"){
          console.log("twas a tie");
            $('h1').html("Tie");
          }else{


            xscore = snap.xscore;
            oscore = snap.oscore;

          $('#oscore').html('O Score: ' + oscore);
          $('#xscore').html('X Score: ' + xscore);
          console.log("the winner is: " + snap.winner);
          $('h1').html(snap.winner + " WINS");
        }
      }
  });


  //reset board keep scores
  $('#new').on('click', function(event){
    newGame();
  });

  //reset scores and board
  $('#reset').on('click', function(){
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

});

